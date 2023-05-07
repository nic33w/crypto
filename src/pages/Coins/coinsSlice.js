"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setMarketsArray = exports.coinsSlice = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const initialState = {
    marketsArray: [],
};
exports.coinsSlice = (0, toolkit_1.createSlice)({
    name: "coins",
    initialState,
    reducers: {
        setMarketsArray: (state, action) => {
            state.marketsArray = action.payload;
        },
    },
});
exports.setMarketsArray = exports.coinsSlice.actions.setMarketsArray;
exports.default = exports.coinsSlice.reducer;
