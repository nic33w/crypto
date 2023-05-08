import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  assetsArray: [],
};

export const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    addAsset: (state: { assetsArray: any[] }, action) => {
      const found: any = state.assetsArray.find(
        (element: any) =>
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
        (element: any) =>
          !(
            element.id === action.payload.id &&
            element.purchasedDate === action.payload.purchasedDate
          )
      );
    },
  },
});

export const addAsset = portfolioSlice.actions.addAsset;
export const deleteAsset = portfolioSlice.actions.deleteAsset;

export default portfolioSlice.reducer;
