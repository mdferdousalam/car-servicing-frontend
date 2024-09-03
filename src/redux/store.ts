import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/api";
import authReducer from "./features/auth/authSlice";
import storage from "redux-persist/lib/storage";
import bookingReducer from "./features/booking/bookingSlice";
import {  persistReducer} from "redux-persist";
// Persist configuration for auth slice
const authPersistConfig = {
  key: "auth",
  storage,
};

// Persist configuration for booking slice
const bookingPersistConfig = {
  key: "booking",
  storage,
};

// Apply persistReducer to auth and booking reducers
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedBookingReducer = persistReducer(bookingPersistConfig, bookingReducer);

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: persistedAuthReducer,
    booking: persistedBookingReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store