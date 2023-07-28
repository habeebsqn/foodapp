import React from "react";
import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import { useDispatch } from "react-redux";
import { cartSliceAction } from "../../store/cartSlice";

const MealItem = (props) => {
  const dispatch=useDispatch();

  const onAddItemToCartHandler = (amount) => {
    dispatch(cartSliceAction.addItemHandler({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    }))
  
  };

  const price = `$${props.price.toFixed(2)}`;

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm id={props.id} onAddAmt={onAddItemToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;
