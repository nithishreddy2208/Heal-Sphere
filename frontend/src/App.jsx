import "./App.css";
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./Components/Navbar";
import Login from "./Pages/Login";
import Home from "./Components/Home";
import Signup from "./Pages/Signup";
import HomePage from "./Pages/HomePage";
import Footer from "./Components/Footer";

import BookAppointment from "./Components/BookAppointment";
import Prescriptions from "./Components/Prescriptions";
import ViewDoctor from "./Components/ViewDoctor";
import AddDoctor from "./Components/AddDoctor";
import NotificationAdmin from "./Components/NotificationAdmin";
import AddPrescription from "./Components/AddPrescription";
import AddAdmin from "./Components/AddAdmin";
import AdminDashboard from "./Components/AdminDashboard";
import PatientDashboard from "./Components/PatientDashboard";
import AdminLayout from "./Layouts/AdminLayout";
import ConfirmationStatus from "./Components/ConfirmationStatus";
import DoctorDashboard from "./Components/DoctorDashboard";
import YourAppointments from "./Components/YourAppointments";
import DoctorProfile from "./Components/DoctorProfile";
import ViewPrescription from "./Components/ViewPrescription";
import AboutUs from "./Pages/AboutUs";
import ContactUs from "./Pages/ContactUs";
import VideoCall from "./Components/VideoCall";
import ChatbotPlaceholder from "./Components/ChatbotPlaceholder";
import PatientAppointments from "./Components/PatientAppointment";
import { useContext } from "react";
import { Auth } from "./Contexts/AuthContext";
import PatientProfile from "./Components/PatientProfile";
import AdminProfile from "./Components/AdminProfile";
import DoctorsList from "./Components/DoctorsList";
import DoctorPatients from "./Components/DoctorPatients";
import DoctorPrescriptions from "./Components/DoctorPrescriptions";
import DoctorNotifications from "./Components/DoctorNotifications";

function DashboardIndexRedirect() {
  const { role } = useContext(Auth);

  if (role === "Patient") return <Navigate to="/dashboard/patient" replace />;
  if (role === "Doctor") return <Navigate to="/dashboard/doctor" replace />;
  if (role === "Admin") return <Navigate to="/dashboard/admin" replace />;
  return <Navigate to="/" replace />;
}

function App() {
  return (
    <>
      <Routes>
        {/* Video call route needs to be outside the layout with Navbar and Footer */}
        <Route path="/video-call/:roomId" element={<VideoCall />} />

        {/* Routes with Navbar and Footer */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <hr className="bg-slate-400 h-[1px]" />
              <Home />
              <Footer />
            </>
          }
        />

        <Route
          path="/*"
          element={
            <>
              <Navbar />
              <hr className="bg-slate-400 h-[1px]" />
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/dashboard" element={<HomePage />}>
                  <Route index element={<DashboardIndexRedirect />} />
                  <Route path="admin" element={<AdminLayout />}>
                    <Route index element={<AdminDashboard />} />
                    <Route path="addDoctor" element={<AddDoctor />} />
                    <Route path="addAdmin" element={<AddAdmin />} />
                    <Route
                      path="notifications"
                      element={<NotificationAdmin />}
                    />
                    <Route path="profile" element={<AdminProfile />} />
                    <Route path="doctors" element={<DoctorsList />} />
                  </Route>
                  <Route path="patient" element={<AdminLayout />}>
                    <Route index element={<PatientDashboard />} />
                    <Route
                      path="appointments"
                      element={<PatientAppointments />}
                    />
                    <Route
                      path="bookAppointment"
                      element={<BookAppointment />}
                    />
                    <Route
                      path="bookAppointment/:id"
                      element={<ViewDoctor />}
                    />
                    <Route
                      path="getPrescriptions"
                      element={<Prescriptions />}
                    />
                    <Route
                      path="prescriptions"
                      element={<Prescriptions />}
                    />
                    <Route
                      path="viewPrescription/:id"
                      element={<ViewPrescription />}
                    />
                    <Route path="status" element={<ConfirmationStatus />} />
                    <Route path="chatbot" element={<ChatbotPlaceholder />} />
                    <Route
                      path="profile"
                      element={<PatientProfile />}
                    />
                  </Route>
                  <Route path="doctor" element={<AdminLayout />}>
                    <Route index element={<DoctorDashboard />} />
                    <Route
                      path="addPrescription/:id"
                      element={<AddPrescription />}
                    />
                    <Route
                      path="getAppointments"
                      element={<YourAppointments />}
                    />
                    <Route
                      path="appointments"
                      element={<YourAppointments />}
                    />
                    <Route path="patients" element={<DoctorPatients />} />
                    <Route
                      path="prescriptions"
                      element={<DoctorPrescriptions />}
                    />
                    <Route
                      path="notifications"
                      element={<DoctorNotifications />}
                    />
                    <Route path="profile" element={<DoctorProfile />} />
                  </Route>
                </Route>
              </Routes>
              <Footer />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
