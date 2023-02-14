import React, { useContext, useState } from "react";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Modal from "../UI/Modal/Modal";
import cartContext from "../../store/CartContext";
import Checkout from "./Checkout";
const Cart = (props) => {
  const [isCheckOut, setIsCheckOut] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const cartCtx = useContext(cartContext);

  const updatedTotalAmt = `$${cartCtx.totalAmount.toFixed(2)}`;

  const cartHasItem = cartCtx.items.length > 0;

  const onAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const onRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const onHandleOrder = () => {
    setIsCheckOut(true);
  };

  const onHandleCancel = () => {
    setIsCheckOut(false);
  };

  const onPostHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch("https://food-hhtp-default-rtdb.firebaseio.com/orders.json", {
      method: "POST",
      body: JSON.stringify({ customer: userData, orders: cartCtx.items }),
    });
    setIsSubmitting(false);
    setIsSubmitted(true);
    cartCtx.clearCart();
  };

  const cart = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
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
            onClick={props.onClick}
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
          onClick={props.onClick}
        >
          close
        </button>
      </div>
    </React.Fragment>
  );
  return (
    <Modal onClick={props.onClick}>
      {isSubmitting && submitting}
      {isSubmitted && submitted}
      {!isSubmitting && !isSubmitted && cartContent}
    </Modal>
  );
};

export default Cart;
