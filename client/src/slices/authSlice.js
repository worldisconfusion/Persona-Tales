import { createSlice } from "@reduxjs/toolkit";

const tokenInStorage = localStorage.getItem("token");

const initialState = {
  token: tokenInStorage ? JSON.parse(tokenInStorage) : null,
  signupData: null,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      if (action.payload) {
        localStorage.setItem("token", JSON.stringify(action.payload));
      } else {
        localStorage.removeItem("token");
      }
    },
    setSignupData(state, action) {
      state.signupData = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    resetAuthState(state) {
      state.token = null;
      state.signupData = null;
      state.loading = false;
      localStorage.removeItem("token");
    },
  },
});

export const { setToken, setSignupData, setLoading, resetAuthState } =
  authSlice.actions;

export default authSlice.reducer;

