import React from "react";
import { Heart, Shield, Users, Award, Star, CheckCircle, Target, Globe } from "lucide-react";

const AboutUs = () => {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-teal-500 text-white px-6 py-3 rounded-full text-sm font-medium mb-6">
            <Heart className="w-5 h-5" />
            <span>Our Story</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            About <span className="text-gradient-medical">HealSphere</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Pioneering the future of healthcare with innovative technology and compassionate care
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-gray-900">
                Welcome to Our Healthcare Management Platform
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                We specialize in providing cutting-edge management solutions that enhance patient care, 
                streamline operations, and ensure regulatory compliance. With a rich history of excellence 
                and a team of seasoned professionals, we offer a comprehensive suite of services.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our mission is to bridge the gap between technology and healthcare, making quality medical 
                services accessible to everyone. We believe in the power of innovation to transform 
                healthcare delivery and improve patient outcomes.
              </p>
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-start space-x-3">
                <div className="bg-gradient-to-br from-green-500 to-emerald-500 text-white rounded-full p-2">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Quality Care</h4>
                  <p className="text-sm text-gray-600">Highest standards of medical excellence</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-full p-2">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Secure Platform</h4>
                  <p className="text-sm text-gray-600">Patient data protection & privacy</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-full p-2">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Expert Team</h4>
                  <p className="text-sm text-gray-600">Qualified healthcare professionals</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-full p-2">
                  <Target className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Patient-Focused</h4>
                  <p className="text-sm text-gray-600">Personalized care approach</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Stats */}
          <div className="space-y-8">
            <div className="grid grid-cols-2 gap-6">
              <div className="dashboard-card p-6 rounded-2xl text-center group">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full p-4 w-16 h-16 mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Users className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">50+</h3>
                <p className="text-gray-600 font-medium">Expert Doctors</p>
              </div>
              
              <div className="dashboard-card p-6 rounded-2xl text-center group">
                <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-full p-4 w-16 h-16 mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Heart className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">10K+</h3>
                <p className="text-gray-600 font-medium">Happy Patients</p>
              </div>
              
              <div className="dashboard-card p-6 rounded-2xl text-center group">
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-full p-4 w-16 h-16 mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Award className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">15+</h3>
                <p className="text-gray-600 font-medium">Years Experience</p>
              </div>
              
              <div className="dashboard-card p-6 rounded-2xl text-center group">
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-full p-4 w-16 h-16 mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Star className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">4.9</h3>
                <p className="text-gray-600 font-medium">Average Rating</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="dashboard-card p-8 rounded-2xl">
            <div className="bg-gradient-to-br from-blue-500 to-teal-500 text-white rounded-full p-4 w-16 h-16 mb-6">
              <Target className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
            <p className="text-gray-600 leading-relaxed">
              To revolutionize healthcare delivery by providing innovative, accessible, and patient-centered 
              solutions that improve health outcomes and enhance the quality of life for communities worldwide.
            </p>
          </div>
          
          <div className="dashboard-card p-8 rounded-2xl">
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-full p-4 w-16 h-16 mb-6">
              <Globe className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
            <p className="text-gray-600 leading-relaxed">
              To be the leading healthcare platform that connects patients with world-class medical care, 
              making quality healthcare accessible to everyone, everywhere, at any time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
