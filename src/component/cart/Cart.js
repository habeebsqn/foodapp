import React, { useState } from "react";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Modal from "../UI/Modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { uiSliceAction } from "../../store/uiSlice";
import { cartSliceAction } from "../../store/cartSlice";
import Checkout from "./Checkout";

const Cart = () => {
  const dispatch = useDispatch();
  const [isCheckOut, setIsCheckOut] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const items = useSelector((state) => state.cart.items);
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  const updatedTotalAmt = `$${totalAmount.toFixed(2)}`;

  const cartHasItem = items.length > 0;

  const cartCloseHandler = () => {
    dispatch(uiSliceAction.closeCartHandler());
  };

  const onAddHandler = (item) => {
    dispatch(cartSliceAction.addItemHandler({ ...item, amount: 1 }));
  };

  const onRemoveHandler = (id) => {
    dispatch(cartSliceAction.removeItemhandler(id));
  };

  const onHandleOrder = () => {
    setIsCheckOut(true);
  };

  const onHandleCancel = () => {
    setIsCheckOut(false);
  };

  const onPostHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch(
      "https://food-http-de367-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({ customer: userData, order: items }),
      }
    );
    setIsSubmitting(false);
    setIsSubmitted(true);
    dispatch(cartSliceAction.clearCartHandler());
  };

  const cart = (
    <ul className={classes["cart-items"]}>
      {items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={onRemoveHandler.bind(null, item.id)}
          onAdd={onAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const cartContent = (
    <React.Fragment>
      <div>{!cartHasItem ? <p>CART EMPTY</p> : cart}</div>
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{updatedTotalAmt}</span>
      </div>
      {isCheckOut && (
        <Checkout onConfirm={onPostHandler} onCancel={onHandleCancel} />
      )}
      {!isCheckOut && (
        <div className={classes.actions}>
          <button
            className={classes["button--alt"]}
            type="button"
            onClick={cartCloseHandler}
          >
            close
          </button>
          {cartHasItem && (
            <button className={classes.button} onClick={onHandleOrder}>
              order
            </button>
          )}
        </div>
      )}
    </React.Fragment>
  );

  const submitting = <p>SUBMITTING ORDER!!</p>;
  const submitted = (
    <React.Fragment>
      <p>GREAT DELIOUS DELICACY ON ITS WAY TO YOU!!</p>
      <div className={classes.actions}>
        <button
          className={classes["button--alt"]}
          type="button"
          onClick={cartCloseHandler}
        >
          close
        </button>
      </div>
    </React.Fragment>
  );

  return (
    <Modal onClick={cartCloseHandler}>
      {isSubmitting && submitting}
      {isSubmitted && submitted}
      {!isSubmitting && !isSubmitted && cartContent}
    </Modal>
  );
};

export default Cart;
