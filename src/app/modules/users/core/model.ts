// types/User.ts
export interface User {
  id: number;
  name: string;
  email: string;
  role: "Admin" | "Manager" | "User";
  lastActive: string;
  status: "Active" | "Inactive" | "Suspended";
}
