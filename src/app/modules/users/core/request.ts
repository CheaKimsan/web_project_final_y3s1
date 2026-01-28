// src/api/request.ts
import axios from "axios";
import { User } from "./model";

const API_BASE = "http://localhost/api/index.php?resource=users";

const getToken = () => localStorage.getItem("token");

export const reqGetUsers = async () => {
  const token = getToken();
  if (!token) throw new Error("No Firebase token found");
  return axios.get<{ users: User[] }>(API_BASE, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const reqCreateUser = async (data: Partial<User>) => {
  const token = getToken();
  if (!token) throw new Error("No Firebase token found");
  return axios.post(API_BASE, data, { headers: { Authorization: `Bearer ${token}` } });
};

export const reqUpdateUser = async (id: number, data: Partial<User>) => {
  const token = getToken();
  if (!token) throw new Error("No Firebase token found");
  return axios.put(`${API_BASE}&id=${id}`, data, { headers: { Authorization: `Bearer ${token}` } });
};

export const reqDeleteUser = async (id: number) => {
  const token = getToken();
  if (!token) throw new Error("No Firebase token found");
  return axios.delete(`${API_BASE}&id=${id}`, { headers: { Authorization: `Bearer ${token}` } });
};
