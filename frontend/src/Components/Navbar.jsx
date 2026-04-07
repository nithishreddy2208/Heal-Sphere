// import React from 'react'
// import Logo from '../assets/react.svg'
import { Ambulance, Heart, Stethoscope, User, LogOut, Home, Info, Phone, Search } from "lucide-react";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Auth } from "../Contexts/AuthContext";

const Navbar = () => {
  const { user } = useContext(Auth);
  const { dispatch } = useContext(Auth);
  const { role } = useContext(Auth);
  const nav = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    dispatch({ type: "LOGOUT" });
    nav("/");
  };

  const handleFindDoctor = () => {
    if (user) {
      if (role === "Patient") {
        nav("/dashboard/patient/bookAppointment");
      } else {
        toast.error("Only Patient have access");
      }
    } else {
      nav("/login");
    }
  };
  
  const handleLogin = () => {
    nav("/login");
  };

  const handleLogoClick = () => {
    nav("/");
  };
  
  return (
    <nav className="nav-medical sticky top-0 z-50 shadow-lg">
      <ToastContainer />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <div className="flex items-center space-x-3 group cursor-pointer" onClick={handleLogoClick}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-white rounded-full p-2 shadow-lg">
                <Ambulance className="w-8 h-8 text-gradient-medical" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gradient-medical">
                HealSphere
              </h2>
              <p className="text-xs text-gray-500 font-medium">Healthcare Excellence</p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium group"
            >
              <Home className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>Home</span>
            </Link>
            
            <Link
              to="/about"
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium group"
            >
              <Info className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>About Us</span>
            </Link>
            
            <Link
              to="/contact"
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium group"
            >
              <Phone className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>Contact Us</span>
            </Link>
            
            <button
              onClick={handleFindDoctor}
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium group"
            >
              <Search className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>Find a Doctor</span>
            </button>
            
            {user !== null && (
              <Link
                to="/dashboard"
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium group"
              >
                <User className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>Dashboard</span>
              </Link>
            )}
          </div>

          {/* Auth Button */}
          <div className="flex items-center space-x-4">
            {user !== null ? (
              <button
                onClick={handleLogout}
                className="btn-medical flex items-center space-x-2 px-6 py-3 rounded-full text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out</span>
              </button>
            ) : (
              <button
                onClick={handleLogin}
                className="btn-medical flex items-center space-x-2 px-6 py-3 rounded-full text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <User className="w-4 h-4" />
                <span>Log In</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
