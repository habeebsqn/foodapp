import React, { useState } from "react";
import Header from "./component/layout/Header";
import Meal from "./component/meal/Meal";
import Cart from "./component/cart/Cart";
import CartContextProvider from "./store/CartContextProvider";
function App() {
  const [openCart, setOpenCart] = useState(false);

  const openCartHandler = () => {
    setOpenCart(true);
  };

  const closeCartHandler = () => {
    setOpenCart(false);
  };

  return (
    <CartContextProvider>
      <Header onClick={openCartHandler} />
      <main>
        {openCart && <Cart onClick={closeCartHandler} />}
        <Meal />
      </main>
    </CartContextProvider>
  );
}

export default App;
