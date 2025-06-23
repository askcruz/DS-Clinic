import React from "react";
import AdNav from "./AdNav";
import styles from "./Admin.module.css";

function Dashboard() {

    const [recentPatients, setRecentPatients] = React.useState([]);

    React.useEffect(() => {
        const data = JSON.parse(localStorage.getItem("recentPatients") || "[]");
        setRecentPatients(data);
    }, []);

    return (
        <div className={styles["dashboard-container"]}>
            <AdNav />
            <div className={styles["dashboard-content"]}>
                <h1>Admin Dashboard</h1>
            </div>
            <div className={styles["overview-dashboard"]}>
                <div className={styles["overview-item"]}>
                    <span className={styles["overview-number"]}>10</span>
                    <span className={styles["overview-label"]}>Total Appointments</span>
                </div>
                <div className={styles["overview-item"]}>
                    <span className={styles["overview-number"]}>5</span>
                    <span className={styles["overview-label"]}>New Patient</span>
                </div>
                <div className={styles["overview-item"]}>
                    <span className={styles["overview-number"]}>2</span>
                    <span className={styles["overview-label"]}>Cancelled</span>
                </div>
            </div>
            <div className={styles["appointment-content"]}>
                <h2 style={{marginTop: "3rem"}}>Recently Edited or Added Patients</h2>
                <table className={styles["appointment-table"]}>
                    <thead>
                        <tr>
                            <th>Patient Name</th>
                            <th>Contact</th>
                            <th>Service</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentPatients.length === 0 ? (
                            <tr>
                                <td colSpan={8} style={{textAlign: "center"}}>No recent patients.</td>
                            </tr>
                        ) : (
                            recentPatients.map((patient, idx) => (
                                <tr key={idx}>
                                    <td>{patient.name}</td>
                                    <td>{patient.contact}</td>
                                    <td>{patient.service}</td>
                                    <td>{patient.date}</td>
                                    <td>{patient.time}</td>
                                    <td>{patient.status}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Dashboard;