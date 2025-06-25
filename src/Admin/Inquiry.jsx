import React, { useState, useEffect } from "react";
import { supabase } from "./createBooking";
import AdNav from "./AdNav";
import styles from "./Admin.module.css";

function Inquiry() {
  const [inquiries, setInquiries] = useState([]);
  const [filteredInquiries, setFilteredInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [viewArchived, setViewArchived] = useState(false);
  const [archivedInquiries, setArchivedInquiries] = useState([]);

  useEffect(() => {
    fetchInquiries();
    fetchArchivedInquiries();
  }, []);

  useEffect(() => {
    filterInquiries();
  }, [searchTerm, statusFilter, inquiries, archivedInquiries, viewArchived]);

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("inquiry_entries")
        .select("*")
        .eq("is_archived", false) // Only show non-archived
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Supabase error:", error);
        throw error;
      }

      // Ensure all inquiries have a status
      const processedData = (data || []).map((inquiry) => ({
        ...inquiry,
        status: inquiry.status || "unread",
      }));

      console.log("Fetched inquiries:", processedData);
      setInquiries(processedData);
    } catch (error) {
      console.error("Error fetching inquiries:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchArchivedInquiries = async () => {
    try {
      const { data, error } = await supabase
        .from("inquiry_entries")
        .select("*")
        .eq("is_archived", true) // Only show archived
        .order("created_at", { ascending: false });

      if (error) throw error;
      setArchivedInquiries(data || []);
    } catch (error) {
      console.error("Error fetching archived inquiries:", error);
    }
  };

  const filterInquiries = () => {
    const currentInquiries = viewArchived ? archivedInquiries : inquiries;
    let filtered = currentInquiries;

    // Filter by search term
    if (searchTerm.trim() !== "") {
      filtered = filtered.filter(
        (inquiry) =>
          inquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          inquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          inquiry.message.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status (only for non-archived view)
    if (statusFilter !== "all" && !viewArchived) {
      filtered = filtered.filter((inquiry) => inquiry.status === statusFilter);
    }

    setFilteredInquiries(filtered);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusFilter = (e) => {
    setStatusFilter(e.target.value);
  };

  const updateInquiryStatus = async (id, newStatus) => {
    try {
      console.log(`Updating inquiry ${id} status to ${newStatus}`);
      
      const { data, error } = await supabase
        .from("inquiry_entries")
        .update({ status: newStatus })
        .eq("id", id)
        .select(); // Add select to get the updated data back

      if (error) {
        console.error("Supabase error:", error);
        throw error;
      }

      console.log("Updated data from Supabase:", data);

      // Update local state
      setInquiries((prev) =>
        prev.map((inquiry) =>
          inquiry.id === id ? { ...inquiry, status: newStatus } : inquiry
        )
      );

      // If this inquiry is currently selected in the modal, update it too
      if (selectedInquiry && selectedInquiry.id === id) {
        setSelectedInquiry((prev) => ({ ...prev, status: newStatus }));
      }

      console.log(`Inquiry ${id} status updated to ${newStatus}`);
      return true;
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status. Please try again.");
      return false;
    }
  };

  const archiveInquiry = async (id) => {
    try {
      const { error } = await supabase
        .from("inquiry_entries")
        .update({ is_archived: true })
        .eq("id", id);

      if (error) throw error;

      // Close modal if the archived inquiry is currently being viewed
      if (selectedInquiry && selectedInquiry.id === id) {
        closeModal();
      }

      // Remove from local state and refresh archived list
      setInquiries((prev) => prev.filter((inquiry) => inquiry.id !== id));
      await fetchArchivedInquiries(); // Refresh archived list

      console.log("Inquiry archived successfully");
    } catch (error) {
      console.error("Error archiving inquiry:", error);
      alert("Failed to archive inquiry. Please try again.");
    }
  };

  const restoreInquiry = async (id) => {
    try {
      const { error } = await supabase
        .from("inquiry_entries")
        .update({ is_archived: false })
        .eq("id", id);

      if (error) throw error;

      // Close modal if the restored inquiry is currently being viewed
      if (selectedInquiry && selectedInquiry.id === id) {
        closeModal();
      }

      // Remove from archived and refresh main list
      setArchivedInquiries((prev) =>
        prev.filter((inquiry) => inquiry.id !== id)
      );
      await fetchInquiries();

      console.log("Inquiry restored successfully");
    } catch (error) {
      console.error("Error restoring inquiry:", error);
      alert("Failed to restore inquiry. Please try again.");
    }
  };

  const permanentlyDelete = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to permanently delete this inquiry? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      const { error } = await supabase
        .from("inquiry_entries")
        .delete()
        .eq("id", id);

      if (error) throw error;

      // Close modal if the deleted inquiry is currently being viewed
      if (selectedInquiry && selectedInquiry.id === id) {
        closeModal();
      }

      setArchivedInquiries((prev) =>
        prev.filter((inquiry) => inquiry.id !== id)
      );

      console.log("Inquiry deleted successfully");
    } catch (error) {
      console.error("Error deleting inquiry:", error);
      alert("Failed to delete inquiry. Please try again.");
    }
  };



  const viewInquiry = async (inquiry) => {
    // Mark as read if it's unread and not archived
    if (inquiry.status === "unread" && !inquiry.is_archived) {
      const success = await updateInquiryStatus(inquiry.id, "read");
      if (!success) {
        console.error("Failed to update status, but showing modal anyway");
      }
    }

    // Set the selected inquiry and show modal
    setSelectedInquiry(inquiry);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedInquiry(null);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  const truncateMessage = (message, maxLength = 50) => {
    return message.length > maxLength
      ? message.substring(0, maxLength) + "..."
      : message;
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      unread: styles["status-unread"],
      read: styles["status-read"],
      resolved: styles["status-resolved"],
    };

    return (
      <span
        className={`${styles["status-badge"]} ${statusClasses[status] || ""}`}
      >
        {status?.charAt(0).toUpperCase() + status?.slice(1) || "Unread"}
      </span>
    );
  };

  const unreadCount = inquiries.filter(
    (inquiry) => inquiry.status === "unread"
  ).length;

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
        <h1>
          {viewArchived ? (
            "Archived Inquiries"
          ) : (
            <>
              <span style={{ marginRight: "0.5rem" }}>Inquiry Inbox </span>
              {unreadCount > 0 && (
                <span className={styles["unread-count"]}>
                  ({unreadCount} unread)
                </span>
              )}
            </>
          )}
        </h1>

        <div className={styles["appointment-navigation"]}>
          <div className={styles["appointment-search"]}>
            <input
              type="text"
              placeholder="Search by Name, Email, or Message"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div className={styles["inquiry-filters"]}>
            <button
              className={`${styles["view-toggle"]} ${
                !viewArchived ? styles["active"] : ""
              }`}
              onClick={() => setViewArchived(false)}
            >
              Inbox ({inquiries.length})
            </button>
            <button
              className={`${styles["view-toggle"]} ${
                viewArchived ? styles["active"] : ""
              }`}
              onClick={() => setViewArchived(true)}
            >
              Archived ({archivedInquiries.length})
            </button>

            {!viewArchived && (
              <select value={statusFilter} onChange={handleStatusFilter}>
                <option value="all">All Status</option>
                <option value="unread">Unread</option>
                <option value="read">Read</option>
                <option value="resolved">Resolved</option>
              </select>
            )}
          </div>
        </div>

        <div className={styles["inquiry-stats"]}>
          {viewArchived ? (
            <p>
              Archived: {archivedInquiries.length} | Showing:{" "}
              {filteredInquiries.length}
            </p>
          ) : (
            <p>
              Total: {inquiries.length} | Showing: {filteredInquiries.length} |
              Unread: {unreadCount}
            </p>
          )}
        </div>

        <table className={styles["appointment-table"]}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Message Preview</th>
              <th>Status</th>
              <th>Date Received</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredInquiries.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  style={{ textAlign: "center", padding: "20px" }}
                >
                  {viewArchived
                    ? searchTerm
                      ? "No archived inquiries match your search."
                      : "No archived inquiries."
                    : searchTerm || statusFilter !== "all"
                    ? "No inquiries match your filters."
                    : "No inquiries found."}
                </td>
              </tr>
            ) : (
              filteredInquiries.map((inquiry) => (
                <tr
                  key={inquiry.id}
                  className={
                    inquiry.status === "unread" && !viewArchived
                      ? styles["unread-row"]
                      : ""
                  }
                >
                  <td>{inquiry.id}</td>
                  <td>{inquiry.name}</td>
                  <td>{inquiry.email}</td>
                  <td className={styles["message-cell"]}>
                    {truncateMessage(inquiry.message)}
                  </td>
                  <td>{getStatusBadge(inquiry.status)}</td>
                  <td>{formatDate(inquiry.created_at)}</td>
                  <td className={styles["actions-cell"]}>
                    <button
                      className={styles["action-btn"]}
                      onClick={() => viewInquiry(inquiry)}
                      title="View full message"
                    >
                      View
                    </button>

                    {viewArchived ? (
                      <>
                        <button
                          className={styles["action-btn"]}
                          onClick={() => restoreInquiry(inquiry.id)}
                          title="Restore to inbox"
                        >
                          Restore
                        </button>
                        <button
                          className={styles["action-btn-danger"]}
                          onClick={() => permanentlyDelete(inquiry.id)}
                          title="Delete permanently"
                        >
                          Delete
                        </button>
                      </>
                    ) : (
                      <>
                        <select
                          value={inquiry.status || "unread"}
                          onChange={(e) =>
                            updateInquiryStatus(inquiry.id, e.target.value)
                          }
                          className={styles["status-select"]}
                        >
                          <option value="unread">Unread</option>
                          <option value="read">Read</option>
                          <option value="resolved">Resolved</option>
                        </select>

                        <button
                          className={styles["action-btn-danger"]}
                          onClick={() => archiveInquiry(inquiry.id)}
                          title="Archive this inquiry"
                        >
                          Archive
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Modal for viewing full inquiry */}
        {showModal && selectedInquiry && (
          <div className={styles["modal-overlay"]} onClick={closeModal}>
            <div
              className={styles["modal-content"]}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles["modal-header"]}>
                <h2>Inquiry Details</h2>
                <button className={styles["close-btn"]} onClick={closeModal}>
                  ×
                </button>
              </div>
              <div className={styles["modal-body"]}>
                <div className={styles["inquiry-detail"]}>
                  <strong>ID:</strong> {selectedInquiry.id}
                </div>
                <div className={styles["inquiry-detail"]}>
                  <strong>Name:</strong> {selectedInquiry.name}
                </div>
                <div className={styles["inquiry-detail"]}>
                  <strong>Email:</strong> {selectedInquiry.email}
                </div>
                <div className={styles["inquiry-detail"]}>
                  <strong>Status:</strong>{" "}
                  {getStatusBadge(selectedInquiry.status)}
                </div>
                <div className={styles["inquiry-detail"]}>
                  <strong>Date:</strong>{" "}
                  {formatDate(selectedInquiry.created_at)}
                </div>
                <div className={styles["inquiry-detail"]}>
                  <strong>Message:</strong>
                  <div className={styles["full-message"]}>
                    {selectedInquiry.message}
                  </div>
                </div>
              </div>
              <div className={styles["modal-footer"]}>
                {!viewArchived && !selectedInquiry.is_archived && (
                  <>
                    <button
                      onClick={() =>
                        updateInquiryStatus(selectedInquiry.id, "resolved")
                      }
                      className={styles["action-btn"]}
                    >
                      Mark as Resolved
                    </button>
                    <button
                      onClick={() => archiveInquiry(selectedInquiry.id)}
                      className={styles["action-btn-danger"]}
                    >
                      Archive
                    </button>
                  </>
                )}
                {viewArchived && (
                  <>
                    <button
                      onClick={() => restoreInquiry(selectedInquiry.id)}
                      className={styles["action-btn"]}
                    >
                      Restore to Inbox
                    </button>
                    <button
                      onClick={() => permanentlyDelete(selectedInquiry.id)}
                      className={styles["action-btn-danger"]}
                    >
                      Delete Permanently
                    </button>
                  </>
                )}
                <button onClick={closeModal} className={styles["action-btn"]}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Inquiry;