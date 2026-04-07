import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Auth } from "../Contexts/AuthContext";
import { Heart, User, Lock, Shield, Eye, EyeOff, Stethoscope, Mail, CheckCircle, ArrowRight } from "lucide-react";

const Signup = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const nav = useNavigate();
  const { user } = useContext(Auth);

  useEffect(() => {
    if (user) {
      nav("/dashboard");
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const user = await fetch(`http://localhost:3000/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userName, email, password })
      })

      const data = await user.json();
      if (user.ok) {
        nav("/login")
      } else {
        console.log(data.message);
      }
      setUserName("");
      setEmail("");
      setPassword("");

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="min-h-screen bg-medical-light flex items-center justify-center p-4">
      <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Side - Medical Image */}
        <div className="hidden lg:block relative">
          <div className="relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}></div>
            
            {/* Medical Illustration */}
            <div className="relative bg-gradient-to-br from-teal-500 to-blue-500 rounded-3xl p-12 text-white text-center">
              <div className="space-y-8">
                <div className="bg-white/20 rounded-full p-6 w-24 h-24 mx-auto flex items-center justify-center">
                  <Shield className="w-12 h-12" />
                </div>
                
                <div>
                  <h2 className="text-3xl font-bold mb-4">Join HealSphere</h2>
                  <p className="text-lg opacity-90 leading-relaxed">
                    Create your account and start your journey towards better healthcare with our trusted platform.
                  </p>
                </div>
                
                {/* Features List */}
                <div className="space-y-4 pt-8">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-300" />
                    <span className="text-sm">Access to expert doctors</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-300" />
                    <span className="text-sm">Secure appointment booking</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-300" />
                    <span className="text-sm">24/7 healthcare support</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-300" />
                    <span className="text-sm">Personalized care plans</span>
                  </div>
                </div>
                
                <div className="pt-4">
                  <button className="flex items-center justify-center space-x-2 bg-white/20 hover:bg-white/30 px-6 py-3 rounded-full transition-all duration-300 group">
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Signup Form */}
        <div className="flex flex-col items-center justify-center">
          <div className="w-full max-w-md">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-teal-500 to-blue-500 text-white px-6 py-3 rounded-full text-sm font-medium mb-6">
                <Heart className="w-5 h-5" />
                <span>Get Started</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Create your account
              </h1>
              <p className="text-gray-600">
                Join thousands of patients who trust HealSphere for their healthcare needs
              </p>
            </div>

            {/* Signup Form */}
            <div className="dashboard-card p-8 rounded-2xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Username Field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>Username</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Choose a username"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="medical-input w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                    <Mail className="w-4 h-4" />
                    <span>Email Address</span>
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="medical-input w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                    <Lock className="w-4 h-4" />
                    <span>Password</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="medical-input w-full px-4 py-3 pr-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="btn-medical w-full flex items-center justify-center space-x-2 px-6 py-3 rounded-lg text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <Shield className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>Create Account</span>
                </button>

                {/* Login Link */}
                <div className="text-center pt-4">
                  <p className="text-gray-600">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                    >
                      Sign in here
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
