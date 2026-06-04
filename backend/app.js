const express = require("express");
const http = require("http");
const cors = require("cors");
const dotenv = require("dotenv");
const connectToDb = require("./Config/connectToDb");
const authRoutes = require("./Routes/apis/authRoutes");
const doctorRoutes = require("./Routes/apis/doctors/doctorsRoutes");
const patientRoutes = require("./Routes/apis/patients/makeAppointment");
const {
  routes,
  initializeWebSocketServer,
  startAppointmentScheduler,
} = require("./Routes/videoCallRoutes");

// Load environment variables
dotenv.config();

// Initialize Express app and HTTP server
const app = express();
const server = http.createServer(app);

// ✅ Initialize WebSocket server AFTER creating HTTP server
initializeWebSocketServer(server);
startAppointmentScheduler();

// Middleware
const allowedOrigins = process.env.NODE_ENV === 'production' 
  ? [process.env.FRONTEND_URL || "https://heal-sphere-blue.vercel.app", "https://heal-sphere-blue.vercel.app"]
  : ["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:5174", "http://127.0.0.1:5174"];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
app.use(express.json());

// Connect to Database
connectToDb();

// Routes
app.get("/", (req, res) => {
  res.send("Server is running...");
});
app.use("/", authRoutes);
app.use("/", doctorRoutes);
app.use("/", patientRoutes);
app.use("/", routes); // Adding WebSocket routes

// Start HTTP server
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
