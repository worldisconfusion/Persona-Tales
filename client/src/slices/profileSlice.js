import { createSlice } from "@reduxjs/toolkit";

const userInStorage = localStorage.getItem("user");

const initialState = {
  user: userInStorage ? JSON.parse(userInStorage) : null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      if (action.payload) {
        localStorage.setItem("user", JSON.stringify(action.payload));
      } else {
        localStorage.removeItem("user");
      }
    },
    resetProfileState(state) {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});

export const { setUser, resetProfileState } = profileSlice.actions;

export default profileSlice.reducer;

