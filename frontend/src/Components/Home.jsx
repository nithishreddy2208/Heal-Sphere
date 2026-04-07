import React, { useContext } from "react";
import { Heart, Stethoscope, Shield, Clock, MapPin, Star, ArrowRight, Calendar, Users, Award, Bot } from "lucide-react";

import temp from '../assets/ex1.avif'
import ContactUs from '../Pages/ContactUs'
import AboutUs from "../Pages/AboutUs";
import { Auth } from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const {user} = useContext(Auth);
  const {role} = useContext(Auth);
  const nav = useNavigate();

  const handleAppointment = () => {
    if (user) {
      if (role === "Patient") {
        nav('/dashboard/patient/bookAppointment');
      } else {
        toast.error("Only Patient have access")
      }
    } else {
      nav("/login");
    }
  }

  const handleOpenAssistant = () => {
    nav('/dashboard/patient/chatbot');
  }

  return (
    <>
      <ToastContainer />
      
      {/* Hero Section */}
      <section className="relative min-h-screen bg-medical-light overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-teal-50"></div>
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-teal-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                  <Heart className="w-4 h-4" />
                  <span>Trusted Healthcare Platform</span>
                </div>
                
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="text-gradient-medical">We help patients</span><br />
                  <span className="text-gray-800">to live a longer</span><br />
                  <span className="text-gradient-medical">healthy life</span>
                </h1>
                
                <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
                  Experience world-class healthcare at your fingertips. Connect with expert doctors, 
                  book appointments seamlessly, and receive personalized care from the comfort of your home.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={handleAppointment}
                  className="btn-medical flex items-center justify-center space-x-2 px-8 py-4 rounded-full text-white font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 group"
                >
                  <Calendar className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>Request an Appointment</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <button className="flex items-center justify-center space-x-2 px-8 py-4 rounded-full border-2 border-blue-500 text-blue-600 font-semibold text-lg hover:bg-blue-50 transition-all duration-300 group">
                  <Stethoscope className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>Learn More</span>
                </button>
              </div>

              {/* Stats Section */}
              <div className="grid grid-cols-3 gap-8 pt-8">
                <div className="text-center group">
                  <div className="bg-gradient-to-br from-orange-400 to-orange-600 text-white rounded-2xl p-4 mb-3 group-hover:scale-105 transition-transform">
                    <h3 className="text-3xl font-bold">30+</h3>
                  </div>
                  <p className="text-gray-600 font-medium">Years of Experience</p>
                </div>
                
                <div className="text-center group">
                  <div className="bg-gradient-to-br from-purple-400 to-purple-600 text-white rounded-2xl p-4 mb-3 group-hover:scale-105 transition-transform">
                    <h3 className="text-3xl font-bold">15+</h3>
                  </div>
                  <p className="text-gray-600 font-medium">Clinic Locations</p>
                </div>
                
                <div className="text-center group">
                  <div className="bg-gradient-to-br from-green-400 to-green-600 text-white rounded-2xl p-4 mb-3 group-hover:scale-105 transition-transform">
                    <h3 className="text-3xl font-bold">100%</h3>
                  </div>
                  <p className="text-gray-600 font-medium">Patient Satisfaction</p>
                </div>
              </div>
            </div>

            {/* Right Image - Reduced Size */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative z-10 max-w-md">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-teal-500 rounded-3xl blur-2xl opacity-20"></div>
                <div className="relative bg-white rounded-3xl p-6 shadow-2xl">
                  <img 
                    className="w-full h-auto rounded-2xl shadow-lg max-h-96 object-cover" 
                    src={temp} 
                    alt="Healthcare Professional"
                  />
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-white rounded-full p-4 shadow-lg">
                <Shield className="w-6 h-6 text-green-500" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-full p-4 shadow-lg">
                <Star className="w-6 h-6 text-yellow-500" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose <span className="text-gradient-medical">HealSphere</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide comprehensive healthcare solutions with cutting-edge technology and compassionate care.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="dashboard-card p-8 rounded-2xl text-center group">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full p-4 w-16 h-16 mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Expert Doctors</h3>
              <p className="text-gray-600">Connect with highly qualified and experienced healthcare professionals.</p>
            </div>

            <div className="dashboard-card p-8 rounded-2xl text-center group">
              <div className="bg-gradient-to-br from-teal-500 to-teal-600 text-white rounded-full p-4 w-16 h-16 mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Clock className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">24/7 Support</h3>
              <p className="text-gray-600">Round-the-clock healthcare support whenever you need it.</p>
            </div>

            <div className="dashboard-card p-8 rounded-2xl text-center group">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-full p-4 w-16 h-16 mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Award className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Quality Care</h3>
              <p className="text-gray-600">Premium healthcare services with the highest standards of quality.</p>
            </div>
          </div>
        </div>
      </section>

      <AboutUs />
      <ContactUs />

      {/* Floating AI Assistant Button */}
      <button
        onClick={handleOpenAssistant}
        aria-label="Open AI Assistant"
        className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <Bot className="w-5 h-5" />
        <span className="font-semibold">AI Assistant</span>
      </button>
    </>
  );
};

export default Home;
