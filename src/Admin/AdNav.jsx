import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

import aLogo from '../Assets/dsLogo.svg'; 

const AdNav = () => {
    const navigate = useNavigate();

    const navItems = ['Dashboard', 'Appointment', 'Profile'];

    const handleNavClick = (item) => {
        if (item === 'Dashboard') {
            navigate('/admin/dashboard');
        } else if (item === 'Appointment') {
            navigate('/admin/appointment');
        } else if (item === 'Profile') {
            navigate('/admin/profile');
        } else {
            console.log(`Navigating to: ${item}`);
        }
    };

    return (
        <nav className="admin-navbar">
            <div className="admin-navbar-container">
                <div className="admin-navbar-content">
                    <div className="admin-navbar-logo">
                        <img src={aLogo} alt="dsLogo" className="admin-logo" />
                    </div>
                    <div className="admin-navbar-items">
                        {navItems.map((item, index) => (
                            <button
                                key={index}
                                onClick={() => handleNavClick(item)}
                                className="admin-navbar-item"
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