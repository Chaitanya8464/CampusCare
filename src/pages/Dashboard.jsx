import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db, auth } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import Slidebar from "../components/Slidebar";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, inProgress: 0, resolved: 0 });
  const [loading, setLoading] = useState(true);
  const [offlineMode, setOfflineMode] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        await fetchUserComplaints(currentUser);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const fetchUserComplaints = async (currentUser) => {
    try {
      console.log("=== FETCHING COMPLAINTS ===");
      console.log("Current user:", currentUser.email);
      console.log("Current user UID:", currentUser.uid);

      // Query only complaints for this user
      const q = query(
        collection(db, "complaints"),
        where("userEmail", "==", currentUser.email)
      );
      const snapshot = await getDocs(q);

      let complaintsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      console.log("User complaints fetched:", complaintsData.length);
      console.log("User complaints data:", complaintsData);

      setComplaints(complaintsData);

      setStats({
        total: complaintsData.length,
        pending: complaintsData.filter(c => c.status === "Pending").length,
        inProgress: complaintsData.filter(c => c.status === "In Progress").length,
        resolved: complaintsData.filter(c => c.status === "Resolved").length
      });
      setOfflineMode(false);
    } catch (error) {
      console.error("Could not fetch complaints:", error.message, error.code);
      setOfflineMode(true);
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-20 pb-8 px-6 transition-colors duration-300">
      <Slidebar />
      
      <div className="ml-20 max-w-6xl">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          Welcome, {user?.displayName || user?.email || "User"}!
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">Track and manage your complaints</p>

        {offlineMode && (
          <div className="mb-4 p-4 rounded-lg bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
            ⚠️ You're currently offline. Some data may not be up to date.
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow transition-colors duration-300">
            <p className="text-gray-500 dark:text-gray-400 text-sm">Total</p>
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

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <Link to="/submit" className="bg-blue-600 text-white p-6 rounded-xl shadow hover:bg-blue-700 transition">
            <h3 className="text-xl font-semibold mb-2">📝 Submit New Complaint</h3>
            <p className="text-blue-100">File a new complaint or issue report</p>
          </Link>
          <Link to="/track" className="bg-green-600 text-white p-6 rounded-xl shadow hover:bg-green-700 transition">
            <h3 className="text-xl font-semibold mb-2">🔍 Track Complaint</h3>
            <p className="text-green-100">Search and track complaint status</p>
          </Link>
        </div>

        {/* Recent Complaints */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow transition-colors duration-300">
          <div className="p-6 border-b dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Your Complaints</h2>
          </div>
          
          <div className="divide-y dark:divide-gray-700">
            {complaints.length > 0 ? (
              complaints.map((complaint) => (
                <div key={complaint.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-800 dark:text-white">{complaint.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {complaint.ticketId} • {complaint.issueRegarding} • {complaint.subIssue}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{complaint.description?.substring(0, 100)}...</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(complaint.status || "Pending")}`}>
                      {complaint.status || "Pending"}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                <p>No complaints yet</p>
                <Link to="/submit" className="text-blue-600 dark:text-blue-400 hover:underline mt-2 inline-block">
                  Submit your first complaint
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
