import { User } from "../../types/User";

export const users: User[] = [
  { id: 1, name: "Wade Warren", email: "wade.warren@example.com", role: "Admin", lastActive: "Today, 10:24 AM", status: "Active" },
  { id: 2, name: "Jenny Wilson", email: "jenny.wilson@example.com", role: "Manager", lastActive: "Yesterday, 3:45 PM", status: "Active" },
  { id: 3, name: "Robert Fox", email: "robert.fox@example.com", role: "User", lastActive: "2 days ago", status: "Inactive" },
  { id: 4, name: "Cody Fisher", email: "cody.fisher@example.com", role: "User", lastActive: "3 days ago", status: "Suspended" },
  { id: 5, name: "Albert Flores", email: "albert.flores@example.com", role: "Manager", lastActive: "1 week ago", status: "Active" },
];