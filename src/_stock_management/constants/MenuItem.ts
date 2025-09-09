
import { House, FileText, People, BarChart, Gear } from "react-bootstrap-icons";

export const menuItems = [
  { label: "Home", icon: House, path: "/" },
  { label: "Products", icon: FileText, path: "/products" },
  { label: "Categories", icon: BarChart, path: "/categories" },
  { label: "Statistics", icon: BarChart, path: "/statistics" },
  { label: "Users", icon: People, path: "/users" },
  { label: "Settings", icon: Gear, path: "/settings", mtAuto: true },
];