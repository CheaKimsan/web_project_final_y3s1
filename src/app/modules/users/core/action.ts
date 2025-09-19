import { useDispatch, useSelector } from "react-redux";
import { setUsers } from "./reducer";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { RootState, AppDispatch } from "../../../redux/store";
import { reqGetUsers } from "./request";

const useUsers = () => {
  const users = useSelector((state: RootState) => state.user.users);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Define fetchUsers first
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await reqGetUsers(); // Await the promise
      dispatch(setUsers(response.data));
      console.log(response.data);
      
      setLoading(false);
    } catch (err: any) {
      setError(err.message || "Failed to fetch users");
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  return { users, loading, error, fetchUsers, navigate };
};

export default useUsers;
