import React, { useContext, useEffect, useState } from "react";
import { Auth } from "../Contexts/AuthContext";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";
import { 
  Users, 
  Calendar, 
  Stethoscope, 
  Bell, 
  Shield
} from "lucide-react";
import { buildApiUrl } from "../config/api";

const AdminDashboard = () => {
  const { user } = useContext(Auth);
  const nav = useNavigate();
  const [profile, setProfile] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileResponse, doctorsResponse, notificationsResponse] = await Promise.all([
          fetch(buildApiUrl('/me'), {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user}`,
            },
          }),
          fetch(buildApiUrl('/getDoctors'), {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }),
          fetch(buildApiUrl('/getAppointmentsForAdmin'), {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user}`,
            },
          }),
        ]);

        const profileData = await profileResponse.json();
        if (profileResponse.ok) {
          setProfile(profileData?.user || null);
        } else {
          setProfile(null);
        }

        const doctorsData = await doctorsResponse.json();
        if (doctorsResponse.ok) {
          setDoctors(Array.isArray(doctorsData?.getDocs) ? doctorsData.getDocs : []);
        } else {
          setDoctors([]);
        }

        const notificationsData = await notificationsResponse.json();
        if (notificationsResponse.ok) {
          setNotifications(Array.isArray(notificationsData) ? notificationsData : []);
        } else {
          setNotifications([]);
        }
      } catch (error) {
        console.error("Error fetching admin dashboard data:", error);
        setProfile(null);
        setDoctors([]);
        setNotifications([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (!user) {
      setIsLoading(false);
      return;
    }

    fetchData();
  }, [user]);

  if (isLoading) {
    return <Loading />;
  }

  const recentRequests = (notifications || []).slice(0, 5);

  return (
    <div className="min-h-screen bg-medical-light">
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="dashboard-card p-6 rounded-2xl mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {profile?.userName ? `Welcome, ${profile.userName}` : "Welcome"}
            </h2>
            {profile?.email && <p className="text-gray-600 mt-1">{profile.email}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="dashboard-card p-6 rounded-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Doctors</p>
                  <p className="text-2xl font-bold text-gray-900">{doctors.length}</p>
                </div>
                <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-full p-3">
                  <Stethoscope className="w-6 h-6" />
                </div>
              </div>
            </div>

            <div className="dashboard-card p-6 rounded-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Requests</p>
                  <p className="text-2xl font-bold text-gray-900">{notifications.length}</p>
                </div>
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-full p-3">
                  <Bell className="w-6 h-6" />
                </div>
              </div>
            </div>

            <div className="dashboard-card p-6 rounded-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Security</p>
                  <p className="text-2xl font-bold text-gray-900">Active</p>
                </div>
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full p-3">
                  <Shield className="w-6 h-6" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 dashboard-card p-6 rounded-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Pending Appointment Requests</h3>
                  <p className="text-sm text-gray-600 mt-1">Newest requests awaiting admin approval</p>
                </div>
                <button
                  onClick={() => nav("/dashboard/admin/notifications")}
                  className="px-4 py-2 rounded-lg bg-orange-600 text-white font-semibold hover:bg-orange-700"
                >
                  Review
                </button>
              </div>

              {recentRequests.length === 0 ? (
                <div className="mt-5 text-gray-600">No pending requests.</div>
              ) : (
                <div className="mt-5 space-y-3">
                  {recentRequests.map((a) => (
                    <div
                      key={a._id}
                      className="bg-white rounded-xl border border-gray-200 p-4 flex items-center justify-between gap-4"
                    >
                      <div className="min-w-0">
                        <p className="text-gray-900 font-semibold truncate">
                          {a?.patientId?.userName || "Patient"}
                        </p>
                        <p className="text-sm text-gray-600 mt-1 truncate">
                          {a?.doctorId?.name ? `Dr. ${a.doctorId.name}` : "Doctor"}
                        </p>
                      </div>
                      <div className="text-sm text-gray-700 font-semibold">
                        {a?.startTime ? new Date(a.startTime).toLocaleString() : "-"}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="dashboard-card p-6 rounded-2xl">
              <h3 className="text-lg font-bold text-gray-900">Quick Actions</h3>
              <p className="text-sm text-gray-600 mt-1">Admin shortcuts</p>

              <div className="mt-5 space-y-3">
                <button
                  onClick={() => nav("/dashboard/admin/doctors")}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 hover:border-green-300 hover:bg-green-50 text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-green-600 text-white rounded-full p-2">
                      <Stethoscope className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Manage doctors</div>
                      <div className="text-sm text-gray-600">View all registered doctors</div>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => nav("/dashboard/admin/addDoctor")}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-600 text-white rounded-full p-2">
                      <Users className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Add doctor</div>
                      <div className="text-sm text-gray-600">Create a new doctor account</div>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => nav("/dashboard/admin/addAdmin")}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 hover:border-purple-300 hover:bg-purple-50 text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-600 text-white rounded-full p-2">
                      <Shield className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Add admin</div>
                      <div className="text-sm text-gray-600">Create an admin account</div>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
