// videoCallRoutes.js
const express = require("express");
const router = express.Router();
const { authenticateJWT } = require("../Middleware/authMiddleware");
const Appointment = require("../Models/AppointmentModel");
const User = require("../Models/UserModel");
const Doctor = require("../Models/DoctorModel");
const NotificationModel = require("../Models/NotificationModel");
const jwt = require("jsonwebtoken");
const WebSocket = require("ws");
const { Server } = require("ws");

let users = {};
let rooms = {};
let roomState = {};

const safeSend = (ws, payload) => {
  try {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(payload));
    }
  } catch (e) {
    // ignore
  }
};

const getUserIdFromToken = (token) => {
  try {
    if (!token || typeof token !== "string") return null;
    const clean = token.startsWith("Bearer ") ? token.replace("Bearer ", "") : token;
    const verified = jwt.verify(clean.trim(), process.env.JWT_SECRET);
    return verified?._id || null;
  } catch (e) {
    return null;
  }
};

const pushToUser = (userId, payload) => {
  const ws = users?.[userId];
  safeSend(ws, payload);
};

const broadcastToRoom = (roomId, payload, excludeWs = null) => {
  const set = rooms?.[roomId];
  if (!set) return;
  set.forEach((ws) => {
    if (excludeWs && ws === excludeWs) return;
    safeSend(ws, payload);
  });
};

const getOtherRoomPeer = (roomId, excludeWs) => {
  const set = rooms?.[roomId];
  if (!set) return null;
  for (const ws of set) {
    if (excludeWs && ws === excludeWs) continue;
    return ws;
  }
  return null;
};

const getOrCreateRoomId = (appointmentId) => `appointment-${appointmentId}`;

const sendAppointmentStart = async (appointment) => {
  const roomId = appointment.videoCallRoomId || getOrCreateRoomId(appointment._id);
  const joinUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/video-call/${roomId}`;

  if (!appointment.videoCallRoomId) {
    appointment.videoCallRoomId = roomId;
  }
  if (appointment.videoCallStatus === "none") {
    appointment.videoCallStatus = "ready";
  }
  appointment.videoCallNotified = true;
  await appointment.save();

  const doctorId = appointment?.doctorId?._id || appointment?.doctorId;
  const doctor = doctorId
    ? await Doctor.findById(doctorId).populate("userId", "userName")
    : null;
  const patient = await User.findById(appointment.patientId);

  const doctorUserId = doctor?.userId?._id?.toString();
  const patientUserId = patient?._id?.toString();

  const doctorName = doctor?.name || "Doctor";
  const patientName = patient?.userName || "Patient";

  if (doctorUserId) {
    await new NotificationModel({
      userId: doctorUserId,
      doctorId: appointment.doctorId,
      appointmentId: appointment._id,
      message: `Your appointment with ${patientName} is starting now. Join video call: ${joinUrl}`,
    }).save();

    pushToUser(doctorUserId, {
      type: "appointmentStart",
      roomId,
      joinUrl,
      message: `Appointment starting now with ${patientName}`,
      appointmentId: appointment._id,
    });
  }

  if (patientUserId) {
    await new NotificationModel({
      userId: patientUserId,
      doctorId: appointment.doctorId,
      appointmentId: appointment._id,
      message: `Your appointment with Dr. ${doctorName} is starting now. Join video call: ${joinUrl}`,
    }).save();

    pushToUser(patientUserId, {
      type: "appointmentStart",
      roomId,
      joinUrl,
      message: `Appointment starting now with Dr. ${doctorName}`,
      appointmentId: appointment._id,
    });
  }
};

const startAppointmentScheduler = () => {
  const leadMs = 0;
  const checkIntervalMs = 30 * 1000;

  setInterval(async () => {
    try {
      const now = new Date();
      const windowStart = new Date(now.getTime() - 30 * 1000 + leadMs);
      const windowEnd = new Date(now.getTime() + 30 * 1000 + leadMs);

      const dueAppointments = await Appointment.find({
        status: { $in: ["Accepted"] },
        videoCallNotified: false,
        startTime: { $gte: windowStart, $lte: windowEnd },
      });

      for (const appt of dueAppointments) {
        await sendAppointmentStart(appt);
      }
    } catch (e) {
      // ignore
    }
  }, checkIntervalMs);
};

// Initialize WebSocket server
const initializeWebSocketServer = (server) => {
  const wss = new Server({ server });

  wss.on("connection", (ws) => {
    ws.on("message", (message) => {
      const data = JSON.parse(message);

      if (data.type === "register") {
        const userId = getUserIdFromToken(data.token);
        if (!userId) {
          safeSend(ws, { type: "error", message: "Invalid token" });
          return;
        }
        ws.__userId = userId;
        users[userId] = ws;
        safeSend(ws, { type: "registered", userId });
        return;
      }

      if (data.type === "join") {
        const roomId = data.roomId;
        if (!roomId) return;
        if (!rooms[roomId]) rooms[roomId] = new Set();
        rooms[roomId].add(ws);
        ws.__roomId = roomId;
        broadcastToRoom(roomId, { type: "userJoined" }, ws);

        // If an offer already exists for this room, deliver it to the joiner.
        const offer = roomState?.[roomId]?.offer;
        const offerOwner = roomState?.[roomId]?.offerOwner;
        if (offer && offerOwner && offerOwner !== ws) {
          safeSend(ws, { type: "callUser", signal: offer });
        }
        return;
      }

      if (data.type === "callUser") {
        const roomId = data.roomId;
        if (!roomId) return;
        // Cache offer so late joiners can still receive it.
        roomState[roomId] = {
          ...(roomState[roomId] || {}),
          offer: data.signalData,
          offerOwner: ws,
        };
        broadcastToRoom(roomId, { type: "callUser", signal: data.signalData }, ws);
        return;
      }

      if (data.type === "answerCall") {
        const roomId = data.roomId;
        if (!roomId) return;
        roomState[roomId] = {
          ...(roomState[roomId] || {}),
          answer: data.signal,
          answerOwner: ws,
        };
        broadcastToRoom(roomId, { type: "callAccepted", signal: data.signal }, ws);
        return;
      }

      if (data.type === "endCall") {
        const roomId = data.roomId;
        if (!roomId) return;
        broadcastToRoom(roomId, { type: "callEnded" }, ws);
        delete roomState[roomId];
        return;
      }

      if (data.type === "notifyPatient") {
        const roomId = data.roomId;
        if (!roomId) return;
        broadcastToRoom(roomId, { type: "doctorNotification", message: data.message }, ws);
        return;
      }
    });

    ws.on("close", () => {
      Object.keys(users).forEach((userId) => {
        if (users[userId] === ws) {
          delete users[userId];
        }
      });

      const roomId = ws.__roomId;
      if (roomId && rooms[roomId]) {
        rooms[roomId].delete(ws);
        if (rooms[roomId].size === 0) {
          delete rooms[roomId];
        }
      }
    });
  });

  console.log("WebSocket server initialized");
};

// API endpoint to initiate a video call
router.post("/initiateVideoCall", authenticateJWT, async (req, res) => {
  try {
    const { patientId, appointmentId, roomId } = req.body;

    // Validate appointment exists and belongs to the doctor
    const appointment = await Appointment.findById(appointmentId)
      .populate("patientId")
      .populate("doctorId", "userId name");

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Use req.user._id to compare
    if (appointment.doctorId?.userId?.toString() !== req.user._id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // Create or update video call session in appointment
    appointment.videoCallRoomId = roomId || getOrCreateRoomId(appointment._id);
    appointment.videoCallStatus = "initiated";
    await appointment.save();

    const doctor = await Doctor.findById(appointment.doctorId?._id || appointment.doctorId);
    const patient = await User.findById(appointment.patientId);
    if (doctor?.userId) {
      pushToUser(doctor.userId.toString(), {
        type: "appointmentStart",
        roomId: appointment.videoCallRoomId,
        joinUrl: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/video-call/${appointment.videoCallRoomId}`,
        message: `Video call initiated for appointment with ${patient?.userName || "Patient"}`,
        appointmentId: appointment._id,
      });
    }
    if (patient?._id) {
      pushToUser(patient._id.toString(), {
        type: "appointmentStart",
        roomId: appointment.videoCallRoomId,
        joinUrl: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/video-call/${appointment.videoCallRoomId}`,
        message: `Your doctor has started the video call` ,
        appointmentId: appointment._id,
      });
    }

    res.status(200).json({
      message: "Video call initiated successfully",
      roomId: appointment.videoCallRoomId,
    });
  } catch (error) {
    console.error("Error initiating video call:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// API endpoint to get appointment details by room ID
router.get(
  "/getAppointmentByRoom/:roomId",
  authenticateJWT,
  async (req, res) => {
    try {
      const { roomId } = req.params;

      // Find appointment by room ID
      const appointment = await Appointment.findOne({ videoCallRoomId: roomId })
        .populate("patientId")
        .populate("doctorId", "userId name");

      if (!appointment) {
        return res.status(404).json({ message: "Appointment not found" });
      }

      // Use req.user._id for comparison
      const doctor = appointment?.doctorId?._id
        ? appointment.doctorId
        : await Doctor.findById(appointment.doctorId);
      const isDoctor = doctor?.userId?.toString() === req.user._id;
      const isPatient = appointment.patientId._id.toString() === req.user._id;

      if (!isDoctor && !isPatient) {
        return res.status(403).json({ message: "Unauthorized" });
      }

      res.status(200).json({
        appointmentId: appointment._id,
        patientName: appointment.patientId.userName,
        doctorName: doctor?.name || "Doctor",
        startTime: appointment.startTime,
        endTime: appointment.endTime,
        isDoctor,
        status: appointment.status,
      });
    } catch (error) {
      console.error("Error getting appointment:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

module.exports = {
  routes: router,
  initializeWebSocketServer,
  startAppointmentScheduler,
};
