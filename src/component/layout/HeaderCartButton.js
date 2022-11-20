import React, { useContext, useEffect, useState } from "react";
import classes from "./HeaderCartButton.module.css";
import CartIcon from "../cart/CartIcon";
import cartContext from "../../store/CartContext";
const CartButton = (props) => {
  const [onBtnBump, setOnBtnBump] = useState(false);
  const cartCtx = useContext(cartContext);
  const items = cartCtx.items;

  const amtOfCartItems = items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  const btnbump = `${classes.button} ${onBtnBump ? classes.bump : ""}`;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }

    setOnBtnBump(true);

    const timer = setTimeout(() => {
      setOnBtnBump(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button
      type={props.type || "button"}
      className={btnbump}
      onClick={props.onClick}
    >
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>{props.children}</span>
      <span className={classes.badge}>{amtOfCartItems}</span>
    </button>
  );
};

export default CartButton;
