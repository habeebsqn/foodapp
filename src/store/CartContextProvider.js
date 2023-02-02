import React, { useReducer } from "react";
import cartContext from "./CartContext";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const CartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updateTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    let updateCartItems;

    if (existingCartItem) {
      const updateItemAmt = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updateCartItems = [...state.items];
      updateCartItems[existingCartItemIndex] = updateItemAmt;
    } else {
      updateCartItems = state.items.concat(action.item);
    }

    return {
      items: updateCartItems,
      totalAmount: updateTotalAmount,
    };
  }
  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    const updateTotalAmount = state.totalAmount - existingCartItem.price;
    let updateCartItems;
    if (existingCartItem.amount === 1) {
      updateCartItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updateItemAmt = {
        ...existingCartItem,
        amount: existingCartItem.amount - 1,
      };
      updateCartItems = [...state.items];
      updateCartItems[existingCartItemIndex] = updateItemAmt;
    }
    return {
      items: updateCartItems,
      totalAmount: updateTotalAmount,
    };
  }
  if (action.type === "CLEAR") {
    return defaultCartState;
  }
  return defaultCartState;
};

const CartContextProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    CartReducer,
    defaultCartState
  );

  const addItemHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const clearCartHandler = () => {
    dispatchCartAction({ type: "CLEAR" });
  };

  const cartContextContent = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
    clearCart: clearCartHandler,
  };

  return (
    <cartContext.Provider value={cartContextContent}>
      {props.children}
    </cartContext.Provider>
  );
};

export default CartContextProvider;
