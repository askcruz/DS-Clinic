import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Admin.module.css";
import { supabase } from "../supabaseClient"; // ✅ adjust path based on your structure
import aLogo from "../Assets/dsLogo.svg";

const AdNav = () => {
  const navigate = useNavigate();

  const navItems = ["Dashboard", "Appointment", "Inquiry", "Profile"];

  const handleNavClick = (item) => {
    if (item === "Dashboard") {
      navigate("/admin/dashboard");
    } else if (item === "Appointment") {
      navigate("/admin/appointment");
    } else if (item === "Inquiry") {
      navigate("/admin/inquiry");
    } else if (item === "Profile") {
      navigate("/admin/profile");
    } else {
      console.log(`Navigating to: ${item}`);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/adminlogin");
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  return (
    <nav className={styles["admin-navbar"]}>
      <div className={styles["admin-navbar-container"]}>
        <div className={styles["admin-navbar-content"]}>
          <div className={styles["admin-navbar-logo"]}>
            <img src={aLogo} alt="dsLogo" className={styles["admin-logo"]} />
          </div>
          <div className={styles["admin-navbar-items"]}>
            {navItems.map((item, index) => (
              <button
                key={index}
                onClick={() => handleNavClick(item)}
                className={styles["admin-navbar-item"]}
              >
                {item}
              </button>
            ))}
            <button
              onClick={handleLogout}
              className={`${styles["admin-navbar-item"]} ${styles["logout-btn"]}`}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdNav;
