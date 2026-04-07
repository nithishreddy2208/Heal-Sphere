import React, { useContext, useEffect, useMemo, useState } from "react";
import { Auth } from "../Contexts/AuthContext";
import Loading from "./Loading";
import patientAvatar from "../assets/maskman.jpg";

const DoctorPatients = () => {
  const { user } = useContext(Auth);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const patients = useMemo(() => {
    const map = new Map();
    (appointments || []).forEach((a) => {
      const p = a?.patientId;
      const id = p?._id || p;
      if (!id) return;
      if (!map.has(id)) {
        map.set(id, {
          _id: id,
          userName: p?.userName || "Unknown",
        });
      }
    });
    return Array.from(map.values());
  }, [appointments]);

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:3000/getAppointments", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user}`,
          },
        });

        const data = await response.json().catch(() => []);
        setAppointments(response.ok && Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching doctor appointments:", error);
        setAppointments([]);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchAppointments();
    } else {
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="dashboard-card p-6 rounded-2xl">
        <h1 className="text-2xl font-bold text-gray-900">My Patients</h1>
        <p className="text-gray-600 mt-1">Patients from your upcoming appointments</p>

        {patients.length === 0 ? (
          <div className="mt-6 text-gray-600">No patients found.</div>
        ) : (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {patients.map((p) => (
              <div
                key={p._id}
                className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={patientAvatar}
                    alt="Patient"
                    className="w-14 h-14 rounded-full object-cover border-2 border-white shadow"
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-600">Patient</p>
                    <p className="text-lg font-semibold text-gray-900 mt-1 truncate">
                      {p.userName}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorPatients;
