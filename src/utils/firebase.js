// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCl2l962gA72cfazERUxFQFcXFoXJSkROc",
  authDomain: "netflixgpt-f06c2.firebaseapp.com",
  projectId: "netflixgpt-f06c2",
  storageBucket: "netflixgpt-f06c2.firebasestorage.app",
  messagingSenderId: "506095467542",
  appId: "1:506095467542:web:7e00a170cdf471c1c94937",
  measurementId: "G-SPR2VBEJ2S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
