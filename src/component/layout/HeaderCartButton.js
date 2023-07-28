import React, {  useEffect, useState } from "react";
import classes from "./HeaderCartButton.module.css";
import CartIcon from "../cart/CartIcon";
import { useSelector } from "react-redux";
const CartButton = (props) => {
  const items =useSelector(state=>state.cart.items)
  const [onBtnBump, setOnBtnBump] = useState(false);
 
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
