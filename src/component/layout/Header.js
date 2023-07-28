import React from "react";
import CartButton from "./HeaderCartButton";
import meal from "../../assets/meals.jpg";
import classes from "./Header.module.css";

const Header = (props) => {
  return (
    <React.Fragment>
      <header className={classes.header}>
        <h1>FOODAPP</h1>
        <CartButton onClick={props.onClick}>Cart</CartButton>
      </header>
      <div className={classes.mainImage}>
        <img src={meal} alt=""></img>
      </div>
    </React.Fragment>
  );
};

export default Header;
