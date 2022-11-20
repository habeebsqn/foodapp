import React from "react";
import MealSummary from "./MealSummary";
import AvailableMeal from "./AvailableMeal";

const Meal = () => {
  return (
    <React.Fragment>
      <MealSummary />
      <AvailableMeal />
    </React.Fragment>
  );
};

export default Meal;
