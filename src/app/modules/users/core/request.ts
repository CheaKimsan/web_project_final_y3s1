import axios from "axios";
import { User } from "./model";

export const reqGetUsers = () => {
  return axios.get<User[]>("http://localhost/index.php?resource=users");
};

