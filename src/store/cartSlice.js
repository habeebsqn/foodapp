import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalAmount: 0,
  },

  reducers: {
    addItemHandler(currentState, action) {
      const newItem = action.payload;
      currentState.totalAmount =
        currentState.totalAmount + newItem.price * newItem.amount;

      const existingCartItemIndex = currentState.items.findIndex(
        (item) => item.id === newItem.id
      );

      const existingCartItem = currentState.items[existingCartItemIndex];

      if (existingCartItem) {
        const updateItemAmt = {
          ...existingCartItem,
          amount: existingCartItem.amount + newItem.amount,
        };
        // updateCartItems = [...currentState.items];
        currentState.items[existingCartItemIndex] = updateItemAmt;
      } else {
        currentState.items.push({
          id: newItem.id,
          name: newItem.name,
          price: newItem.price,
          amount: newItem.amount,
        });
      }
    },
    removeItemhandler(currentState, action) {
      const itemId = action.payload;

      const existingCartItemIndex = currentState.items.findIndex(
        (item) => item.id === itemId
      );
      const existingCartItem = currentState.items[existingCartItemIndex];
      currentState.totalAmount =
        currentState.totalAmount - existingCartItem.price;

      if (existingCartItem.amount === 1) {
        currentState.items = currentState.items.filter(
          (item) => item.id !== itemId
        );
      } else {
        const updateItemAmt = {
          ...existingCartItem,
          amount: existingCartItem.amount - 1,
        };
        // updateCartItems = [...currentState.items];
        currentState.items[existingCartItemIndex] = updateItemAmt;
      }
    },
    clearCartHandler(currentState) {
      return currentState;
    },
  },
});

export const cartSliceAction = cartSlice.actions;

export default cartSlice;
