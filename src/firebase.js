import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

/**
 * Firebase configuration object
 * Uses environment variables for sensitive data
 * Falls back to hardcoded values if env vars are not available
 */
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || 'AIzaSyBZmvqwyPhOXzwYhNkzphlrnz775MCtQFE',
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || 'campuscare-3a887.firebaseapp.com',
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || 'campuscare-3a887',
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || 'campuscare-3a887.appspot.com',
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || '871251847754',
  appId: process.env.REACT_APP_FIREBASE_APP_ID || '1:871251847754:web:6c2b87e77ea073330e14b3'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
