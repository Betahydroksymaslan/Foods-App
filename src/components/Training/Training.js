import React, { useState, useEffect } from "react";
import Search from "../Search/Search";
import Navigation from "../Navigation/Navigation";
import firebase from "../../assets/firebase/firebase";
import "firebase/database";

const Training = () => {
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
    ;
  }, []);

  console.log(meals);
  const mealList = meals.map((meal, index) => (
    <Item
      key={index}
      id={meal.id}
      fat={meal.fat}
      protein={meal.protein}
      carbs={meal.carbs}
    />
  ));
  return (
    <>
      <div className="Training" style={{ paddingTop: "30%" }}>
        {meals ? mealList : null}
      </div>
      <Search />
      <Navigation />
    </>
  );
};

export default Training;

const Item = ({ id, fat, carbs, protein }) => {
  return (
    <div style={{ paddingTop: 10 }}>
      <h2>{id}</h2>
      <li>fat: {fat}</li>
      <li>protein: {protein}</li>
      <li>carbs: {carbs}</li>
    </div>
  );
};
