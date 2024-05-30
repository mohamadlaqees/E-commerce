import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartSlice from "./Cart/cartSlice";
import wishListSlice from "./WishList/wishListSlice";
import authSlice from "./Auth/authSlice";
import orderSlice from "./Order/orderSlice";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  REGISTER,
  PAUSE,
  PURGE,
  PERSIST,
} from "redux-persist";

const rootPersistConfig = {
  key: "root",
  storage,
  whitelist: ["cart", "auth"],
};

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["user", "accessToken"],
};

const rootReducer = combineReducers({
  authSlice: persistReducer(authPersistConfig, authSlice),
  cartSlice,
  wishListSlice,
  orderSlice,
});
const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, REGISTER, PAUSE, PURGE, PERSIST],
      },
    }),
});
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
