import React, { useRef, useState, useEffect } from "react";
import { supabase } from "./createBooking";
import AdNav from "./AdNav";
import NewAppointmentForm from "./NewAppointmentForm";
import styles from "./Admin.module.css";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { Chart } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function Appointment() {
  // const [bookings, setBookings] = React.useState(() => {
  //     return JSON.parse(localStorage.getItem("bookings")) || [];
  // });
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [editingRows, setEditingRows] = React.useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showNewForm, setShowNewForm] = React.useState(false);
  const [chartData, setChartData] = useState(null);
  const [serviceChartData, setServiceChartData] = useState(null);
  const barChartRef = useRef();
  const pieChartRef = useRef();
  const barImage = barChartRef.current?.toBase64Image();

  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    if (bookings.length > 0) {
      prepareChartData();
      prepareServiceChartData();
    }
  }, [bookings]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from("booking").select("*");
      if (error) throw error;
      setBookings(data || []);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  //Preparing of ChartData
  const prepareChartData = () => {
    const monthlyCounts = {};

    bookings.forEach((booking) => {
      if (booking.date) {
        try {
          const date = new Date(booking.date);
          if (!isNaN(date)) {
            const monthYear = `${date.getFullYear()}-${String(
              date.getMonth() + 1
            ).padStart(2, "0")}`;
            monthlyCounts[monthYear] = (monthlyCounts[monthYear] || 0) + 1;
          }
        } catch (e) {
          console.warn("Invalid date format:", booking.date);
        }
      }
    });

    const sortedMonths = Object.keys(monthlyCounts).sort();

    const data = {
      labels: sortedMonths.map((month) => {
        const [year, monthNum] = month.split("-");
        return new Date(year, monthNum - 1).toLocaleString("default", {
          month: "short",
          year: "numeric",
        });
      }),
      datasets: [
        {
          label: "Number of Appointments",
          data: sortedMonths.map((month) => monthlyCounts[month]),
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    };

    setChartData(data);
  };

  //Preparing ChartData (Pie)
  const prepareServiceChartData = () => {
    const serviceCounts = {};

    bookings.forEach((booking) => {
      if (booking.service) {
        serviceCounts[booking.service] =
          (serviceCounts[booking.service] || 0) + 1;
      }
    });

    const services = Object.keys(serviceCounts);
    const counts = services.map((service) => serviceCounts[service]);

    const backgroundColors = services.map((_, i) => {
      const hue = ((i * 360) / services.length) % 360;
      return `hsl(${hue}, 70%, 50%)`;
    });

    const data = {
      labels: services,
      datasets: [
        {
          data: counts,
          backgroundColor: backgroundColors,
          borderWidth: 1,
        },
      ],
    };

    setServiceChartData(data);
  };

  const handleAddBooking = async (newBooking) => {
    try {
      const { data, error } = await supabase
        .from("booking")
        .insert([newBooking])
        .select();
      if (error) throw error;
      setBookings((prev) => [data[0], ...prev]);
      setShowNewForm(false);
    } catch (error) {
      console.error("Error adding booking:", error);
    }
  };

  const handleRowSelect = (index) => {
    setSelectedRows((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allIndexes = bookings.map((_, i) => i);
      setSelectedRows(allIndexes);
    } else {
      setSelectedRows([]);
    }
  };

  const handleDeleteSelected = async () => {
    try {
      const selectedBookings = selectedRows.map((index) => bookings[index]);
      const idsToDelete = selectedBookings.map((booking) => booking.id);

      const { error } = await supabase
        .from("booking")
        .delete()
        .in("id", idsToDelete);

      if (error) throw error;

      const newBookings = bookings.filter(
        (_, index) => !selectedRows.includes(index)
      );
      setBookings(newBookings);
      setSelectedRows([]);
    } catch (error) {
      console.error("Error deleting bookings:", error);
    }
  };

  const handleEditSelected = () => {
    setEditingRows(selectedRows);
  };

  const handleEditSave = async (index, updatedData) => {
    try {
      const booking = bookings[index];
      const { error } = await supabase
        .from("booking")
        .update(updatedData)
        .eq("id", booking.id);

      if (error) throw error;

      const updatedBookings = bookings.map((booking, i) =>
        i === index ? { ...booking, ...updatedData } : booking
      );
      setBookings(updatedBookings);
      setEditingRows(editingRows.filter((i) => i !== index));
    } catch (error) {
      console.error("Error updating booking:", error);
    }
  };

  //export to CSV
  const exportToCSV = () => {
    const now = new Date();
    const exportDate = now.toLocaleString(); // e.g., "7/9/2025, 6:32:10 PM"
    const fileDate = now.toISOString().split("T")[0]; // e.g., "2025-07-09"

    const headers = [
      "ID",
      "Patient Name",
      "Email",
      "Contact",
      "Service",
      "Date",
      "Time",
      "Status",
      "HMO",
      "Company",
      "Valid ID No.",
      "Occupation",
      "HMO Provider",
    ];

    const rows = filteredBookings.map((booking) => [
      booking.id,
      booking.name,
      booking.email,
      booking.contact,
      booking.service,
      booking.date,
      booking.time,
      booking.status,
      booking.hmo,
      booking.company,
      booking.validId,
      booking.occupation,
      booking.hmoProvider,
    ]);

    let csvContent =
      `Exported On:,${exportDate}\n` +
      headers.join(",") +
      "\n" +
      rows
        .map((row) =>
          row
            .map((field) => `"${(field ?? "").toString().replace(/"/g, '""')}"`)
            .join(",")
        )
        .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Appointments_${fileDate}.csv`;
    link.style.visibility = "hidden";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  //export to PDF
  const exportToPDF = () => {
    const now = new Date();
    const exportDate = now.toLocaleString();
    const fileDate = now.toISOString().split("T")[0];

    const doc = new jsPDF("landscape");
    doc.setFontSize(16);
    doc.text("Appointments Report", 14, 20);
    doc.setFontSize(10);
    doc.text(`Exported On: ${exportDate}`, 14, 28);

    // summary
    const totalAppointments = filteredBookings.length;

    let mostCommonService = "N/A";
    if (totalAppointments > 0) {
      const serviceCounts = {};
      filteredBookings.forEach((b) => {
        if (b.service) {
          serviceCounts[b.service] = (serviceCounts[b.service] || 0) + 1;
        }
      });
      mostCommonService = Object.entries(serviceCounts).sort(
        (a, b) => b[1] - a[1]
      )[0][0];
    }

    const dates = filteredBookings
      .map((b) => new Date(b.date))
      .filter((d) => !isNaN(d));
    const dateRange = dates.length
      ? `${dates
          .reduce((a, b) => (a < b ? a : b))
          .toLocaleDateString()} - ${dates
          .reduce((a, b) => (a > b ? a : b))
          .toLocaleDateString()}`
      : "N/A";

    // summary
    doc.text(`Total Appointments: ${totalAppointments}`, 14, 34);
    doc.text(`Most Common Service: ${mostCommonService}`, 80, 34);
    doc.text(`Date Range: ${dateRange}`, 180, 34);

    // Table
    const headers = [
      [
        "ID",
        "Patient Name",
        "Email",
        "Contact",
        "Service",
        "Date",
        "Time",
        "Status",
        "HMO",
        "Company",
        "Valid ID No.",
        "Occupation",
        "HMO Provider",
      ],
    ];

    const rows = filteredBookings.map((booking) => [
      booking.id || "",
      booking.name || "",
      booking.email || "",
      booking.contact || "",
      booking.service || "",
      booking.date || "",
      booking.time || "",
      booking.status || "",
      booking.hmo || "",
      booking.company || "",
      booking.validId || "",
      booking.occupation || "",
      booking.hmoProvider || "",
    ]);

    autoTable(doc, {
      head: headers,
      body: rows,
      startY: 35,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [75, 192, 192] },
    });

    doc.addPage("landscape");

    // visualization
    if (barChartRef.current) {
      const chartInstance = barChartRef.current;
      const barImage = chartInstance.toBase64Image();
      if (barImage) {
        doc.text("No. of Appointments by Month", 14, 20);
        doc.addImage(barImage, "PNG", 14, 25, 200, 100);
      } else {
        doc.text("Bar chart not rendered yet", 14, 20);
      }
    }

    if (pieChartRef.current) {
      const pieInstance = pieChartRef.current;
      const pieImage = pieInstance.toBase64Image();
      if (pieImage) {
        doc.text("Service Distribution", 14, 135);
        doc.addImage(pieImage, "PNG", 14, 120, 100, 100);
      } else {
        doc.text("Pie chart not rendered yet", 14, 135);
      }
    }

    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.text(
        `Page ${i} of ${pageCount}`,
        doc.internal.pageSize.getWidth() - 30,
        doc.internal.pageSize.getHeight() - 10
      );
    }

    doc.save(`Appointments_${fileDate}.pdf`);
  };

  const filteredBookings = bookings.filter(
    (booking) =>
      booking.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.id?.toString().includes(searchQuery)
  );

  return (
    <div>
      <AdNav />
      <div className={styles["appointment-content"]}>
        <h1>Appointments</h1>
        <div className={styles["charts-container"]}>
          <div className={styles["chart-container"]}>
            <h2>No. of Appointments by Month</h2>
            {chartData ? (
              <Chart
                ref={barChartRef}
                type="bar"
                data={chartData}
                options={{
                  responsive: true,
                  aspectRatio: 2,
                  plugins: {
                    legend: { position: "top" },
                    title: { display: false },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      ticks: { stepSize: 1 },
                    },
                  },
                }}
              />
            ) : (
              <p>
                {loading ? "Loading data..." : "No appointment data available"}
              </p>
            )}
          </div>
          <div
            className={`${styles["chart-container"]} ${styles["pie-container"]}`}
          >
            <h2>Service Distribution</h2>
            {serviceChartData ? (
              <Chart
                ref={pieChartRef}
                type="pie"
                data={serviceChartData}
                options={{
                  responsive: true,
                  aspectRatio: 1,
                  plugins: {
                    legend: { position: "right" },
                  },
                }}
              />
            ) : (
              <p>{loading ? "Loading data..." : "No service data available"}</p>
            )}
          </div>
        </div>
        <div className={styles["appointment-navigation"]}>
          <div className={styles["appointment-search"]}>
            <input
              type="text"
              placeholder="Search by Patient Name/ID"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              // style={{ fontSize: "12px" }}
            />
            <button>Search</button>
            <button onClick={exportToCSV}>Export to CSV</button>
            <button onClick={exportToPDF}> Export to PDF</button>
          </div>
          <button onClick={() => setShowNewForm(true)}>
            + New Appointment
          </button>
        </div>
        <div className={styles["table-responsive"]}>
          <table className={styles["appointment-table"]}>
            <thead>
              <tr>
                <th>
                  <input type="checkbox" onChange={handleSelectAll} />
                </th>
                <th>ID</th>
                <th>Patient Name</th>
                <th>Email</th>
                <th>Contact</th>
                <th>Service</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                <th>HMO</th>
                <th>Company</th>
                <th>Valid ID No.</th>
                <th>Occupation</th>
                <th>HMO Provider</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(index)}
                      onChange={() => handleRowSelect(index)}
                    />
                  </td>
                  {editingRows.includes(index) ? (
                    <>
                      <td>{booking.id || "—"}</td>
                      <td>
                        <input
                          defaultValue={booking.name}
                          onChange={(e) => (booking.name = e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          defaultValue={booking.email}
                          onChange={(e) => (booking.email = e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          defaultValue={booking.contact}
                          onChange={(e) => (booking.contact = e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          defaultValue={booking.service}
                          onChange={(e) => (booking.service = e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          defaultValue={booking.date}
                          onChange={(e) => (booking.date = e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          defaultValue={booking.time}
                          onChange={(e) => (booking.time = e.target.value)}
                        />
                      </td>
                      {/* Status as dropdown */}
                      <td>
                        <select
                          defaultValue={booking.status}
                          onChange={(e) => (booking.status = e.target.value)}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                      {/* HMO as dropdown */}
                      <td>
                        <select
                          defaultValue={booking.hmo}
                          onChange={(e) => (booking.hmo = e.target.value)}
                        >
                          <option value="">None</option>
                          <option value="Maxicare">Maxicare</option>
                          <option value="PhilCare">PhilCare</option>
                          <option value="Cocolife">Cocolife</option>
                          <option value="EtiQa">EtiQa</option>
                          {/* Add more HMO options as needed */}
                        </select>
                      </td>
                      <td>
                        <input
                          defaultValue={booking.company}
                          onChange={(e) => (booking.company = e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          defaultValue={booking.validId}
                          onChange={(e) => (booking.validId = e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          defaultValue={booking.occupation}
                          onChange={(e) =>
                            (booking.occupation = e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <input
                          defaultValue={booking.hmoProvider}
                          onChange={(e) =>
                            (booking.hmoProvider = e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <button onClick={() => handleEditSave(index, booking)}>
                          Save
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{booking.id || "—"}</td>
                      <td>{booking.name}</td>
                      <td>{booking.email}</td>
                      <td>{booking.contact}</td>
                      <td>{booking.service}</td>
                      <td>{booking.date}</td>
                      <td>{booking.time}</td>
                      <td>{booking.status}</td>
                      <td>{booking.hmo}</td>
                      <td>{booking.company}</td>
                      <td>{booking.validId || "—"}</td>
                      <td>{booking.occupation || "—"}</td>
                      <td>{booking.hmoProvider || "—"}</td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {showNewForm && (
          <div className={styles["modal"]}>
            <NewAppointmentForm
              onSubmit={handleAddBooking}
              onClose={() => setShowNewForm(false)}
            />
          </div>
        )}
        <div className={styles["appointment-actions"]}>
          <button
            onClick={handleDeleteSelected}
            disabled={selectedRows.length === 0}
          >
            - Delete Selected
          </button>
          <button
            onClick={handleEditSelected}
            disabled={selectedRows.length === 0}
          >
            + Edit Selected
          </button>
        </div>
      </div>
    </div>
  );
}

export default Appointment;
