import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  assetsArray: [],
};

export const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    addAsset: (state, action) => {
      const found = state.assetsArray.find(
        (element) =>
          element.id === action.payload.id &&
          element.purchasedDate === action.payload.purchasedDate
      );
      if (found) {
        found.purchasedAmount += action.payload.purchasedAmount;
      } else {
        state.assetsArray = [...state.assetsArray, action.payload];
      }
    },
    deleteAsset: (state, action) => {
      state.assetsArray = state.assetsArray.filter(
        (element) =>
          !(
            element.id === action.payload.id &&
            element.purchasedDate === action.payload.purchasedDate
          )
      );
    },
  },
});

export const { addAsset, deleteAsset } = portfolioSlice.actions;
export default portfolioSlice.reducer;
