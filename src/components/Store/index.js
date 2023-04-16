import { configureStore } from "@reduxjs/toolkit";
import portfolioReducer from "../../pages/Portfolio/portfolioSlice";
import coinsReducer from "../../pages/Coins/coinsSlice";
import navigationBarReducer from "../../components/NavigationBar/navigationBarSlice";

export default configureStore({
  reducer: {
    portfolio: portfolioReducer,
    coins: coinsReducer,
    navigationBar: navigationBarReducer,
  },
});
