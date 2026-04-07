import { Home, Mail, Phone, MapPin, Clock, MessageCircle, Send, Globe } from "lucide-react";
import React from "react";

const ContactUs = () => {
  return (
    <section className="py-20 bg-medical-light relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-teal-500 text-white px-6 py-3 rounded-full text-sm font-medium mb-6">
            <MessageCircle className="w-5 h-5" />
            <span>Get In Touch</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Contact <span className="text-gradient-medical">Us</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're here to help and answer any questions you might have. We look forward to hearing from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="dashboard-card p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Get In Touch</h3>
              <div className="space-y-6">
                {/* Address */}
                <div className="flex items-start space-x-4 group">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full p-3 group-hover:scale-110 transition-transform">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Our Location</h4>
                    <p className="text-gray-600 leading-relaxed">
                      CVR College of Engineering<br />
                      Vastunagar, Ibrahimpatnam<br />
                      Hyderabad, Telangana, 501510
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start space-x-4 group">
                  <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-full p-3 group-hover:scale-110 transition-transform">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Call Us</h4>
                    <a 
                      href="tel:+918367661141" 
                      className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                    >
                      +91 8367661141
                    </a>
                    <p className="text-gray-600 text-sm mt-1">24/7 Emergency Support</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-4 group">
                  <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-full p-3 group-hover:scale-110 transition-transform">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Email Us</h4>
                    <a 
                      href="mailto:cvrhospitals@gmail.com" 
                      className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                    >
                      cvrhospitals@gmail.com
                    </a>
                    <p className="text-gray-600 text-sm mt-1">For any queries or support</p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start space-x-4 group">
                  <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-full p-3 group-hover:scale-110 transition-transform">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Working Hours</h4>
                    <p className="text-gray-600">
                      Monday - Friday: 8:00 AM - 8:00 PM<br />
                      Saturday: 9:00 AM - 6:00 PM<br />
                      Sunday: 10:00 AM - 4:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Contact Form */}
            <div className="dashboard-card p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h3>
              <form className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    placeholder="Your Name" 
                    className="medical-input w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input 
                    type="email" 
                    placeholder="Your Email" 
                    className="medical-input w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <input 
                  type="text" 
                  placeholder="Subject" 
                  className="medical-input w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <textarea 
                  placeholder="Your Message" 
                  rows="4"
                  className="medical-input w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                ></textarea>
                <button 
                  type="submit"
                  className="btn-medical flex items-center justify-center space-x-2 w-full px-6 py-3 rounded-lg text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <Send className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>Send Message</span>
                </button>
              </form>
            </div>
          </div>

          {/* Map Section */}
          <div className="space-y-8">
            <div className="dashboard-card p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Find Us</h3>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-teal-500 rounded-2xl blur-lg opacity-20"></div>
                <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3811.4661085104526!2d78.59465581078462!3d17.196163183590578!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcba659868b4727%3A0xf39a771705e23170!2sCVR%20College%20Of%20Engineering!5e0!3m2!1sen!2sin!4v1738898607085!5m2!1sen!2sin"
                    width="100%"
                    height="400"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-2xl"
                  ></iframe>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="dashboard-card p-6 rounded-2xl text-center group">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full p-4 w-16 h-16 mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Globe className="w-8 h-8" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Online Support</h4>
                <p className="text-sm text-gray-600">24/7 Virtual Consultation</p>
              </div>
              
              <div className="dashboard-card p-6 rounded-2xl text-center group">
                <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-full p-4 w-16 h-16 mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <MessageCircle className="w-8 h-8" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Live Chat</h4>
                <p className="text-sm text-gray-600">Instant Response</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
