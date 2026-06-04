import React, { useContext, useEffect, useMemo, useState } from "react";
import { Auth } from "../Contexts/AuthContext";
import { Bell, Calendar, FileText, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { buildApiUrl } from "../config/api";

const DoctorDashboard = () => {
  const { user } = useContext(Auth);
  const nav = useNavigate();
  const [profile, setProfile] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  const patientsCount = useMemo(() => {
    const patientIds = new Set(
      (appointments || [])
        .map((a) => a?.patientId?._id || a?.patientId)
        .filter(Boolean)
    );
    return patientIds.size;
  }, [appointments]);

  const nextAppointments = (appointments || [])
    .slice()
    .sort((a, b) => new Date(a.startTime) - new Date(b.startTime))
    .slice(0, 3);

  useEffect(() => {
    const fetchDoctorData = async () => {
      setLoading(true);
      try {
        const [profileRes, apptRes, notifRes, presRes] = await Promise.all([
          fetch(buildApiUrl('/profile'), {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user}`,
            },
          }),
          fetch(buildApiUrl('/getAppointments'), {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user}`,
            },
          }),
          fetch(buildApiUrl('/allNotifications'), {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user}`,
            },
          }),
          fetch(buildApiUrl('/getDoctorPrescriptions'), {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user}`,
            },
          }),
        ]);

        const profileData = await profileRes.json().catch(() => null);
        const apptData = await apptRes.json().catch(() => []);
        const notifData = await notifRes.json().catch(() => ({ notifications: [] }));
        const presData = await presRes.json().catch(() => ({ prescriptions: [] }));

        setProfile(profileRes.ok ? profileData?.getDoc || null : null);
        setAppointments(apptRes.ok && Array.isArray(apptData) ? apptData : []);
        setNotifications(
          notifRes.ok && Array.isArray(notifData?.notifications)
            ? notifData.notifications
            : []
        );
        setPrescriptions(
          presRes.ok && Array.isArray(presData?.prescriptions)
            ? presData.prescriptions
            : []
        );
      } catch (error) {
        console.error("Error fetching doctor dashboard data:", error);
        setProfile(null);
        setAppointments([]);
        setNotifications([]);
        setPrescriptions([]);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchDoctorData();
    } else {
      setLoading(false);
    }
  }, [user]);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="dashboard-card p-6 rounded-2xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Doctor Dashboard</h1>
            <p className="text-gray-600 mt-1">
              {profile?.name ? `Welcome, Dr. ${profile.name}` : "Welcome"}
            </p>
          </div>
        </div>

        {loading ? (
          <div className="mt-6 text-gray-600">Loading...</div>
        ) : (
          <>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="dashboard-card p-6 rounded-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Appointments</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {appointments.length}
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full p-3">
                    <Calendar className="w-6 h-6" />
                  </div>
                </div>
              </div>

              <div className="dashboard-card p-6 rounded-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">My Patients</p>
                    <p className="text-2xl font-bold text-gray-900">{patientsCount}</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-full p-3">
                    <Users className="w-6 h-6" />
                  </div>
                </div>
              </div>

              <div className="dashboard-card p-6 rounded-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Prescriptions</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {prescriptions.length}
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-full p-3">
                    <FileText className="w-6 h-6" />
                  </div>
                </div>
              </div>

              <div className="dashboard-card p-6 rounded-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Notifications</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {notifications.length}
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-full p-3">
                    <Bell className="w-6 h-6" />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 dashboard-card p-6 rounded-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Next Appointments</h3>
                    <p className="text-sm text-gray-600 mt-1">Your upcoming schedule</p>
                  </div>
                  <button
                    onClick={() => nav("/dashboard/doctor/appointments")}
                    className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700"
                  >
                    View all
                  </button>
                </div>

                {nextAppointments.length === 0 ? (
                  <div className="mt-5 text-gray-600">No upcoming appointments.</div>
                ) : (
                  <div className="mt-5 space-y-3">
                    {nextAppointments.map((a) => (
                      <div
                        key={a._id}
                        className="bg-white rounded-xl border border-gray-200 p-4 flex items-center justify-between gap-4"
                      >
                        <div className="min-w-0">
                          <p className="text-gray-900 font-semibold truncate">
                            {a?.patientId?.userName || "Patient"}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            {a.startTime ? new Date(a.startTime).toLocaleString() : "-"}
                          </p>
                        </div>
                        <div className="text-sm font-semibold text-gray-700">
                          {a.status || "-"}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="dashboard-card p-6 rounded-2xl">
                <h3 className="text-lg font-bold text-gray-900">Quick Actions</h3>
                <p className="text-sm text-gray-600 mt-1">Common tasks</p>

                <div className="mt-5 space-y-3">
                  <button
                    onClick={() => nav("/dashboard/doctor/notifications")}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 hover:border-orange-300 hover:bg-orange-50 text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-orange-600 text-white rounded-full p-2">
                        <Bell className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">Review notifications</div>
                        <div className="text-sm text-gray-600">Pending approvals & updates</div>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => nav("/dashboard/doctor/patients")}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 hover:border-green-300 hover:bg-green-50 text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-green-600 text-white rounded-full p-2">
                        <Users className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">View patients</div>
                        <div className="text-sm text-gray-600">From accepted appointments</div>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => nav("/dashboard/doctor/prescriptions")}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 hover:border-purple-300 hover:bg-purple-50 text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-purple-600 text-white rounded-full p-2">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">Prescriptions</div>
                        <div className="text-sm text-gray-600">Your issued prescriptions</div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DoctorDashboard;
