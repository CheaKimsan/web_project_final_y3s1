// src/app/modules/users/core/reducer.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "./model";

interface UserState {
  users: User[];
}

const initialState: UserState = { users: [] };

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
    updateUser: (state, action: PayloadAction<User>) => {
      state.users = state.users.map(u => u.id === action.payload.id ? action.payload : u);
    },
    removeUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter(u => u.id !== action.payload);
    }
  },
});

export const { setUsers, addUser, updateUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
