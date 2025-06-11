import { createSlice } from "@reduxjs/toolkit";
const loginSlice = createSlice({
  name: "login",
  initialState: {
    user: null,
    type: null,
    token: null,
  },
  reducers: {
    login: (state, action) => {
      const { email } = action.payload;

      const merchant = email.endsWith("@shopify.com");
      const token = merchant ? "merchant-token" : "user-token";

      const userData = { email, token };
      localStorage.setItem("user", JSON.stringify(userData));

      state.user = userData;
      state.token = { token };
    },

    logout: (state) => {
      localStorage.removeItem("user");
      state.user = null;
      state.token = null;
    },
  },
});

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;
