// /* eslint-disable no-unused-vars */
// // import React from 'react'


import { useContext, useEffect } from "react";
import { Auth } from "../Contexts/AuthContext";
import { Link, useNavigate, Outlet, useLocation } from "react-router-dom";
import { Bell, Calendar, CircleArrowRightIcon, LayoutDashboardIcon, LayoutIcon, ListChecks, Pill, Stethoscope, User, UserPlus } from "lucide-react";


const HomePage = () => {
  const { role } = useContext(Auth);
  const { user } = useContext(Auth);
  const nav = useNavigate();
  const location = useLocation();

  const shouldHideSidebar = location.pathname.startsWith("/dashboard/patient/chatbot");

  useEffect(() => {
    if (user === null || role == null) {
      nav("/");
    }
  }, [user, role, nav]);

  const NavItems = {
    "Patient": [
      { id: 1, name: "Dashboard", icon: LayoutIcon, link: "patient" },
      { id: 2, name: "My Appointments", icon: Calendar, link: "patient/appointments" },
      { id: 3, name: "Book Appointment", icon: CircleArrowRightIcon, link: "patient/bookAppointment" },
      { id: 4, name: "Prescriptions", icon: Pill, link: "patient/prescriptions" },
      { id: 5, name: "Profile", icon: User, link: "patient/profile" }
    ],
    "Doctor": [
      { id: 1, name: "Dashboard", icon: LayoutDashboardIcon, link: "doctor" },
      { id: 2, name: "My Appointments", icon: Calendar, link: "doctor/appointments" },
      { id: 3, name: "My Patients", icon: ListChecks, link: "doctor/patients" },
      { id: 4, name: "Prescriptions", icon: Pill, link: "doctor/prescriptions" },
      { id: 5, name: "Notifications", icon: Bell, link: "doctor/notifications" },
      { id: 6, name: "Profile", icon: User, link: "doctor/profile" }
    ],
    "Admin": [
      { id: 1, name: "Dashboard", icon: LayoutDashboardIcon, link: "admin" },
      { id: 2, name: "Add Doctor", icon: Stethoscope, link: "admin/addDoctor" },
      { id: 3, name: "Add Admin", icon: UserPlus, link: "admin/addAdmin" },
      { id: 4, name: "Notifications", icon: Bell, link: "admin/notifications" },
      { id: 5, name: "Profile", icon: User, link: "admin/profile" },
      { id: 6, name: "Doctors", icon: Stethoscope, link: "admin/doctors" }
    ]
  };

  const items = NavItems[role];
  console.log(items);

  if (shouldHideSidebar) {
    return (
      <div className="w-full">
        <Outlet />
      </div>
    );
  }

  return (
    <div className="flex">
      <div className="border shadow-2xl w-[25%] min-h-screen p-5 bg-slate-200">
        <hr className="my-5 shadow-2xl"></hr>
        {items.map((nav) => (
          <Link
            to={nav.link}
            key={nav.id}
            className="flex items-center gap-3 text-md p-4 text-black hover:bg-slate-100 hover:text-blue-500 cursor-pointer rounded-lg my-2"
          >
            <nav.icon className="w-6 h-6" />
            <h2>{nav.name}</h2>
          </Link>
        ))}
      </div>
      <div className="flex-1 p-5">
        <Outlet />
      </div>
    </div>
  );
};

export default HomePage;

