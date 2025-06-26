import React, { useState, useEffect, useRef } from "react";
import AdNav from "./AdNav";
import styles from "./Admin.module.css";

function Profile() {
    const [animate, setAnimate] = useState(false);
    const [avatar, setAvatar] = useState(() => {
        return localStorage.getItem("adminAvatar") || "/admin-avatar.png";
    });
    const [isEditing, setIsEditing] = useState(false);
    const fileInputRef = useRef(null);

    // Example admin data (replace with real data as needed)
    const admin = {
        name: "Admin User",
        email: "admin@dsclinic.com",
        role: "Administrator",
        phone: "0917-123-4567",
    };

    useEffect(() => {
        setAnimate(true);
    }, []);

    const handleAvatarClick = () => {
        if (isEditing) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatar(reader.result);
                localStorage.setItem("adminAvatar", reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        setIsEditing(false);
        // Here you can also save other profile changes if you add them
    };

    return (
        <div className={styles["profile-container"]}>
            <AdNav />
            <div className={`${styles["profile-section"]} ${animate ? styles.animate : ''}`}>
                <h1>Admin Profile</h1>
                <div className={styles["profile-card"]}>
                    <div style={{ position: "relative" }}>
                        <img
                            src={avatar}
                            alt="Admin Avatar"
                            className={styles["profile-avatar"]}
                            style={{ cursor: isEditing ? "pointer" : "default", opacity: isEditing ? 0.8 : 1 }}
                            onClick={handleAvatarClick}
                            title={isEditing ? "Click to change photo" : ""}
                        />
                        {isEditing && (
                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                style={{ display: "none" }}
                                onChange={handleFileChange}
                            />
                        )}
                    </div>
                    <div className={styles["profile-info"]}>
                        <h2>{admin.name}</h2>
                        <p><strong>Email:</strong> {admin.email}</p>
                        <p><strong>Role:</strong> {admin.role}</p>
                        <p><strong>Phone:</strong> {admin.phone}</p>
                        {!isEditing ? (
                            <button className={styles["profile-edit-btn"]} onClick={handleEditClick}>
                                Edit Profile
                            </button>
                        ) : (
                            <button className={styles["profile-edit-btn"]} onClick={handleSaveClick}>
                                Save
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;