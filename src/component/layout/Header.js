import React from "react";
import CartButton from "./HeaderCartButton";
import meal from "../../assets/meals.jpg";
import classes from "./Header.module.css";
import { useDispatch } from "react-redux";
import { uiSliceAction } from "../../store/uiSlice";

const Header = () => {
  const dispatch = useDispatch()

  const openCartHandler = () => {
    dispatch(uiSliceAction.openCartHandler())
  };

  return (
    <React.Fragment>
      <header className={classes.header}>
        <h1>FOODAPP</h1>
        <CartButton onClick={openCartHandler}>Cart</CartButton>
      </header>
      <div className={classes.mainImage}>
        <img src={meal} alt=""></img>
      </div>
    </React.Fragment>
  );
};

export default Header;
