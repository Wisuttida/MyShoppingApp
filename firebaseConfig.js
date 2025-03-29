// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyDSVjr4bhTLar8uZBS94CpIR29nPCaxYl8",
  authDomain: "myshoppingapp-4c49e.firebaseapp.com",
  projectId: "myshoppingapp-4c49e",
  storageBucket: "myshoppingapp-4c49e.firebasestorage.app",
  messagingSenderId: "749975871687",
  appId: "1:749975871687:web:8d8e5114fa8f918e431ee2",
  measurementId: "G-XN3VZ8GE64"
};

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
 

let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

let analytics;
try {
  analytics = getAnalytics(app);
} catch (error) {
  console.warn("Analytics is not supported on this platform", error);
}

const auth = getAuth(app);

const db = getFirestore(app);

export { app, analytics, auth , db };