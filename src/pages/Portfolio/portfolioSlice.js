"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAsset = exports.addAsset = exports.portfolioSlice = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const initialState = {
    assetsArray: [],
};
exports.portfolioSlice = (0, toolkit_1.createSlice)({
    name: "portfolio",
    initialState,
    reducers: {
        addAsset: (state, action) => {
            const found = state.assetsArray.find((element) => element.id === action.payload.id &&
                element.purchasedDate === action.payload.purchasedDate);
            if (found) {
                found.purchasedAmount += action.payload.purchasedAmount;
            }
            else {
                state.assetsArray = [...state.assetsArray, action.payload];
            }
        },
        deleteAsset: (state, action) => {
            state.assetsArray = state.assetsArray.filter((element) => !(element.id === action.payload.id &&
                element.purchasedDate === action.payload.purchasedDate));
        },
    },
});
exports.addAsset = exports.portfolioSlice.actions.addAsset;
exports.deleteAsset = exports.portfolioSlice.actions.deleteAsset;
exports.default = exports.portfolioSlice.reducer;
