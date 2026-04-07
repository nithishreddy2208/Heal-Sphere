/* eslint-disable react/prop-types */
import React from "react";
import avatar from "../assets/doc-avatar.avif";
import { useNavigate } from "react-router-dom";
import { Stethoscope, Calendar, DollarSign, Star, MapPin, Clock, User } from "lucide-react";

const Card = ({ doctor }) => {
  const navigate = useNavigate();

  const handleBookAppointment = () => {
    navigate(`/dashboard/patient/bookAppointment/${doctor._id}`);
  };
  
  return (
    <div className="medical-card w-full h-auto p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group">
      <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-4 lg:space-y-0 lg:space-x-6">
        {/* Doctor Avatar */}
        <div className="relative">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity"></div>
            <img 
              className="relative w-24 h-24 lg:w-32 lg:h-32 rounded-full object-cover border-4 border-white shadow-lg" 
              src={avatar} 
              alt="Doctor Avatar" 
            />
          </div>
          <div className="absolute -top-2 -right-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full p-1">
            <Stethoscope className="w-4 h-4" />
          </div>
        </div>

        {/* Doctor Info */}
        <div className="flex-1 text-center lg:text-left space-y-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
              Dr. {doctor.name}
            </h3>
            <div className="flex items-center justify-center lg:justify-start space-x-2 text-blue-600 font-medium">
              <Stethoscope className="w-4 h-4" />
              <span>{doctor.specialization}</span>
            </div>
          </div>

          {/* Doctor Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 text-sm">
            <div className="flex items-center space-x-2 text-gray-600">
              <DollarSign className="w-4 h-4 text-green-500" />
              <span className="font-medium">₹{doctor.costPerVisit}</span>
              <span className="text-gray-500">per visit</span>
            </div>
            
            <div className="flex items-center space-x-2 text-gray-600">
              <Star className="w-4 h-4 text-yellow-500" />
              <span className="font-medium">4.9</span>
              <span className="text-gray-500">rating</span>
            </div>
            
            <div className="flex items-center space-x-2 text-gray-600">
              <MapPin className="w-4 h-4 text-red-500" />
              <span className="text-gray-500">Online Consultation</span>
            </div>
            
            <div className="flex items-center space-x-2 text-gray-600">
              <Clock className="w-4 h-4 text-blue-500" />
              <span className="text-gray-500">Available Today</span>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-2">
            <button 
              onClick={handleBookAppointment}
              className="btn-medical flex items-center justify-center space-x-2 w-full px-6 py-3 rounded-full text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <Calendar className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>Book Appointment</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
