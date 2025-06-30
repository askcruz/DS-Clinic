import React from "react";
import AdNav from "./AdNav";
import styles from "./Admin.module.css";
import { supabase } from "./createBooking"; // Update path if needed

function Dashboard() {
  const [recentPatients, setRecentPatients] = React.useState([]);
  const [confirmedCount, setConfirmedCount] = React.useState(0);
  const [cancelledCount, setCancelledCount] = React.useState(0);
  const [newPatientsCount, setNewPatientsCount] = React.useState(0);
  const [todayAppointments, setTodayAppointments] = React.useState([]);
  const [tomorrowAppointments, setTomorrowAppointments] = React.useState([]);
  const [missedAppointments, setMissedAppointments] = React.useState([]);

  React.useEffect(() => {
    const fetchStatsAndRecent = async () => {
      try {
        const { data: bookings, error } = await supabase
          .from("booking")
          .select("*");

        if (error) throw error;

        const confirmed = bookings.filter(
          (b) => b.status === "Confirmed"
        ).length;
        const cancelled = bookings.filter(
          (b) => b.status === "Cancelled"
        ).length;
        const pendingPatients = bookings.filter(
          (b) => b.status === "Pending"
        ).length;

        setConfirmedCount(confirmed);
        setCancelledCount(cancelled);
        setNewPatientsCount(pendingPatients);
      } catch (err) {
        console.error("Error fetching dashboard stats:", err);
      }
    };

    // Fetch the 3 most recently updated or added patients
    const fetchRecentPatients = async () => {
      try {
        const { data, error } = await supabase
          .from("booking")
          .select("*")
          .order("updated_at", { ascending: false })
          .limit(3);

        if (error) throw error;

        setRecentPatients(data);
      } catch (err) {
        console.error("Error fetching recent patients:", err);
      }
    };

    fetchStatsAndRecent();
    fetchRecentPatients();

    // upcoming appointments
    const fetchUpcomingAppointments = async () => {
      const today = new Date();
      const tomorrow = new Date();
      tomorrow.setDate(today.getDate() + 1);

      const formatDate = (date) => date.toISOString().split("T")[0]; // yyyy-mm-dd

      try {
        const { data: bookings, error } = await supabase
          .from("booking")
          .select("*")
          .in("date", [formatDate(today), formatDate(tomorrow)])
          .order("date", { ascending: true })
          .order("time", { ascending: true });

        if (error) throw error;

        const todayList = bookings.filter((b) => b.date === formatDate(today));
        const tomorrowList = bookings.filter(
          (b) => b.date === formatDate(tomorrow)
        );

        setTodayAppointments(todayList);
        setTomorrowAppointments(tomorrowList);
      } catch (err) {
        console.error("Error fetching upcoming appointments:", err);
      }
    };

    fetchUpcomingAppointments();

    const fetchMissedAppointments = async () => {
      try {
        const { data: bookings, error } = await supabase
          .from("booking")
          .select("");

        if (error) throw error;

        const now = new Date();

        const missed = bookings.filter((b) => {
          if (b.status !== "Pending") return false;
          const apptDateTime = new Date(`${b.date}T${b.time}`);
          return apptDateTime < now;
        });

        setMissedAppointments(missed);
      } catch (err) {
        console.error("Error", err);
      }
    };

    fetchMissedAppointments();
  }, []);

  // lastupdated/edited counter
  function formatTimeAgo(timestamp) {
    const now = new Date();
    const updated = new Date(timestamp);
    const diff = Math.floor((now - updated) / 1000);

    if (diff < 60) return `${diff} second${diff !== 1 ? "s" : ""} ago`;
    const mins = Math.floor(diff / 60);
    if (mins < 60) return `${mins} minute${mins !== 1 ? "s" : ""} ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs} hour${hrs !== 1 ? "s" : ""} ago`;
    const days = Math.floor(hrs / 24);
    return `${days} day${days !== 1 ? "s" : ""} ago`;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div className={styles["dashboard-container"]}>
      <AdNav />
      <div className={styles["dashboard-content"]}>
        <h1>Admin Dashboard</h1>
      </div>
      <div className={styles["overview-dashboard"]}>
        <div className={styles["overview-item"]}>
          <span className={styles["overview-number"]}>{confirmedCount}</span>
          <span className={styles["overview-label"]}>Total Appointments</span>
        </div>
        <div className={styles["overview-item"]}>
          <span className={styles["overview-number"]}>{newPatientsCount}</span>
          <span className={styles["overview-label"]}>Pending Patients</span>
        </div>
        <div className={styles["overview-item"]}>
          <span
            className={`${styles["overview-number"]} ${styles["cancelled"]}`}
          >
            {cancelledCount}
          </span>
          <span
            className={`${styles["overview-label"]} ${styles["cancelled"]}`}
          >
            Cancelled
          </span>
        </div>
      </div>

      <div className={styles["upcoming-section"]}>
        <h2>Upcoming Appointments</h2>

        <div className={styles["upcoming-list"]}>
          <h3>Today</h3>
          {todayAppointments.length === 0 ? (
            <p>No appointments for today.</p>
          ) : (
            <ul>
              {todayAppointments.map((appt, i) => (
                <li key={i}>
                  <strong>{appt.name}</strong> – {appt.time} – {appt.service}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className={styles["upcoming-list"]}>
          <h3>Tomorrow</h3>
          {tomorrowAppointments.length === 0 ? (
            <p>No appointments for tomorrow.</p>
          ) : (
            <ul>
              {tomorrowAppointments.map((appt, i) => (
                <li key={i}>
                  <strong>{appt.name}</strong> – {appt.time} – {appt.service}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className={styles["missed-section"]}>
        <h2>Overdue / Missed Appointments </h2>
        <h3>
          Appointments that are still pending that has not been check past the
          date will appear here
        </h3>
        {missedAppointments.length === 0 ? (
          <p>No missed appointments.</p>
        ) : (
          <ul>
            {missedAppointments.map((appt, i) => (
              <li key={i}>
                <strong>{appt.name}</strong> – {appt.date} – {appt.time} –{" "}
                {appt.service}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={styles["appointment-content"]}>
        <h2 style={{ marginTop: "3rem" }}>
          Three of the Recently Edited or Added Patients
        </h2>
        <table className={styles["appointment-table"]}>
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Contact</th>
              <th>Service</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Last Edited</th>
            </tr>
          </thead>
          <tbody>
            {recentPatients.length === 0 ? (
              <tr>
                <td colSpan={8} style={{ textAlign: "center" }}>
                  No recent patients.
                </td>
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
                  <td>{formatTimeAgo(patient.updated_at)}</td>
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
