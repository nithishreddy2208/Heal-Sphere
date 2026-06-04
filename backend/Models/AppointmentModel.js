const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
    patientId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    doctorId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Doctor", 
        required: true 
    },
    startTime: { 
        type: Date, 
        required: true, 
    },
    endTime: {
        type: Date,
        required: true,
    },
    videoCallRoomId: {
        type: String,
        default: "",
    },
    videoCallStatus: {
        type: String,
        enum: ["none", "ready", "initiated", "ended"],
        default: "none",
    },
    videoCallNotified: {
        type: Boolean,
        default: false,
    },
    status: {
        type: String,
        enum: ["Pending", "PendingDoctor", "Accepted", "Rejected", "Completed"],
        default: "Pending",
    },
});

module.exports = mongoose.model("Appointment", AppointmentSchema);
