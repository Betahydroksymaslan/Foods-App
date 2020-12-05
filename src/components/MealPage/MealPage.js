import React, { useState, useEffect } from "react";
import firebase from "../../assets/firebase/firebase";
import "firebase/database";
import foodPlate from "../../assets/images/foodPlate.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import ingredientIcon from '../../assets/images/fatIcon.svg';

const MealPage = ({ match }) => {
  const [meal, setMeal] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [recipe, setRecipe] = useState([]);
  

  const history = useHistory();

  const countTotalCalories = (protein, carbs, fat) => {
    return protein * 4 + carbs * 4 + fat * 9;
  };

  useEffect(() => {
    const mealsRef = firebase.database().ref("/meals/" + match.params.name);

    const ingredientsRef = firebase
      .database()
      .ref("/meals/" + match.params.name + "/ingredients");

      const recipeRef = firebase.database().ref("/meals/" + match.params.name + "/recipe");

    const watch = () => {
      mealsRef.on("value", (snapshot) => {
        const meal = snapshot.val();
        const mealData = [];
        mealData.push(meal);
        setMeal(mealData);
      });

      ingredientsRef.on("value", (snapshot) => {
        const ingredients = snapshot.val();
        const ingredientsData = [];
        for (let id in ingredients) {
          ingredientsData.push({ id, ...ingredients[id] });
        }
        setIngredients(ingredientsData);
      });

      recipeRef.on("value", (snapshot) => {
        const recipe = snapshot.val();
        const recipeData = [];
        for (let id in recipe) {
          recipeData.push({ id, ...recipe[id] });
        }
        setRecipe(recipeData);
      });
    };
    
    watch();
    
  }, []);

  console.log(ingredients, recipe)
  const items = meal.map((item) => (
    <div key={item.src} className="MealPage__macroBox">
      <div className="MealPage__macro">
        <p className="MealPage__macro-value">
          {countTotalCalories(item.protein, item.carbs, item.fat)}
        </p>
        <p className="MealPage__macro-label">Kalorie</p>
        <p className="MealPage__macro-unit">kcal</p>
      </div>
      <div className="MealPage__macro">
        <p className="MealPage__macro-value">{item.protein}</p>
        <p className="MealPage__macro-label">Białko</p>
        <p className="MealPage__macro-unit">g</p>
      </div>
      <div className="MealPage__macro">
        <p className="MealPage__macro-value">{item.carbs}</p>
        <p className="MealPage__macro-label">Węgle</p>
        <p className="MealPage__macro-unit">g</p>
      </div>
      <div className="MealPage__macro">
        <p className="MealPage__macro-value">{item.fat}</p>
        <p className="MealPage__macro-label">Tłuszcz</p>
        <p className="MealPage__macro-unit">g</p>
      </div>
    </div>
  ));
  
  const ingredientsList = ingredients.map(item => (
      <div key={item.id} className="MealPage__ingredients">
          <div className="MealPage__ingredientsIcon">
              <img src={ingredientIcon} alt="icon" className="MealPage__ingredientsIconImage"/>
          </div>
          <div className="MealPage__ingredientsValueBox">
          <div className="MealPage__ingredientsName">{item.ingredientName}</div>
          <div className="MealPage__ingredientsValue">{item.ingredientQuantity}{item.ingredientUnit}</div>
          </div>
      </div>
  ))
  
  const prepareList = recipe.map(item => (
      <div key={item.id} className="MealPage__prepareItemBox">
      <p className="MealPage__prepareItemHeader">{item.recipeName}</p>
      <li className="MealPage__prepareStep">{item.recipeText}</li>
      </div>
  ))
  
  
  return (
    <div className="MealPage">
      <div className="MealPage__backBox" onClick={() => history.goBack()}>
      <FontAwesomeIcon
        icon={faArrowLeft}
        className="MealPage__backIcon"
      />
      </div>
      <div className="MealPage__circle"></div>
      <img src={foodPlate} alt="foodPlate" className="MealPage__plateImage" />

      <article className="MealPage__content">
        <h1>{match.params.name}</h1>
        <p className="MealPage__smallerHeader">Makroskładniki</p>
        {items}
        <p className="MealPage__smallerHeader">Składniki</p>
        <div className="MealPage__ingredientsBox">{ingredientsList}</div>
        <p className="MealPage__smallerHeader MealPage__smallerHeader--prepare">Przygotowanie</p>
        <div className="MealPage__prepare">
          <ol className="MealPage__prepareList">
            {prepareList}
          </ol>
      </div>
      </article>
    </div>
  );
};

export default MealPage;
