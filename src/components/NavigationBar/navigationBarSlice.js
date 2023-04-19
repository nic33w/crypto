import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currency: "usd",
  order: "market_cap_desc",
  darkTheme: "true",
};

export const navigationBarSlice = createSlice({
  name: "navigationBar",
  initialState,
  reducers: {
    setCurrency: (state, action) => {
      state.currency = action.payload;
    },
    setOrder: (state, action) => {
      state.order = action.payload;
    },
    setDarkTheme: (state, action) => {
      state.darkTheme = action.payload;
    },
  },
});

export const { setCurrency, setOrder, setDarkTheme } =
  navigationBarSlice.actions;
export default navigationBarSlice.reducer;
