import React, {useState, useEffect} from "react";
import Search from "../../Search/Search";
import Navigation from "../../Navigation/Navigation";
import DinnerItem from "./DinnerItem";
import firebase from "../../../assets/firebase/firebase";
import "firebase/database";



const Dinner = () => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    
    const ref = firebase.database().ref("/meals");
    const watch = () => {
      ref.on("value", (snapshot) => {
        const meals = snapshot.val();
        const newMeals = [];
        for (let id in meals) {
          newMeals.push({ id, ...meals[id] });
        }
        setMeals(newMeals);
      });
    };
    watch();
  }, []);

  const mealList = meals.map((meal, index) => (
    <DinnerItem
      key={index}
      id={meal.id}
      fat={meal.fat}
      protein={meal.protein}
      carbs={meal.carbs}
      calories={meal.calories}
      src={meal.src}
    />
  ));

  return (
    <>
      <Search />

      <div className="Dinner">
        <h1 className="Dinner__header">Obiad</h1>
        <ul className="Dinner__list">
            {mealList}
        </ul>
      </div>

      <Navigation />
    </>
  );
};

export default Dinner;
