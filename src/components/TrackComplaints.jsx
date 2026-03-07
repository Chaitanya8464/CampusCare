import React, { useState, useEffect } from "react";
import Slidebar from "./Slidebar";
import { db, auth } from "../firebase";
import { collection, query, orderBy, limit, getDocs, where, deleteDoc, doc } from "firebase/firestore";

export default function TrackComplaints() {
  const [ticketId, setTicketId] = useState("");
  const [complaints, setComplaints] = useState([]);
  const [searchResult, setSearchResult] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch recent complaints for the current user only
    const fetchRecentComplaints = async () => {
      try {
        const currentUserEmail = auth.currentUser?.email;

        if (!currentUserEmail) {
          console.warn("No user logged in");
          setComplaints([]);
          return;
        }

        const q = query(
          collection(db, "complaints"),
          where("userEmail", "==", currentUserEmail),
          orderBy("createdAt", "desc"),
          limit(5)
        );
        const snapshot = await getDocs(q);
        setComplaints(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      } catch (err) {
        console.error("Error fetching complaints:", err);
      }
    };

    fetchRecentComplaints();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "In Progress":
        return "bg-yellow-200 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "Resolved":
        return "bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "Pending":
        return "bg-blue-200 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      default:
        return "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
    }
  };

  const handleSearch = async () => {
    if (!ticketId) {
      alert("Please enter a Ticket ID.");
      return;
    }

    try {
      const q = query(
        collection(db, "complaints"),
        where("ticketId", "==", ticketId),
        where("userEmail", "==", auth.currentUser?.email)
      );
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        const doc = snapshot.docs[0];
        setSearchResult({ ...doc.data(), id: doc.id });
      } else {
        setSearchResult(null);
        alert("❌ No complaint found with this Ticket ID.");
      }
    } catch (err) {
      console.error("Error searching complaint:", err);
      if (err.code === "failed-precondition") {
        alert("⚠️ Index required. Please check console for index creation link.");
      } else {
        alert("❌ Search failed: " + err.message);
      }
    }
  };

  const handleDelete = async (complaintId, ticketId) => {
    if (!window.confirm(`Are you sure you want to delete complaint ${ticketId}? This action cannot be undone.`)) {
      return;
    }

    setLoading(true);
    try {
      await deleteDoc(doc(db, "complaints", complaintId));
      // Remove from local state
      setComplaints(complaints.filter(c => c.id !== complaintId));
      if (searchResult && searchResult.id === complaintId) {
        setSearchResult(null);
      }
      alert("✅ Complaint deleted successfully!");
    } catch (err) {
      console.error("Error deleting complaint:", err);
      alert("❌ Failed to delete complaint. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 flex items-center justify-center transition-colors duration-300">
      <Slidebar />
      <div className="w-full max-w-3xl bg-gray-50 dark:bg-gray-800 shadow-lg rounded-lg p-4 transition-colors duration-300">
        {/* Search */}
        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow mb-6 transition-colors duration-300">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Track Your Complaint</h2>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="e.g CMP-123456"
              value={ticketId}
              onChange={(e) => setTicketId(e.target.value)}
              className="flex-1 border rounded-lg px-4 py-2 bg-gray-50 dark:bg-gray-600 text-gray-800 dark:text-white dark:border-gray-500"
            />
            <button
              onClick={handleSearch}
              className="px-4 py-2 bg-black dark:bg-gray-600 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-500 transition-colors duration-300"
            >
              Search
            </button>
          </div>
        </div>

        {/* Search Result */}
        {searchResult && (
          <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow mb-6 transition-colors duration-300">
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Complaint Details</h2>
              <button
                onClick={() => handleDelete(searchResult.id, searchResult.ticketId)}
                disabled={loading}
                className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 disabled:opacity-50 transition-colors duration-300"
              >
                Delete
              </button>
            </div>
            <p className="font-medium text-gray-800 dark:text-white">
              {searchResult.title}{" "}
              <span
                className={`ml-2 px-2 py-1 text-xs rounded-full ${getStatusColor(
                  searchResult.status || "Pending"
                )}`}
              >
                {searchResult.status || "Pending"}
              </span>
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              ID: {searchResult.ticketId} • {searchResult.issueRegarding} •{" "}
              {searchResult.subIssue}
            </p>
            <p className="text-sm mt-2 text-gray-600 dark:text-gray-300">{searchResult.description}</p>
          </div>
        )}

        {/* Recent Complaints */}
        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow transition-colors duration-300">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">My Complaints</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">
            Your recently submitted complaints.
          </p>
          <div className="space-y-3">
            {complaints.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400 text-center py-4">No complaints found.</p>
            ) : (
              complaints.map((c, index) => (
                <div
                  key={index}
                  className="flex justify-between items-start border dark:border-gray-600 rounded-lg p-4 hover:shadow transition-colors duration-300"
                >
                  <div>
                    <p className="font-medium text-gray-800 dark:text-white">
                      {c.title}{" "}
                      <span
                        className={`ml-2 px-2 py-1 text-xs rounded-full ${getStatusColor(
                          c.status || "Pending"
                        )}`}
                      >
                        {c.status || "Pending"}
                      </span>
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      ID: {c.ticketId} • {c.issueRegarding} •{" "}
                      {c.createdAt?.toDate().toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                      onClick={() => setSearchResult(c)}
                    >
                      View
                    </button>
                    <button
                      className="text-red-600 dark:text-red-400 hover:underline"
                      onClick={() => handleDelete(c.id, c.ticketId)}
                      disabled={loading}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
