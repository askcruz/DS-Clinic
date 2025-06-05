import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Services from "./Services/Services";
import Contact from "./Contact/Contact";
import Homepage from "./Homepage/Homepage"; // Example, create this if not present
import AdminLogin from "./Admin Login/AdminLogin"; // Example, create this if not present
import AboutUs from "./About Us/AboutUs"; // Example, create this if not present
import Booking from "./Book Now/Booking";

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
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;