import React, { useState, useEffect } from "react";
import Slidebar from "../components/Slidebar";
import { db } from "../firebase";
import { collection, getDocs, doc, updateDoc, query, orderBy, addDoc } from "firebase/firestore";

export default function AdminDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [filter, setFilter] = useState("all");
  const [stats, setStats] = useState({ total: 0, pending: 0, inProgress: 0, resolved: 0 });
  const [offlineMode, setOfflineMode] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [resolutionNote, setResolutionNote] = useState("");
  const [showResolvedTab, setShowResolvedTab] = useState(false);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const q = query(collection(db, "complaints"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      const complaintsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setComplaints(complaintsData);

      // Calculate stats
      setStats({
        total: complaintsData.length,
        pending: complaintsData.filter(c => c.status === "Pending").length,
        inProgress: complaintsData.filter(c => c.status === "In Progress").length,
        resolved: complaintsData.filter(c => c.status === "Resolved").length
      });
      setOfflineMode(false);
    } catch (error) {
      console.warn("Could not fetch complaints (possibly offline):", error.message);
      setOfflineMode(true);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const complaintRef = doc(db, "complaints", id);
      await updateDoc(complaintRef, { 
        status: newStatus,
        updatedAt: new Date().toISOString()
      });
      fetchComplaints();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleResolveComplaint = async (complaintId) => {
    if (!resolutionNote.trim()) {
      alert("Please add a resolution note before marking as resolved.");
      return;
    }

    try {
      const complaintRef = doc(db, "complaints", complaintId);
      await updateDoc(complaintRef, { 
        status: "Resolved",
        resolutionNote: resolutionNote,
        resolvedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      
      // Add to resolved tickets collection
      await addDoc(collection(db, "resolvedTickets"), {
        complaintId: complaintId,
        resolutionNote: resolutionNote,
        resolvedAt: new Date().toISOString()
      });

      setResolutionNote("");
      setShowModal(false);
      setSelectedComplaint(null);
      fetchComplaints();
      alert("✅ Complaint marked as resolved!");
    } catch (error) {
      console.error("Error resolving complaint:", error);
      alert("Failed to resolve complaint. Please try again.");
    }
  };

  const openResolutionModal = (complaint) => {
    setSelectedComplaint(complaint);
    setResolutionNote(complaint.resolutionNote || "");
    setShowModal(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "In Progress": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "Resolved": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High": return "text-red-600 dark:text-red-400 font-semibold";
      case "Medium": return "text-yellow-600 dark:text-yellow-400 font-semibold";
      case "Low": return "text-green-600 dark:text-green-400 font-semibold";
      default: return "text-gray-600 dark:text-gray-400";
    }
  };

  const filteredComplaints = filter === "all"
    ? complaints
    : complaints.filter(c => c.status === filter);

  const resolvedComplaints = complaints.filter(c => c.status === "Resolved");

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-20 pb-8 px-6 transition-colors duration-300">
      <Slidebar />

      <div className="ml-20 max-w-7xl">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Admin Dashboard</h1>

        {offlineMode && (
          <div className="mb-4 p-4 rounded-lg bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
            ⚠️ You're currently offline. Some data may not be up to date.
          </div>
        )}

        {/* Tab Switcher */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setShowResolvedTab(false)}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              !showResolvedTab 
                ? "bg-blue-600 text-white" 
                : "bg-white dark:bg-gray-800 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            Active Complaints
          </button>
          <button
            onClick={() => setShowResolvedTab(true)}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              showResolvedTab 
                ? "bg-green-600 text-white" 
                : "bg-white dark:bg-gray-800 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            Resolved Tickets ({resolvedComplaints.length})
          </button>
        </div>

        {!showResolvedTab ? (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow transition-colors duration-300">
                <p className="text-gray-500 dark:text-gray-400 text-sm">Total Complaints</p>
                <p className="text-3xl font-bold text-gray-800 dark:text-white">{stats.total}</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow transition-colors duration-300">
                <p className="text-gray-500 dark:text-gray-400 text-sm">Pending</p>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stats.pending}</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow transition-colors duration-300">
                <p className="text-gray-500 dark:text-gray-400 text-sm">In Progress</p>
                <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">{stats.inProgress}</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow transition-colors duration-300">
                <p className="text-gray-500 dark:text-gray-400 text-sm">Resolved</p>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">{stats.resolved}</p>
              </div>
            </div>

            {/* Filter */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow mb-6 transition-colors duration-300">
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => setFilter("all")}
                  className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
                    filter === "all" ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilter("Pending")}
                  className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
                    filter === "Pending" ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white"
                  }`}
                >
                  Pending
                </button>
                <button
                  onClick={() => setFilter("In Progress")}
                  className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
                    filter === "In Progress" ? "bg-yellow-600 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white"
                  }`}
                >
                  In Progress
                </button>
                <button
                  onClick={() => setFilter("Resolved")}
                  className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
                    filter === "Resolved" ? "bg-green-600 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white"
                  }`}
                >
                  Resolved
                </button>
              </div>
            </div>

            {/* Complaints Table */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden transition-colors duration-300">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Ticket ID</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Title</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Category</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Priority</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Status</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredComplaints.map((complaint) => (
                      <tr key={complaint.id} className="border-t dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300">
                        <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{complaint.ticketId}</td>
                        <td className="px-4 py-3 text-sm font-medium text-gray-800 dark:text-white">{complaint.title}</td>
                        <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{complaint.issueRegarding}</td>
                        <td className={`px-4 py-3 text-sm ${getPriorityColor(complaint.priority)}`}>
                          {complaint.priority}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(complaint.status || "Pending")}`}>
                            {complaint.status || "Pending"}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <div className="flex gap-2">
                            <select
                              value={complaint.status || "Pending"}
                              onChange={(e) => updateStatus(complaint.id, e.target.value)}
                              className="border dark:border-gray-600 rounded px-2 py-1 text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                            >
                              <option value="Pending">Pending</option>
                              <option value="In Progress">In Progress</option>
                              <option value="Resolved">Resolved</option>
                            </select>
                            <button
                              onClick={() => openResolutionModal(complaint)}
                              className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-sm"
                            >
                              Resolve
                            </button>
                            <button
                              onClick={() => {
                                setSelectedComplaint(complaint);
                                setShowModal(true);
                              }}
                              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
                            >
                              View
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredComplaints.length === 0 && (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  No complaints found
                </div>
              )}
            </div>
          </>
        ) : (
          /* Resolved Tickets Section */
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden transition-colors duration-300">
            <div className="p-4 border-b dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Resolved Tickets Archive</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                All complaints that have been successfully resolved
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Ticket ID</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Title</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Resolved Date</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Resolution Note</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {resolvedComplaints.map((complaint) => (
                    <tr key={complaint.id} className="border-t dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300">
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{complaint.ticketId}</td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-800 dark:text-white">{complaint.title}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                        {complaint.resolvedAt ? new Date(complaint.resolvedAt).toLocaleDateString() : "N/A"}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400 max-w-xs truncate">
                        {complaint.resolutionNote || "No resolution note"}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <button
                          onClick={() => {
                            setSelectedComplaint(complaint);
                            setShowModal(true);
                          }}
                          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {resolvedComplaints.length === 0 && (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                No resolved tickets yet
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modal for Complaint Details / Resolution */}
      {showModal && selectedComplaint && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Complaint Details</h2>
                <button
                  onClick={() => {
                    setShowModal(false);
                    setSelectedComplaint(null);
                    setResolutionNote("");
                  }}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
                >
                  ✕
                </button>
              </div>

              {/* Status Badge */}
              <div className="mb-4">
                <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(selectedComplaint.status || "Pending")}`}>
                  {selectedComplaint.status || "Pending"}
                </span>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Ticket ID</p>
                  <p className="font-medium text-gray-800 dark:text-white">{selectedComplaint.ticketId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Priority</p>
                  <p className={`font-medium ${getPriorityColor(selectedComplaint.priority)}`}>{selectedComplaint.priority}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Category</p>
                  <p className="font-medium text-gray-800 dark:text-white">{selectedComplaint.issueRegarding}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Sub-Category</p>
                  <p className="font-medium text-gray-800 dark:text-white">{selectedComplaint.subIssue}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                  <p className="font-medium text-gray-800 dark:text-white">{selectedComplaint.location}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Submitted</p>
                  <p className="font-medium text-gray-800 dark:text-white">
                    {selectedComplaint.createdAt?.toDate().toLocaleString() || "N/A"}
                  </p>
                </div>
              </div>

              {/* Title */}
              <div className="mb-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">Title</p>
                <p className="font-medium text-gray-800 dark:text-white">{selectedComplaint.title}</p>
              </div>

              {/* Description */}
              <div className="mb-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">Description</p>
                <p className="text-gray-800 dark:text-white">{selectedComplaint.description}</p>
              </div>

              {/* Contact Info */}
              {selectedComplaint.contact && (
                <div className="mb-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Contact</p>
                  <p className="text-gray-800 dark:text-white">{selectedComplaint.contact}</p>
                </div>
              )}

              {selectedComplaint.userEmail && (
                <div className="mb-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400">User Email</p>
                  <p className="text-gray-800 dark:text-white">{selectedComplaint.userEmail}</p>
                </div>
              )}

              {/* Resolution Section */}
              {selectedComplaint.status === "Resolved" && (
                <div className="mt-6 p-4 bg-green-50 dark:bg-green-900 rounded-lg">
                  <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2">Resolution Details</h3>
                  {selectedComplaint.resolutionNote && (
                    <div className="mb-2">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Resolution Note</p>
                      <p className="text-gray-800 dark:text-white">{selectedComplaint.resolutionNote}</p>
                    </div>
                  )}
                  {selectedComplaint.resolvedAt && (
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Resolved On</p>
                      <p className="text-gray-800 dark:text-white">{new Date(selectedComplaint.resolvedAt).toLocaleString()}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              {selectedComplaint.status !== "Resolved" && (
                <div className="mt-6">
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Mark as Resolved</h3>
                  <textarea
                    value={resolutionNote}
                    onChange={(e) => setResolutionNote(e.target.value)}
                    placeholder="Add a resolution note explaining how this complaint was resolved..."
                    className="w-full border dark:border-gray-600 rounded-lg p-3 mb-3 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
                    rows="4"
                  />
                  <button
                    onClick={() => handleResolveComplaint(selectedComplaint.id)}
                    className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Mark as Resolved
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
