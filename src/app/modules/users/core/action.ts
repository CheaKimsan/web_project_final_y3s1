// src/app/modules/users/core/useUsers.ts
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { collection, onSnapshot, doc, deleteDoc, addDoc, setDoc } from "firebase/firestore";
import { RootState, AppDispatch } from "../../../redux/store";
import { setUsers, addUser, updateUser, removeUser } from "./reducer";
import { db } from "../../../../config/firebase";
import { User } from "./model";

const useUsers = () => {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector((state: RootState) => state.user.users) as User[];
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Real-time fetch
  useEffect(() => {
    setLoading(true);
    const colRef = collection(db, "users");

    const unsubscribe = onSnapshot(
      colRef,
      snapshot => {
        const usersData: User[] = snapshot.docs.map(doc => ({
          id: doc.id,
          name: doc.data().name,
          email: doc.data().email,
          role: doc.data().role || "user",
          last_active: doc.data().last_active || "",
          status: doc.data().last_active ? "active" : "inactive",
          password: "",
        }));
        dispatch(setUsers(usersData));
        setLoading(false);
      },
      err => {
        console.error(err);
        setError(err.message || "Failed to fetch users");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [dispatch]);

  // Delete user
  const deleteUser = async (id: string) => {
    try {
      await deleteDoc(doc(db, "users", id));
      dispatch(removeUser(id));
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to delete user");
    }
  };

  // Add or update user
  const addOrUpdateUser = async (user: User) => {
    try {
      if (user.id) {
        const userRef = doc(db, "users", user.id);
        await setDoc(userRef, { ...user, last_active: new Date().toISOString() }, { merge: true });
      } else {
        const colRef = collection(db, "users");
        await addDoc(colRef, { ...user, last_active: new Date().toISOString() });
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to save user");
    }
  };

  return { users, loading, error, deleteUser, addOrUpdateUser };
};

export default useUsers;
