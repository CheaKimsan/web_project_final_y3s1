import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyA0oZ8N6cZ9CUpyqqDehA9z4h1OmrSxONs",
    authDomain: "egdi-d5fa7.firebaseapp.com",
    projectId: "egdi-d5fa7",
    storageBucket: "egdi-d5fa7.firebasestorage.app",
    messagingSenderId: "94702355649",
    appId: "1:94702355649:web:dc33f845310933ef418040",
    measurementId: "G-2C49F6DPK7"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
