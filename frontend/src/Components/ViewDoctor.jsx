

import React, { useContext, useEffect, useState } from "react";
import doc from "../assets/doc.avif";
import { Star } from "lucide-react";
import { useParams } from "react-router-dom";
import { Auth } from "../Contexts/AuthContext";
import Loading from './Loading'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ViewDoctor = () => {
  const [details, setDetails] = useState(null);
  const { id } = useParams();
  const { user } = useContext(Auth);
  const [date, setDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchDetails();
  }, []);

  const bookAppointment = async () => {
    // Validate date is selected
    if (!date) {
      toast.error("Please select a date and time");
      return;
    }

    // Validate date is not in the past
    const selectedDate = new Date(date);
    const now = new Date();
    if (selectedDate < now) {
      toast.error("Please select a future date and time");
      return;
    }

    // Get token - prioritize localStorage as it's most reliable
    const tokenFromStorage = localStorage.getItem("token");
    let token = tokenFromStorage || user;

    // Clean token if it has extra quotes
    if (token && typeof token === 'string') {
      token = token.replace(/^"|"$/g, '');
    }

    console.log("=== BOOK APPOINTMENT DEBUG ===");
    console.log("Token from localStorage:", tokenFromStorage ? "EXISTS" : "MISSING");
    console.log("Token from context (user):", user ? "EXISTS" : "MISSING");
    console.log("Using token:", token ? "YES" : "NO");
    if (token) {
      console.log("Token length:", token.length);
      console.log("Token preview:", token.substring(0, 20) + "...");
    }

    if (!token || token === "null" || token === "undefined") {
      toast.error("Please login to book an appointment");
      return;
    }

    setIsLoading(true);
    try {
      // Convert datetime-local format to ISO string
      const startTimeISO = new Date(date).toISOString();

      console.log("Sending request to:", "http://localhost:3000/bookAppointment");
      console.log("Request body:", { doctorId: id, startTime: startTimeISO });
      console.log("Authorization header:", `Bearer ${token.substring(0, 20)}...`);

      const response = await fetch(`http://localhost:3000/bookAppointment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          doctorId: id,
          startTime: startTimeISO
        })
      });

      console.log("Response status:", response.status);
      console.log("Response ok:", response.ok);

      let data;
      try {
        const responseText = await response.text();
        console.log("Response text:", responseText);
        data = responseText ? JSON.parse(responseText) : {};
      } catch (parseError) {
        console.error("Error parsing response:", parseError);
        data = { message: "Invalid response from server" };
      }

      console.log("Response data:", data);

      if (response.ok) {
        toast.success("Appointment requested successfully! Check Notifications");
        setDate(""); // Clear the date field after successful booking
      } else {
        // Handle 401 Unauthorized specifically
        if (response.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("role");
          // Optionally dispatch logout if we had access to dispatch, but clearing storage is key
          // We can also reload the page to reset context if needed, or just redirect
          toast.error("Session expired. Please login again.");
          setTimeout(() => {
            window.location.href = "/login";
          }, 2000);
          return;
        }

        // Show more detailed error message
        const errorMessage = data.message || data.error || "Failed to book appointment";
        console.error("Booking error:", errorMessage, data);
        toast.error(errorMessage);
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDetails = async () => {
    try {
      // Get token - prioritize localStorage as it's most reliable
      const tokenFromStorage = localStorage.getItem("token");
      const token = tokenFromStorage || user;

      if (!token || token === "null" || token === "undefined") {
        console.error("No token available");
        return;
      }

      const response = await fetch(`http://localhost:3000/doctors/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });



      const data = await response.json();


      if (response.ok) {
        setDetails(data.getDoc);
      } else {
        console.error('Failed to fetch doctor details:', data);
      }
    } catch (error) {
      console.error('Error fetching doctor details:', error);
    }
  };

  if (!details) {
    return <Loading />;
  }

  return (
    <div className="flex justify-evenly mt-5">
      <ToastContainer />
      <div>
        <div className="flex ">
          <div className="w-36 shadow-2xl rounded-full">
            <img className="rounded-xl" src={doc} alt="Doctor" />
          </div>
          <div className="flex flex-col justify-center items-start ml-5">
            <span className="mr-14 bg-blue-400 p-2 rounded-xl text-white">
              {details.specialization}
            </span>
            <p className="text-xl font-semibold mt-4">Dr. {details.name}</p>
            <p className="flex mr-24 gap-2 mt-2">
              <Star color="gold" />
              4.5
            </p>
            <p className="mt-3">Specialization in {details.specialization}</p>
          </div>
        </div>
        <div className="mt-10">
          <h1>About</h1>
          <hr className="bg-slate-400 h-[1px] mt-4" />
          <p className="mt-6 flex">
            About <span className="text-blue-500 ml-2 font-semibold">{details.name}</span>
          </p>
          <p className="mt-6 text-sm text-slate-600">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga,
            <br />
            optio expedita impedit consequatur non soluta ad repellat ea ipsum
            <br />
            rerum modi iste corrupti veniam aut recusandae sit fugiat et. Cum.
            <br />
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores
            <br />
            saepe, accusamus provident quia beatae totam atque laborum officiis
            <br />
            quaerat voluptates recusandae iure? Obcaecati voluptate incidunt
            <br />
            doloribus rerum, libero voluptatibus laborum!
          </p>
        </div>
      </div>
      <div className="w-72 h-64 bg-slate-200 shadow-xl mr-28 mt-14 rounded-xl">
        <div className="flex justify-center items-center gap-20 mt-5">
          <h1 className="text-lg font-semibold">Normal Cost</h1>
          <p>Rs{details.costPerVisit}</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <p className="my-7">Choose the Time Slot:</p>
          {/* <div className="flex justify-around items-center mt-3">
            <p className="text-sm text-slate-600">Sunday:</p>
            <p className="text-sm text-slate-600">4:30pm-9:30pm</p>
          </div>
          <div className="flex justify-around items-center mt-3">
            <p className="text-sm text-slate-600">Tuesday:</p>
            <p className="text-sm text-slate-600">4:30pm-9:30pm</p>
          </div>
          <div className="flex justify-around items-center mt-3">
            <p className="text-sm text-slate-600">Thursday:</p>
            <p className="text-sm text-slate-600">4:30pm-9:30pm</p>
          </div> */}
          <input
            className="p-3 bg-slate-100 rounded-md w-56"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            type="datetime-local"
            min={new Date().toISOString().slice(0, 16)}
            required
          />

          <div className="flex justify-center items-center">
            <button
              className={`w-60 shadow-lg mt-4 h-9 rounded-full text-white text-xs font-medium transition-all ${!date || isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-800'
                }`}
              onClick={bookAppointment}
              disabled={!date || isLoading}
            >
              {isLoading ? "Booking..." : "Book Appointment"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDoctor;
