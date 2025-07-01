// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAsEZtRw7CliXcbjcsHHqmJsgI7z3cgF4k",
  authDomain: "mindmap-react.firebaseapp.com",
  projectId: "mindmap-react",
  storageBucket: "mindmap-react.firebasestorage.app",
  messagingSenderId: "604506616222",
  appId: "1:604506616222:web:f0d22f2a879d43c7e4e68f",
  measurementId: "G-BFZ0D7NELW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);