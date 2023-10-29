import { configureStore } from "@reduxjs/toolkit";
import generalSlice from "./generalSlice";
import modalSlice from "./modalSlice";

const store = configureStore({
  reducer: {
    general:generalSlice,
    modal:modalSlice
  }
});

export default store