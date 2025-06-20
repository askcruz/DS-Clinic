import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Services from "./Services/Services";
import Contact from "./Contact/Contact";
import Homepage from "./Homepage/Homepage"; // Example, create this if not present
import AdminLogin from "./Admin Login/AdminLogin"; // Example, create this if not present
import AboutUs from "./About Us/AboutUs"; // Example, create this if not present
import Booking from "./Book Now/Booking";
import Appointment from "./Admin/Appointment";
import Dashboard from "./Admin/Dashboard"; // Example, create this if not present
import Inquiry from "./Admin/Inquiry"; // Example, create this if not present

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/"element={<Homepage />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/admin/appointment" element={<Appointment />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        {/* Add more routes as needed */}
        <Route path="/admin/inquiry" element={<Inquiry />} />
      </Routes>
    </Router>
  );
}

export default App;