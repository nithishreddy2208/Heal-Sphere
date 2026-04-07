import React, { useContext, useEffect, useState } from "react";
import { Auth } from "../Contexts/AuthContext";
import Loading from "./Loading";

const DoctorPrescriptions = () => {
  const { user } = useContext(Auth);
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:3000/getDoctorPrescriptions", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user}`,
          },
        });

        const data = await response.json().catch(() => ({ prescriptions: [] }));
        setPrescriptions(
          response.ok && Array.isArray(data?.prescriptions) ? data.prescriptions : []
        );
      } catch (error) {
        console.error("Error fetching doctor prescriptions:", error);
        setPrescriptions([]);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchPrescriptions();
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
        <h1 className="text-2xl font-bold text-gray-900">Prescriptions</h1>
        <p className="text-gray-600 mt-1">Prescriptions you have issued</p>

        {prescriptions.length === 0 ? (
          <div className="mt-6 text-gray-600">No prescriptions found.</div>
        ) : (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {prescriptions.map((p) => (
              <div
                key={p._id}
                className="bg-white rounded-xl border border-gray-200 p-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-600">Patient</p>
                    <p className="text-lg font-semibold text-gray-900 mt-1 truncate">
                      {p?.patientId?.userName || p?.patientName || "-"}
                    </p>
                  </div>
                  <div className="text-xs text-gray-500 whitespace-nowrap">
                    {p?.issuedOn || "-"}
                  </div>
                </div>

                <div className="mt-3">
                  <p className="text-sm font-medium text-gray-600">Cause</p>
                  <p className="text-sm text-gray-900 mt-1 break-words">
                    {p?.cause || "-"}
                  </p>
                </div>

                <div className="mt-3">
                  <p className="text-sm font-medium text-gray-600">Medicines</p>
                  <p className="text-sm text-gray-900 mt-1 break-words">
                    {Array.isArray(p?.medicines) ? p.medicines.join(", ") : "-"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorPrescriptions;
