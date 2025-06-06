import React from "react";
import AdNav from "./AdNav";
import styles from "./Admin.module.css";

function Dashboard() {
    return (
        <div className={styles["dashboard-container"]}>
            <AdNav />
            <div className={styles["dashboard-content"]}>
                <h1>Admin Dashboard</h1>
                {/* Additional components or content can be added here */}
            </div>
        </div>
    );
}

export default Dashboard;