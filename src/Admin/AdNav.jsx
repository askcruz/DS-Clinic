import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Admin.module.css';

import aLogo from '../Assets/dsLogo.svg'; 

const AdNav = () => {
    const navigate = useNavigate();

    const navItems = ['Dashboard', 'Appointment', 'Profile', 'Inquiry'];

    const handleNavClick = (item) => {
        if (item === 'Dashboard') {
            navigate('/admin/dashboard');
        } else if (item === 'Appointment') {
            navigate('/admin/appointment');
        } else if (item === 'Profile') {
            navigate('/admin/profile');
        } else if (item === 'Inquiry') { //added this for 
            navigate('/admin/Inquiry'); 
        } else {
            console.log(`Navigating to: ${item}`);
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
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default AdNav;