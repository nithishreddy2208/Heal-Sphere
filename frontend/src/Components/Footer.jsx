import React from 'react'
import { Heart, Phone, Mail, MapPin, Clock, Shield, Award } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-blue-900 to-teal-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-500 to-teal-500 rounded-full p-2">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">HealSphere</h3>
                <p className="text-blue-200 text-sm">Healthcare Excellence</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Providing world-class healthcare services with compassion, innovation, and excellence. 
              Your health is our priority.
            </p>
            <div className="flex space-x-4">
              <div className="bg-white bg-opacity-10 rounded-full p-2 hover:bg-opacity-20 transition-all duration-300 cursor-pointer">
                <Shield className="w-5 h-5" />
              </div>
              <div className="bg-white bg-opacity-10 rounded-full p-2 hover:bg-opacity-20 transition-all duration-300 cursor-pointer">
                <Award className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-300 hover:text-white transition-colors duration-200">Home</a></li>
              <li><a href="/about" className="text-gray-300 hover:text-white transition-colors duration-200">About Us</a></li>
              <li><a href="/contact" className="text-gray-300 hover:text-white transition-colors duration-200">Contact</a></li>
              <li><a href="/dashboard" className="text-gray-300 hover:text-white transition-colors duration-200">Dashboard</a></li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Services</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Book Appointment</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Online Consultation</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Emergency Care</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Health Records</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-400" />
                <span className="text-gray-300 text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-400" />
                <span className="text-gray-300 text-sm">info@healsphere.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-blue-400" />
                <span className="text-gray-300 text-sm">123 Healthcare Ave, Medical City</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-blue-400" />
                <span className="text-gray-300 text-sm">24/7 Emergency Care</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-gray-300 text-sm">
              <span>Copyright</span>
              <span className="font-bold text-lg">©</span>
              <span>2024 HealSphere Healthcare Inc. All rights reserved.</span>
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Privacy Policy</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Terms of Service</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
