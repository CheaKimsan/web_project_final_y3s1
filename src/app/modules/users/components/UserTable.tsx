// src/app/modules/users/features/UserTable.tsx
import React from "react";
import { User } from "../core/model";
import UserRow from "./UserRow";

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, onEdit, onDelete }) => (
  <table className="table table-striped">
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
        <th>Last Active</th>
        <th>Status</th>
        <th className="text-end">Actions</th>
      </tr>
    </thead>
    <tbody>
      {users.map(user => (
        <UserRow key={user.id} user={user} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </tbody>
  </table>
);

export default UserTable;
