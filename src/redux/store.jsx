import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import loginReducer from "./loginSlice";
import addAndUpdate from "./addAndUpdate";
import addCartAndWishlist from "./AddCartAndWishlist";

const rootReducer = combineReducers({
  authentication: loginReducer,
  productAddAndUpdate: addAndUpdate,
  addCartAndWishlist: addCartAndWishlist,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["productAddAndUpdate","addCartAndWishlist"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
