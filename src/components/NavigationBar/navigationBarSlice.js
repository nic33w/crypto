import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currency: "usd",
};

export const navigationBarSlice = createSlice({
  name: "navigationBar",
  initialState,
  reducers: {
    setCurrency: (state, action) => {
      state.currency = action.payload;
    },
  },
});

export const { setCurrency } = navigationBarSlice.actions;
export default navigationBarSlice.reducer;
