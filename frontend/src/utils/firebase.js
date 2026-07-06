import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "cortextai-14f23.firebaseapp.com",
  projectId: "cortextai-14f23",
  storageBucket: "cortextai-14f23.firebasestorage.app",
  messagingSenderId: "177741636026",
  appId: "1:177741636026:web:9dfd8e3428d3ab2d9d3d83",
  measurementId: "G-7MBMK70DZM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
