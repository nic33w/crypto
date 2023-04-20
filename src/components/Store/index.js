import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import portfolioReducer from "../../pages/Portfolio/portfolioSlice";
import coinsReducer from "../../pages/Coins/coinsSlice";
import navigationBarReducer from "../../components/NavigationBar/navigationBarSlice";

const rootPersistConfig = {
  key: "root",
  storage,
  whitelist: ["portfolio"],
};

const rootReducer = combineReducers({
  portfolio: portfolioReducer,
  coins: coinsReducer,
  navigationBar: navigationBarReducer,
});
const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const Store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});
export const persistor = persistStore(Store);
