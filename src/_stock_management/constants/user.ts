import { User } from "../../types/User";

export const users: User[] = [
  { id: 1, name: "Chea Kimsan", email: "cheakimsan@.com", role: "Admin", lastActive: "Today, 10:24 AM", status: "Active" },
  { id: 2, name: "Lay Menghong", email: "laymenghong@.com", role: "Manager", lastActive: "Yesterday, 3:45 PM", status: "Active" },
  { id: 3, name: "Nov Vathana", email: "novvathana@.com", role: "User", lastActive: "2 days ago", status: "Inactive" },
  { id: 4, name: "Seng Phanna", email: "sengphanna@.com", role: "User", lastActive: "3 days ago", status: "Suspended" },
  { id: 5, name: "Makara", email: "makara@.com", role: "Manager", lastActive: "1 week ago", status: "Active" },
];
