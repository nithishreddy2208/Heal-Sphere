import React, { useContext, useEffect, useState } from "react";
import { Auth } from "../Contexts/AuthContext";
import { buildApiUrl } from "../config/api";

const AdminProfile = () => {
  const { user, role } = useContext(Auth);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const derivedRole = role || localStorage.getItem("role") || "-";

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const response = await fetch(buildApiUrl('/me'), {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setProfile(data?.user || null);
        } else {
          setProfile(null);
        }
      } catch (error) {
        console.error("Error fetching admin profile:", error);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, [user]);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="dashboard-card p-6 rounded-2xl">
        <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
        <p className="text-gray-600 mt-1">Your account details</p>

        {loading ? (
          <div className="mt-6 text-gray-600">Loading...</div>
        ) : (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <p className="text-xs font-semibold text-gray-500 uppercase">Name</p>
              <p className="text-gray-900 font-medium mt-1">{profile?.userName || "-"}</p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <p className="text-xs font-semibold text-gray-500 uppercase">Email</p>
              <p className="text-gray-900 font-medium mt-1 break-all">{profile?.email || "-"}</p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-4 md:col-span-2">
              <p className="text-xs font-semibold text-gray-500 uppercase">Role</p>
              <p className="text-gray-900 font-medium mt-1">{derivedRole}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProfile;
