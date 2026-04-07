import React, { useState, useEffect, useContext } from "react";
import { Auth } from "../Contexts/AuthContext";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";
import { 
  Calendar, 
  FileText, 
  MessageCircle
} from "lucide-react";

const PatientDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(Auth);
  const nav = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [appointmentsResponse, profileResponse, prescriptionsResponse] = await Promise.all([
          fetch("http://localhost:3000/getPatientAppointments", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user}`,
            },
          }),
          fetch("http://localhost:3000/me", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user}`,
            },
          }),
          fetch("http://localhost:3000/getPrescription", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user}`,
            },
          }),
        ]);

        const appointmentsData = await appointmentsResponse.json();
        if (appointmentsResponse.ok) {
          setAppointments(Array.isArray(appointmentsData) ? appointmentsData : []);
        } else {
          setAppointments([]);
        }

        const profileData = await profileResponse.json();
        if (profileResponse.ok) {
          setProfile(profileData?.user || null);
        } else {
          setProfile(null);
        }

        const prescriptionsData = await prescriptionsResponse.json();
        if (prescriptionsResponse.ok) {
          setPrescriptions(Array.isArray(prescriptionsData) ? prescriptionsData : []);
        } else {
          setPrescriptions([]);
        }
      } catch (error) {
        console.error("Error fetching patient dashboard data:", error);
        setAppointments([]);
        setPrescriptions([]);
        setProfile(null);
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

  const handleOpenChatbot = () => {
    window.open("http://localhost:8081", "_blank");
  };

  if (isLoading) {
    return <Loading />;
  }

  const upcomingAppointments = (appointments || [])
    .slice()
    .sort((a, b) => new Date(a.startTime) - new Date(b.startTime))
    .slice(0, 3);

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
                <p className="text-sm font-medium text-gray-600">My Appointments</p>
                <p className="text-2xl font-bold text-gray-900">{appointments.length}</p>
              </div>
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full p-3">
                <Calendar className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="dashboard-card p-6 rounded-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Prescriptions</p>
                <p className="text-2xl font-bold text-gray-900">{prescriptions.length}</p>
              </div>
              <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-full p-3">
                <FileText className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="dashboard-card p-6 rounded-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">AI Assistant</p>
                <p className="text-2xl font-bold text-gray-900">Available</p>
              </div>
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-full p-3">
                <MessageCircle className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 dashboard-card p-6 rounded-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Upcoming Appointments</h3>
                <p className="text-sm text-gray-600 mt-1">Your next scheduled visits</p>
              </div>
              <button
                onClick={() => nav("/dashboard/patient/appointments")}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700"
              >
                View all
              </button>
            </div>

            {upcomingAppointments.length === 0 ? (
              <div className="mt-5 text-gray-600">No upcoming appointments.</div>
            ) : (
              <div className="mt-5 space-y-3">
                {upcomingAppointments.map((a) => (
                  <div
                    key={a._id}
                    className="bg-white rounded-xl border border-gray-200 p-4 flex items-center justify-between gap-4"
                  >
                    <div className="min-w-0">
                      <p className="text-gray-900 font-semibold truncate">
                        {a?.doctorId?.name ? `Dr. ${a.doctorId.name}` : "Doctor"}
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
                onClick={() => nav("/dashboard/patient/bookAppointment")}
                className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-blue-600 text-white rounded-full p-2">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Book an appointment</div>
                    <div className="text-sm text-gray-600">Find available doctors</div>
                  </div>
                </div>
              </button>

              <button
                onClick={() => nav("/dashboard/patient/prescriptions")}
                className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 hover:border-green-300 hover:bg-green-50 text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-green-600 text-white rounded-full p-2">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">View prescriptions</div>
                    <div className="text-sm text-gray-600">Your treatment history</div>
                  </div>
                </div>
              </button>

              <button
                onClick={handleOpenChatbot}
                className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 hover:border-purple-300 hover:bg-purple-50 text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-purple-600 text-white rounded-full p-2">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Ask AI Assistant</div>
                    <div className="text-sm text-gray-600">Symptoms and guidance</div>
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

export default PatientDashboard;
