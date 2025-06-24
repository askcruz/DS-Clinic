import React, {useState, useEffect}from "react";
import { supabase } from "./createBooking";
import AdNav from "./AdNav";
import NewAppointmentForm from "./NewAppointmentForm";
import styles from "./Admin.module.css";

function Appointment() {
    // const [bookings, setBookings] = React.useState(() => {
    //     return JSON.parse(localStorage.getItem("bookings")) || [];
    // });
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedRows, setSelectedRows] = React.useState([]);
    const [editingRows, setEditingRows] = React.useState([]);
    const [showNewForm, setShowNewForm] = React.useState(false);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('booking')
                .select('*');
            if (error) throw error;
            setBookings(data || []);
        } catch (error) {
            console.error('Error fetching bookings:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddBooking = async (newBooking) => {
    try {
        const { data, error } = await supabase
            .from('booking')
            .insert([newBooking])
            .select();
        if (error) throw error;
        setBookings(prev => [data[0], ...prev]);
        setShowNewForm(false);
    } catch (error) {
        console.error('Error adding booking:', error);
    }
};

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

    const handleDeleteSelected = async () => {
    try {
        const selectedBookings = selectedRows.map(index => bookings[index]);
        const idsToDelete = selectedBookings.map(booking => booking.id);
        
        const { error } = await supabase
            .from('booking')
            .delete()
            .in('id', idsToDelete);
            
        if (error) throw error;
        
        const newBookings = bookings.filter((_, index) => !selectedRows.includes(index));
        setBookings(newBookings);
        setSelectedRows([]);
    } catch (error) {
        console.error('Error deleting bookings:', error);
    }
};

    const handleEditSelected = () => {
        setEditingRows(selectedRows);
    };

    const handleEditSave = async (index, updatedData) => {
    try {
        const booking = bookings[index];
        const { error } = await supabase
            .from('booking')
            .update(updatedData)
            .eq('id', booking.id);
            
        if (error) throw error;
        
        const updatedBookings = bookings.map((booking, i) =>
            i === index ? { ...booking, ...updatedData } : booking
        );
        setBookings(updatedBookings);
        setEditingRows(editingRows.filter((i) => i !== index));
    } catch (error) {
        console.error('Error updating booking:', error);
    }
};

    return (
        <div>
            <AdNav />
            <div className={styles["appointment-content"]}>
                <h1>Appointments</h1>
                <div className={styles["appointment-navigation"]}>
                    <div className={styles["appointment-search"]}>
                        <input type="text" placeholder="Search by Patient Name or ID" />
                        <button>Search</button>
                    </div>
                    <button onClick={() => setShowNewForm(true)}>+ New Appointment</button>
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