// components/UserRow.tsx
import React from "react";
import { User } from "../core/model";
import {PencilSquare, Trash} from "react-bootstrap-icons";

interface UserRowProps {
  user: User;
}

const UserRow: React.FC<UserRowProps> = ({ user }) => {
  const roleClass =
    user.role === "Admin"
      ? "badge bg-warning text-dark"
      : user.role === "Manager"
      ? "badge bg-primary"
      : "badge bg-success";

  const statusClass =
    user.status === "Active"
      ? "text-success fw-bold"
      : user.status === "Inactive"
      ? "text-warning fw-bold"
      : "text-danger fw-bold";

  return (
    <tr>
      <td>
          <div>{user.name}</div>
      </td>
      <td>
        <div>{user.email}</div>
      </td>
      <td>
        <span className={roleClass}>{user.role}</span>
      </td>
      <td>{user.lastActive}</td>
      <td>
        <span className={statusClass}>{user.status}</span>
      </td>
        <td className="text-end">
            <button className="btn btn-warning btn-sm me-1">
                <PencilSquare/> Edit
            </button>
            <button className="btn btn-danger btn-sm">
                <Trash/> Delete
            </button>
        </td>
    </tr>
  );
};

export default UserRow;
