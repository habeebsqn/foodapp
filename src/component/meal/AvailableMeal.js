import React from "react";
import classes from "./AvailableMeal.module.css";
import MealItem from "./MealItem";
import Card from "../UI/Card";
import DUMMY_MEALS from "./DummyMeals";

const AvailableMeal = () => {
  return (
    <div className={classes.meals}>
      <Card>
        <ul>
          {DUMMY_MEALS.map((meal) => (
            <MealItem
              id={meal.id}
              key={meal.id}
              name={meal.name}
              description={meal.description}
              price={meal.price}
            ></MealItem>
          ))}
        </ul>
      </Card>
    </div>
  );
};

export default AvailableMeal;
