import React, { useState, useEffect, useCallback } from "react";
import classes from "./AvailableMeal.module.css";
import MealItem from "./MealItem";
import Card from "../UI/Card";

const AvailableMeal = () => {
  const [loadedMeals, setLoadedMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const fetchmealsHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://foods-http-97221-default-rtdb.firebaseio.com/meals.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();

      const loaded = [];

      for (const key in data) {
        loaded.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }

      setLoadedMeals(loaded);
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchmealsHandler();
  }, [fetchmealsHandler]);

  const listOfMealS = loadedMeals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    ></MealItem>
  ));

  return (
    <div className={classes.meals}>
      <Card>
        <ul>
          {isLoading && !error ? <p>THE MEALS ARE COMING!</p> : listOfMealS}
          {error && <p>{error}</p>}
        </ul>
      </Card>
    </div>
  );
};

export default AvailableMeal;
