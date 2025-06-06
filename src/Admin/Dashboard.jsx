import React from "react";
import AdNav from "./AdNav";
import './Admin.css';

function Dashboard() {
    return (
        <div className="dashboard-container">
            <AdNav />
            <div className="dashboard-content">
                <h1>Admin Dashboard</h1>
                {/* Additional components or content can be added here */}
            </div>
        </div>
    );
}

export default Dashboard;