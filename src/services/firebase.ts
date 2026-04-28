import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBlcYJICW4gDWg8NUIqAOtQel8uQQXTHi4",
    authDomain: "healthcare-455d0.firebaseapp.com",
    projectId: "healthcare-455d0",
    storageBucket: "healthcare-455d0.firebasestorage.app",
    messagingSenderId: "1012602937738",
    appId: "1:1012602937738:web:11a26a150c8bc562bf6873",
    measurementId: "G-C1QCJ85N8L"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);