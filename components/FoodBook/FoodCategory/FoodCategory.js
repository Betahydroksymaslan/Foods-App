import React, { useState, useEffect, useContext } from "react";
import Search from "../../Search/Search";
import Navigation from "../../Navigation/Navigation";
import MealItem from "../MealItem/MealItem";
import {AppContext} from '../../../store/Store';


const FoodCategory = ({match}) => {
  const [filteredMeals, setFilteredMeals] = useState([]);
  const {meals} = useContext(AppContext);

  useEffect(() => {
    const filteredByCategories = meals.filter(item => item.typeOfMeal === match.params.foodCategory);
    setFilteredMeals(filteredByCategories)
  }, [meals, match.params.foodCategory]);

  const mealList = filteredMeals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      fat={meal.fat}
      protein={meal.protein}
      carbs={meal.carbs}
      typeOfMeal={meal.typeOfMeal}
      src={meal.src}
      difficulty={meal.difficulty}
      time={meal.time}
    />
  ));
 
  return (
    <>
      <Search />

      <div className="FoodCategory">
        <h1 className="FoodCategory__header">{match.params.foodCategory}</h1>
        <ul className="FoodCategory__list">{mealList}</ul>
      </div>

      <Navigation />
    </>
  );
};

export default FoodCategory;
