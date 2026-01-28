// src/app/modules/users/components/UserRow.tsx
import React from "react";
import { User } from "../core/model";

interface UserRowProps {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
}

const UserRow: React.FC<UserRowProps> = ({ user, onEdit, onDelete }) => (
  <tr>
    <td>{user.name.toUpperCase()}</td>
    <td>{user.email}</td>
    <td>{user.role}</td>
    <td>{user.last_active}</td>
    <td className={`text-capitalize ${user.status === "active" ? "text-success" : "text-muted"}`}>
      {user.status}
    </td>
    <td className="text-end">
      <button className="btn btn-sm btn-warning me-2" onClick={() => onEdit(user)}>Edit</button>
      <button className="btn btn-sm btn-danger" onClick={() => onDelete(user.id)}>Delete</button>
    </td>
  </tr>
);

export default UserRow;
