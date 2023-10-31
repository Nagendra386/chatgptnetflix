import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";


export const appstore = configureStore({
  reducer: {
    user: userReducer,
  },
});
