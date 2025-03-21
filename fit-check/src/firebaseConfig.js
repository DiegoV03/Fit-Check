import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDp8_Hc23g_64t0m-hVa87CwUgnsYTtdkc",
    authDomain: "fit-check-abbbd.firebaseapp.com",
    projectId: "fit-check-abbbd",
    storageBucket: "fit-check-abbbd.firebasestorage.app",
    messagingSenderId: "878206356313",
    appId: "1:878206356313:web:16f2fcef967efcc6541a48",
    measurementId: "G-QM0CESY3CP"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
