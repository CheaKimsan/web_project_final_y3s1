// core/model.ts
export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  last_active: string;
  status: boolean | String;
}


export interface FilterBarProps {
  role: string;
  setRole: (value: string) => void;
  status: string;
  setStatus: (value: string) => void;
}
