import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyAjn320cXZiXKFyASTzYgId_QkrNxc-xng",
    authDomain: "api-auth-9504e.firebaseapp.com",
    projectId: "api-auth-9504e",
    storageBucket: "api-auth-9504e.firebasestorage.app",
    messagingSenderId: "124301297479",
    appId: "1:124301297479:web:a4c3c9c202c8c45f632e62",
    measurementId: "G-S259SMGH6Y"
//     email : admin@gmail.com
//     password : **aa12345
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
