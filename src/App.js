import React  from "react";
import Header from "./component/layout/Header";
import Meal from "./component/meal/Meal";
import Cart from "./component/cart/Cart";
import { useSelector } from "react-redux";


function App() {
  const openCart =useSelector(state=>state.ui.openCart)

  return (
    <>
      <Header />
      <main>
        {openCart && <Cart />}
        <Meal />
      </main>
    </>
  );
}

export default App;
