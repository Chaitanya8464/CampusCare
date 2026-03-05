import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import Slidebar from "../components/Slidebar";
import profileLogo from "../assets/profileLogo.jpg";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState({
    displayName: "",
    email: "",
    phone: "",
    department: "",
    role: "student"
  });
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [fetchError, setFetchError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const baseUserData = {
          displayName: currentUser.displayName || "",
          email: currentUser.email || "",
          phone: "",
          department: "",
          role: "student"
        };

        // Fetch additional user data from Firestore with error handling
        try {
          const userDoc = await getDoc(doc(db, "users", currentUser.uid));
          if (userDoc.exists()) {
            setUserData({ ...baseUserData, ...userDoc.data() });
          } else {
            setUserData(baseUserData);
          }
          setFetchError(false);
        } catch (error) {
          console.warn("Could not fetch user profile (possibly offline):", error.message);
          setUserData(baseUserData);
          setFetchError(true);
        }
      } else {
        navigate("/login");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleSave = async () => {
    try {
      await updateProfile(user, {
        displayName: userData.displayName
      });

      await setDoc(doc(db, "users", user.uid), {
        displayName: userData.displayName,
        email: userData.email,
        phone: userData.phone,
        department: userData.department,
        role: userData.role,
        updatedAt: new Date()
      }, { merge: true });

      setMessage("Profile updated successfully!");
      setEditing(false);
      setFetchError(false);
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("Error updating profile: " + error.message);
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
      
      <div className="ml-20 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">My Profile</h1>

        {message && (
          <div className={`mb-4 p-4 rounded-lg ${message.includes('success') ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'}`}>
            {message}
          </div>
        )}

        {fetchError && (
          <div className="mb-4 p-4 rounded-lg bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
            ⚠️ You're currently offline. Some profile data may not be up to date.
          </div>
        )}

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-colors duration-300">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-8 text-white text-center">
            <img
              src={profileLogo}
              alt="Profile"
              className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white"
            />
            <h2 className="text-2xl font-bold">{user?.displayName || "User"}</h2>
            <p className="text-blue-100">{user?.email}</p>
          </div>

          {/* Profile Details */}
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Account Information</h3>
              {!editing ? (
                <button
                  onClick={() => setEditing(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Edit Profile
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditing(false)}
                    className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">Full Name</label>
                {editing ? (
                  <input
                    type="text"
                    value={userData.displayName}
                    onChange={(e) => setUserData({ ...userData, displayName: e.target.value })}
                    className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white dark:border-gray-600"
                  />
                ) : (
                  <p className="text-gray-800 dark:text-white">{userData.displayName || "Not set"}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">Email</label>
                <p className="text-gray-800 dark:text-white">{userData.email}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">Phone Number</label>
                {editing ? (
                  <input
                    type="tel"
                    value={userData.phone}
                    onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                    className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white dark:border-gray-600"
                    placeholder="Enter phone number"
                  />
                ) : (
                  <p className="text-gray-800 dark:text-white">{userData.phone || "Not set"}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">Department</label>
                {editing ? (
                  <input
                    type="text"
                    value={userData.department}
                    onChange={(e) => setUserData({ ...userData, department: e.target.value })}
                    className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white dark:border-gray-600"
                    placeholder="e.g., Computer Science"
                  />
                ) : (
                  <p className="text-gray-800 dark:text-white">{userData.department || "Not set"}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">Role</label>
                {editing ? (
                  <select
                    value={userData.role}
                    onChange={(e) => setUserData({ ...userData, role: e.target.value })}
                    className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white dark:border-gray-600"
                  >
                    <option value="student">Student</option>
                    <option value="faculty">Faculty</option>
                    <option value="staff">Staff</option>
                    <option value="admin">Admin</option>
                  </select>
                ) : (
                  <p className="text-gray-800 dark:text-white capitalize">{userData.role || "Student"}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
