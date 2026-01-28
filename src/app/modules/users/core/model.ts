// src/app/modules/users/core/model.ts
export interface User {
  id: string;         // Firestore ID
  name: string;
  email: string;
  password: string;
  role: string;
  last_active: string;
  status: string;     // "active" | "inactive"
}


export interface FilterBarProps {
  role: string;
  setRole: (value: string) => void;
  status: string;
  setStatus: (value: string) => void;
}
