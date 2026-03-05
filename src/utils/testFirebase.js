import { db } from "../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

// Test Firebase connection
export const testFirebaseConnection = async () => {
  try {
    console.log("Testing Firebase connection...");
    
    // Try to read from complaints collection
    const querySnapshot = await getDocs(collection(db, "complaints"));
    console.log("✅ Firestore read successful. Documents:", querySnapshot.size);
    
    // Try to write a test document
    const testDoc = {
      test: true,
      timestamp: new Date().toISOString(),
      message: "This is a test document"
    };
    
    const docRef = await addDoc(collection(db, "complaints"), testDoc);
    console.log("✅ Firestore write successful. Document ID:", docRef.id);
    
    return { success: true, message: "Firebase connection working!" };
  } catch (error) {
    console.error("❌ Firebase connection failed:", error.message);
    console.error("Error code:", error.code);
    console.error("Error type:", error.type);
    
    return { 
      success: false, 
      message: error.message,
      code: error.code
    };
  }
};

export default testFirebaseConnection;
