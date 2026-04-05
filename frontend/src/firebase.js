import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyADg9W-itUSWxl5bcSbyCL3JwD1B3T4ONo",
  authDomain: "smart-waste-management-a8b6b.firebaseapp.com",
  projectId: "smart-waste-management-a8b6b",
  storageBucket: "smart-waste-management-a8b6b.firebasestorage.app",
  messagingSenderId: "356310776280",
  appId: "1:356310776280:web:2b7efb3ff62e32d1bb9aad",
};

const app = initializeApp(firebaseConfig);

// 🔥 IMPORTANT FIX
export const auth = getAuth(app);
