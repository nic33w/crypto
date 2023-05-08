import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  marketsArray: [],
};

export const coinsSlice = createSlice({
  name: "coins",
  initialState,
  reducers: {
    setMarketsArray: (state, action) => {
      state.marketsArray = action.payload;
    },
  },
});

export const { setMarketsArray } = coinsSlice.actions;
export default coinsSlice.reducer;
