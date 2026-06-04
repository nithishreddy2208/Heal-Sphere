/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { Auth } from "../Contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Heart, User, Lock, Shield, Eye, EyeOff, Stethoscope, Mail } from "lucide-react";
import { buildApiUrl } from "../config/api";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState({
    isAdmin: false,
    isPatient: false,
    isDoctor: false
  });
  const { dispatch } = useContext(Auth);
  const nav = useNavigate();
  const { user } = useContext(Auth);

  useEffect(() => {
    if (user !== null) {
      nav("/dashboard")
    }
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const user = await fetch(buildApiUrl('/login'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userName, password, roles: role })
      })

      const data = await user.json();
      if (user.ok) {
        console.log('Login Successful', data);
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.r)
        dispatch({ type: 'LOGIN', payload: { token: data.token, role: data.r } })
        nav("/dashboard")
      } else {
        console.log(data.message);
      }
      setUserName("");
      setPassword("");

    } catch (error) {
      console.log(error);
    }
  }

  const handleChange = (e) => {
    const selectedRole = e.target.value
    setRole({
      isAdmin: selectedRole === "admin",
      isPatient: selectedRole === "patient",
      isDoctor: selectedRole === 'doctor'
    })
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
            <div className="relative bg-gradient-to-br from-blue-500 to-teal-500 rounded-3xl p-12 text-white text-center">
              <div className="space-y-8">
                <div className="bg-white/20 rounded-full p-6 w-24 h-24 mx-auto flex items-center justify-center">
                  <Heart className="w-12 h-12" />
                </div>
                
                <div>
                  <h2 className="text-3xl font-bold mb-4">Welcome to HealSphere</h2>
                  <p className="text-lg opacity-90 leading-relaxed">
                    Your trusted healthcare platform connecting patients with world-class medical professionals.
                  </p>
                </div>
                
                <div className="grid grid-cols-3 gap-6 pt-8">
                  <div className="text-center">
                    <div className="bg-white/20 rounded-full p-4 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                      <Stethoscope className="w-8 h-8" />
                    </div>
                    <p className="text-sm font-medium">Expert Doctors</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="bg-white/20 rounded-full p-4 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                      <Shield className="w-8 h-8" />
                    </div>
                    <p className="text-sm font-medium">Secure Platform</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="bg-white/20 rounded-full p-4 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                      <Mail className="w-8 h-8" />
                    </div>
                    <p className="text-sm font-medium">24/7 Support</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="flex flex-col items-center justify-center">
          <div className="w-full max-w-md">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-teal-500 text-white px-6 py-3 rounded-full text-sm font-medium mb-6">
                <Heart className="w-5 h-5" />
                <span>Welcome Back</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Sign in to your account
              </h1>
              <p className="text-gray-600">
                Access your healthcare dashboard and manage your appointments
              </p>
            </div>

            {/* Login Form */}
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
                    placeholder="Enter your username"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
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
                      placeholder="Enter your password"
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

                {/* Role Selection */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Select Role
                  </label>
                  <select
                    name="role"
                    onChange={handleChange}
                    className="medical-input w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Choose your role</option>
                    <option value="doctor">Doctor</option>
                    <option value="patient">Patient</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="btn-medical w-full flex items-center justify-center space-x-2 px-6 py-3 rounded-lg text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <Shield className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>Sign In</span>
                </button>

                {/* Register Link */}
                <div className="text-center pt-4">
                  <p className="text-gray-600">
                    Don't have an account?{" "}
                    <Link
                      to="/signup"
                      className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                    >
                      Create one here
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

export default Login;
