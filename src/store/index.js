import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/reducer";
import usersReducer from "./users/reducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
  },
});

export default store;