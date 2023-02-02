import React, { useRef } from "react";
import classes from "./Checkout.module.css";

const Checkout = (props) => {
  const inputNameRef = useRef();
  const inputStreetRef = useRef();
  const inputPostalRef = useRef();
  const inputCityRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = inputNameRef.current.value;
    const enteredStreet = inputStreetRef.current.value;
    const enteredPostal = inputPostalRef.current.value;
    const enteredCity = inputCityRef.current.value;

    if (
      enteredName !== "" &&
      enteredStreet !== "" &&
      enteredPostal !== "" &&
      enteredPostal.length === 5 &&
      enteredCity !== ""
    )
      props.onConfirm({
        name: enteredName,
        street: enteredStreet,
        postal: enteredPostal,
        city: enteredCity,
      });
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div>
        <h2>CHECKOUT</h2>
      </div>
      <div className={classes.control}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={inputNameRef} required />
      </div>
      <div className={classes.control}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={inputStreetRef} required />
      </div>
      <div className={classes.control}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={inputPostalRef} required />
      </div>
      <div className={classes.control}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={inputCityRef} required />
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
