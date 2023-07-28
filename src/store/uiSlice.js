import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    openCart: false,
  },

  reducers: {
    openCartHandler(currentState) {
      currentState.openCart = true;
    },
    closeCartHandler(currentState) {
      currentState.openCart = false;
    },
  },
});

export const uiSliceAction = uiSlice.actions;

export default uiSlice;
