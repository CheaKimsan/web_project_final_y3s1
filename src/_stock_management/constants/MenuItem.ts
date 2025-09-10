import {
  House,
  FileText,
  People,
  Gear,
  PieChart,     // good for categories
  ShieldLock,   // good for role/permissions
} from "react-bootstrap-icons";

export const menuItems = [
  { label: "Home", icon: House, path: "/" },
  { label: "Products", icon: FileText, path: "/products" },
  { label: "Categories", icon: PieChart, path: "/categories" },
  { label: "Statistics", icon: FileText, path: "/statistics" }, // you can keep/change
  { label: "Users", icon: People, path: "/users" },
  { label: "Role", icon: ShieldLock, path: "/role" },
  { label: "Settings", icon: Gear, path: "/settings", mtAuto: true },
];
