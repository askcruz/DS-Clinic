import React from "react";
import AdNav from "./AdNav";
import NewAppointmentForm from "./NewAppointmentForm";
import './Admin.css';

function Appointment() {

    const [bookings, setBookings] = React.useState(() => {
    return JSON.parse(localStorage.getItem("bookings")) || [];
    });

    const [selectedRows, setSelectedRows] = React.useState([]);
    const [editingRows, setEditingRows] = React.useState([]);
    const [showNewForm, setShowNewForm] = React.useState(false);

    React.useEffect(() => {
        const data = JSON.parse(localStorage.getItem("bookings") || "[]");
        setBookings(data);
    }, []);

    const handleAddBooking = (newBooking) => {
        const updatedBookings = [...bookings, newBooking];
        setBookings(updatedBookings);
        localStorage.setItem("bookings", JSON.stringify(updatedBookings));
        setShowNewForm(false);
    }

    const handleRowSelect = (index) => {
        setSelectedRows(prev =>
            prev.includes(index)
                ? prev.filter(i => i !== index)
                : [...prev, index]
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

    const handleDeleteSelected = () => {
        const newBookings = bookings.filter((_, index) => !selectedRows.includes(index));
        setBookings(newBookings);
        localStorage.setItem("bookings", JSON.stringify(newBookings));
        setSelectedRows([]);
    };

    const handleEditSelected = () => {
        setEditingRows(selectedRows);
    };

    const handleEditSave = (index, updatedData) => {
        const updatedBookings = bookings.map((booking, i) =>
            i === index ? { ...booking, ...updatedData } : booking
        );
        setBookings(updatedBookings);
        localStorage.setItem("bookings", JSON.stringify(updatedBookings));

        // remove this row from editing
        setEditingRows(editingRows.filter((i) => i !== index));
    };

    return (
        <div className="appointment-container">
            <AdNav />
            <div className="appointment-content">
                <h1>Appointments</h1>
                <div className="appointment-navigation">
                    <div className="appointment-search">
                        <input type="text" placeholder="Search by Patient Name or ID" />
                        <button>Search</button>
                    </div>
                    <button onClick={() => setShowNewForm(true)}>+ New Appointment</button>
                </div>
                <table className="appointment-table">
                    <thead>
                        <tr>
                            <th>   
                                <input type="checkbox" onChange={handleSelectAll} />
                            </th>
                            <th>ID</th>
                            <th>Patient Name</th>
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
                        {bookings.map((booking, index) => (
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
                                        <td><input defaultValue={booking.name} onChange={(e) => booking.name = e.target.value} /></td>
                                        <td><input defaultValue={booking.contact} onChange={(e) => booking.contact = e.target.value} /></td>
                                        <td><input defaultValue={booking.service} onChange={(e) => booking.service = e.target.value} /></td>
                                        <td><input defaultValue={booking.date} onChange={(e) => booking.date = e.target.value} /></td>
                                        <td><input defaultValue={booking.time} onChange={(e) => booking.time = e.target.value} /></td>
                                        <td><input defaultValue={booking.status} onChange={(e) => booking.status = e.target.value} /></td>
                                        <td><input defaultValue={booking.hmo} onChange={(e) => booking.hmo = e.target.value} /></td>
                                        <td><input defaultValue={booking.company} onChange={(e) => booking.company = e.target.value} /></td>
                                        <td><input defaultValue={booking.validId} onChange={(e) => booking.validId = e.target.value} /></td>
                                        <td><input defaultValue={booking.occupation} onChange={(e) => booking.occupation = e.target.value} /></td>
                                        <td><input defaultValue={booking.hmoProvider} onChange={(e) => booking.hmoProvider = e.target.value} /></td>
                                        <td>
                                            <button onClick={() => handleEditSave(index, booking)}>Save</button>
                                        </td>
                                    </>
                                ) : (
                                    <>
                                        <td>{booking.id || "—"}</td>
                                        <td>{booking.name}</td>
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
                {showNewForm && (
                    <div className="modal">
                        {/* You can create a NewAppointmentForm component or reuse Booking */}
                        <NewAppointmentForm
                            onSubmit={handleAddBooking}
                            onClose={() => setShowNewForm(false)}
                        />
                    </div>
                )}
                <div className="appointment-actions">
                    <button onClick={handleDeleteSelected} disabled={selectedRows.length === 0}>
                        - Delete Selected
                    </button>
                    <button onClick={handleEditSelected} disabled={selectedRows.length === 0}>
                        + Edit Selected
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Appointment;