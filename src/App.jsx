import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Services from "./Services/Services";
import Contact from "./Contact/Contact";
import Homepage from "./Homepage/Homepage";
import AdminLogin from "./Admin Login/AdminLogin";
import AboutUs from "./About Us/AboutUs";
import Booking from "./Book Now/Booking";
import Appointment from "./Admin/Appointment";
import Dashboard from "./Admin/Dashboard";
import Inquiry from "./Admin/Inquiry";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./Admin/Profile"; // Example, create this if not present
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/booking" element={<Booking />} />

        <Route
          path="/admin/appointment"
          element={
            <ProtectedRoute>
              <Appointment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/inquiry"
          element={
            <ProtectedRoute>
              <Inquiry />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
