import React, { useContext } from "react";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Modal from "../UI/Modal/Modal";
import cartContext from "../../store/CartContext";
const Cart = (props) => {
  const cartCtx = useContext(cartContext);

  const updatedTotalAmt = `$${cartCtx.totalAmount.toFixed(2)}`;

  const cartHasItem = cartCtx.items.length > 0;

  const onAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const onRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cart = (
    <ul>
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

  return (
    <Modal onClick={props.onClick}>
      {!cartHasItem ? <p>CART EMPTY</p> : cart}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{updatedTotalAmt}</span>
      </div>
      <div className={classes.actions}>
        <button
          className={classes["button--alt"]}
          type="button"
          onClick={props.onClick}
        >
          close
        </button>
        {cartHasItem && <button className={classes.button}>order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
