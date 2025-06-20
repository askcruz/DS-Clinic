import React, { useState, useEffect } from "react";
import { supabase } from "./createBooking";
import AdNav from "./AdNav";
import styles from "./Admin.module.css";

function Inquiry() {
    const [inquiries, setInquiries] = useState([]);
    const [filteredInquiries, setFilteredInquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchInquiries();
    }, []);

    useEffect(() => {
        // Filter inquiries based on search term
        if (searchTerm.trim() === "") {
            setFilteredInquiries(inquiries);
        } else {
            const filtered = inquiries.filter(inquiry =>
                inquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                inquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                inquiry.message.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredInquiries(filtered);
        }
    }, [searchTerm, inquiries]);

    const fetchInquiries = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('inquiry_entries')
                .select('*')
                .order('created_at', { ascending: false });
            
            if (error) {
                console.error('Supabase error:', error);
                throw error;
            }
            
            console.log('Fetched inquiries:', data);
            setInquiries(data || []);
        } catch (error) {
            console.error('Error fetching inquiries:', error);
            // You might want to set an error state here to show to the user
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    };

    if (loading) {
        return (
            <div>
                <AdNav />
                <div className={styles["appointment-content"]}>
                    <h1>Loading inquiries...</h1>
                </div>
            </div>
        );
    }

    return (
        <div>
            <AdNav />
            <div className={styles["appointment-content"]}>
                <h1>Inquiry Inbox</h1>
                <div className={styles["appointment-navigation"]}>
                    <div className={styles["appointment-search"]}>
                        <input 
                            type="text" 
                            placeholder="Search by Name, Email, or Message" 
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </div>
                </div>
                <div className={styles["inquiry-stats"]}>
                    <p>Total Inquiries: {inquiries.length} | Showing: {filteredInquiries.length}</p>
                </div>
                <table className={styles["appointment-table"]}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Message</th>
                            <th>Date Received</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredInquiries.length === 0 ? (
                            <tr>
                                <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>
                                    {searchTerm ? 'No inquiries match your search.' : 'No inquiries found.'}
                                </td>
                            </tr>
                        ) : (
                            filteredInquiries.map((inquiry) => (
                                <tr key={inquiry.id}>
                                    <td>{inquiry.id}</td>
                                    <td>{inquiry.name}</td>
                                    <td>{inquiry.email}</td>
                                    <td className={styles["message-cell"]}>
                                        <div className={styles["message-preview"]}>
                                            {inquiry.message}
                                        </div>
                                    </td>
                                    <td>{formatDate(inquiry.created_at)}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Inquiry;