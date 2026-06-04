import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import avatar from "../assets/doc-avatar.avif";
import { Mail, Stethoscope } from "lucide-react";
import { buildApiUrl } from "../config/api";

const DoctorsList = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);
      try {
        const response = await fetch(buildApiUrl('/getDoctors'), {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        if (response.ok) {
          setDoctors(Array.isArray(data?.getDocs) ? data.getDocs : []);
        } else {
          setDoctors([]);
        }
      } catch (error) {
        console.error("Error fetching doctors:", error);
        setDoctors([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="dashboard-card p-6 rounded-2xl">
        <h1 className="text-2xl font-bold text-gray-900">Doctors</h1>
        <p className="text-gray-600 mt-1">All registered doctors</p>

        {doctors.length === 0 ? (
          <div className="mt-6 text-gray-600">No doctors found.</div>
        ) : (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {doctors.map((doc) => (
              <div
                key={doc._id}
                className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={avatar}
                    alt="Doctor"
                    className="w-14 h-14 rounded-full object-cover border-2 border-white shadow"
                  />
                  <div className="min-w-0">
                    <div className="text-lg font-semibold text-gray-900 truncate">
                      {doc.name ? `Dr. ${doc.name}` : doc.userName || "Doctor"}
                    </div>
                    <div className="text-sm text-gray-600 mt-1 flex items-center gap-2">
                      <Stethoscope className="w-4 h-4 text-blue-600" />
                      <span className="truncate">{doc.specialization || "-"}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  {doc.email && (
                    <div className="text-sm text-gray-700 flex items-center gap-2 break-all">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <span>{doc.email}</span>
                    </div>
                  )}

                  {doc.csp !== undefined && doc.csp !== null && (
                    <div className="text-sm text-gray-700">
                      <span className="text-gray-500">Cost/Visit:</span> ₹{doc.csp}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorsList;
