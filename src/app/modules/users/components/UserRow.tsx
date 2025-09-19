import React from "react";
import { User } from "../core/model";

interface UserRowProps {
  user: User;
}



const UserRow: React.FC<UserRowProps> = ({ user }) => {
  return (
    <tr key={user.id}>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.role}</td>
      <td>{user.last_active}</td>
      <td className="text-success text-capitalize">{"active"}</td>
      <td className="text-end">
        <button className="btn btn-sm btn-primary me-2">Edit</button>
        <button className="btn btn-sm btn-danger">Delete</button>
      </td>
    </tr>
  );
};

export default UserRow;
