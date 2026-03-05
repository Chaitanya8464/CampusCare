import React, { useState, useEffect } from "react";
import Slidebar from "../components/Slidebar";
import { db } from "../firebase";
import { collection, getDocs, doc, updateDoc, query, orderBy } from "firebase/firestore";

export default function AdminDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [filter, setFilter] = useState("all");
  const [stats, setStats] = useState({ total: 0, pending: 0, inProgress: 0, resolved: 0 });
  const [offlineMode, setOfflineMode] = useState(false);

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
      await updateDoc(complaintRef, { status: newStatus });
      fetchComplaints();
    } catch (error) {
      console.error("Error updating status:", error);
    }
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
              className={`px-4 py-2 rounded-lg transition-colors duration-300 ${filter === "all" ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white"}`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("Pending")}
              className={`px-4 py-2 rounded-lg transition-colors duration-300 ${filter === "Pending" ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white"}`}
            >
              Pending
            </button>
            <button
              onClick={() => setFilter("In Progress")}
              className={`px-4 py-2 rounded-lg transition-colors duration-300 ${filter === "In Progress" ? "bg-yellow-600 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white"}`}
            >
              In Progress
            </button>
            <button
              onClick={() => setFilter("Resolved")}
              className={`px-4 py-2 rounded-lg transition-colors duration-300 ${filter === "Resolved" ? "bg-green-600 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white"}`}
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
                      <select
                        value={complaint.status || "Pending"}
                        onChange={(e) => updateStatus(complaint.id, e.target.value)}
                        className="border dark:border-gray-600 rounded px-2 py-1 text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                      </select>
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
      </div>
    </div>
  );
}
