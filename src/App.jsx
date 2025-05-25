import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Services from "./Services/Services";
import Contact from "./Contact/Contact";
import Homepage from "./Homepage/Homepage"; // Example, create this if not present
import AdminLogin from "./Admin Login/AdminLogin"; // Example, create this if not present

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
      </Routes>
    </Router>
  );
}

export default App;