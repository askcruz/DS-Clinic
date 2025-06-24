import React, { useState, useEffect } from "react";
import AdNav from "./AdNav";
import styles from "./Admin.module.css";

function Profile() {
    const [animate, setAnimate] = useState(false);

    // Example admin data (replace with real data as needed)
    const admin = {
        name: "Admin User",
        email: "admin@dsclinic.com",
        role: "Administrator",
        phone: "0917-123-4567",
        avatar: "/admin-avatar.png", // Place an image in your public folder or use a placeholder
    };

    useEffect(() => {
        setAnimate(true);
    }, []);

    return (
        <div className={styles["profile-container"]}>
            <AdNav />
            <div className={`${styles["profile-section"]} ${animate ? styles.animate : ''}`}>
                <h1>Admin Profile</h1>
                <div className={styles["profile-card"]}>
                    <img
                        src={admin.avatar}
                        alt="Admin Avatar"
                        className={styles["profile-avatar"]}
                    />
                    <div className={styles["profile-info"]}>
                        <h2>{admin.name}</h2>
                        <p><strong>Email:</strong> {admin.email}</p>
                        <p><strong>Role:</strong> {admin.role}</p>
                        <p><strong>Phone:</strong> {admin.phone}</p>
                        <button className={styles["profile-edit-btn"]}>Edit Profile</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;