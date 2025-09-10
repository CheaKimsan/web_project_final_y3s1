import React, { createContext, useContext, useState, useEffect } from "react";
import {
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    User,
    setPersistence,
    browserLocalPersistence,
    onIdTokenChanged
} from "firebase/auth";
import { auth } from "../../../config/firebase";

interface AuthContextType {
    user: User | null | undefined;
    token: string | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null | undefined>(undefined);
    const [token, setToken] = useState<string | null>(
        () => localStorage.getItem("token")
    );

    // Firebase auth state listener
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                console.log(currentUser)
                const idToken = await currentUser.getIdToken();
                setToken(idToken);
                localStorage.setItem("token", idToken);
                setUser(currentUser);
            } else {
                setToken(null);
                localStorage.removeItem("token");
                setUser(null);
            }
        });
        return () => unsubscribe();
    }, []);

    // 👀 Watch localStorage changes (like if you manually clear it in DevTools)
    useEffect(() => {
        const unsubscribe = onIdTokenChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                const idToken = await firebaseUser.getIdToken();
                setToken(idToken);
                localStorage.setItem("token", idToken); // save
            } else {
                setToken(null);
                localStorage.removeItem("token"); // remove
            }
        });
        return () => unsubscribe();
    }, []);


    const login = async (email: string, password: string) => {
        await setPersistence(auth, browserLocalPersistence);
        const cred = await signInWithEmailAndPassword(auth, email, password);
        const idToken = await cred.user.getIdToken();
        setToken(idToken);
        localStorage.setItem("token", idToken);
    };

    
    const logout = async () => {
        await signOut(auth);
        localStorage.removeItem("token");
        setUser(null);
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used inside AuthProvider");
    return context;
};
