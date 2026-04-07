import React, { useContext, useEffect, useState } from "react";
import { Auth } from "../Contexts/AuthContext";
import Loading from "./Loading";

const DoctorNotifications = () => {
  const { user } = useContext(Auth);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [markingId, setMarkingId] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/allNotifications", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user}`,
        },
      });

      const data = await response.json().catch(() => ({ notifications: [] }));
      setNotifications(
        response.ok && Array.isArray(data?.notifications) ? data.notifications : []
      );
    } catch (error) {
      console.error("Error fetching doctor notifications:", error);
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  const updateAppointmentStatus = async (appointmentId, status) => {
    setUpdatingId(appointmentId);
    try {
      const response = await fetch(
        "http://localhost:3000/updateAppointmentStatus",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user}`,
          },
          body: JSON.stringify({ appointMentId: appointmentId, status }),
        }
      );

      if (response.ok) {
        await fetchNotifications();
      }
    } catch (error) {
      console.error("Error updating appointment status:", error);
    } finally {
      setUpdatingId(null);
    }
  };

  useEffect(() => {
    if (user) {
      fetchNotifications();
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const markAsRead = async (id) => {
    setMarkingId(id);
    try {
      const response = await fetch(`http://localhost:3000/read/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user}`,
        },
      });

      if (response.ok) {
        await fetchNotifications();
      }
    } catch (error) {
      console.error("Error marking notification as read:", error);
    } finally {
      setMarkingId(null);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="dashboard-card p-6 rounded-2xl">
        <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
        <p className="text-gray-600 mt-1">Unread notifications</p>

        {notifications.length === 0 ? (
          <div className="mt-6 text-gray-600">No unread notifications.</div>
        ) : (
          <div className="mt-6 space-y-3">
            {notifications.map((n) => {
              const appointment = n?.appointmentId;
              const appointmentDbId =
                typeof appointment === "string" ? appointment : appointment?._id;
              const isPendingDoctor = appointment?.status === "PendingDoctor";
              const patientName = appointment?.patientId?.userName;
              const startTime = appointment?.startTime;
              const canApproveOrReject = Boolean(appointmentDbId) &&
                (isPendingDoctor || typeof appointment === "string");

              return (
                <div
                  key={n._id}
                  className="bg-white rounded-xl border border-gray-200 p-4 flex items-center justify-between gap-4"
                >
                  <div className="min-w-0">
                    <p className="text-gray-900 font-medium break-words">
                      {n.message || "Notification"}
                    </p>
                    {(patientName || startTime) && (
                      <div className="text-sm text-gray-600 mt-1">
                        {patientName && <span>Patient: {patientName}</span>}
                        {patientName && startTime && <span> | </span>}
                        {startTime && (
                          <span>Time: {new Date(startTime).toLocaleString()}</span>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    {canApproveOrReject ? (
                      <>
                        <button
                          onClick={() =>
                            updateAppointmentStatus(appointmentDbId, "Accepted")
                          }
                          disabled={updatingId === appointmentDbId}
                          className="px-3 py-2 rounded-lg bg-green-600 text-white text-sm font-semibold disabled:opacity-60"
                        >
                          {updatingId === appointmentDbId ? "Saving..." : "Accept"}
                        </button>
                        <button
                          onClick={() =>
                            updateAppointmentStatus(appointmentDbId, "Rejected")
                          }
                          disabled={updatingId === appointmentDbId}
                          className="px-3 py-2 rounded-lg bg-red-600 text-white text-sm font-semibold disabled:opacity-60"
                        >
                          {updatingId === appointmentDbId ? "Saving..." : "Reject"}
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => markAsRead(n._id)}
                        disabled={markingId === n._id}
                        className="px-3 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold disabled:opacity-60"
                      >
                        {markingId === n._id ? "Marking..." : "Mark as read"}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorNotifications;
