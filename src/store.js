///create store
import { configureStore } from "@reduxjs/toolkit";
import userLoginReducer from "./Slices/userLoginSlice";

const store = configureStore({
  reducer: {
    user: userLoginReducer,
  },
});

export default store;
