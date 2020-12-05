import React, { useState, useReducer } from "react";
import * as firebase from "firebase/app";
import "firebase/database";

const initialState = {
  nameOfMeal: "",
  typeOfMeal: "breakfast",
  protein: "",
  carbs: "",
  fat: "",
  mainPhoto: "",
  platePhoto: "",
  ingredients: [
    {
      ingredientName: "",
      ingredientQuantity: "",
      ingredientUnit: "g",
      ingredientId: 0,
    },
  ],
  recipes: [{ recipeName: "Krok 1", recipeText: "", recipeId: 0 }],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "INPUT_VALUE":
      return {
        ...state,
        [action.name]: action.value,
      };
    case "ADD_INGREDIENT_BOX":
      return {
        ...state,
        ingredients: [
          ...state.ingredients,
          {
            ingredientName: "",
            ingredientQuantity: "",
            ingredientUnit: "g",
            ingredientId: action.number,
          },
        ],
      };
    case "GET_INGREDIENT_BOX_VALUE":
      const { ingredients } = state;
      ingredients[action.index] = {
        ...ingredients[action.index],
        [action.name]: action.value,
      };
      return {
        ...state,
        ingredients: [...ingredients],
      };
    case "ADD_RECIPE_BOX":
      return {
        ...state,
        recipes: [
          ...state.recipes,
          {
            recipeName: `Krok ${action.id + 1}`,
            recipeText: "",
            recipeId: action.id,
          },
        ],
      };
    case "GET_RECIPE_BOX_VALUE":
      const { recipes } = state;
      recipes[action.id] = {
        ...recipes[action.id],
        [action.name]: action.value,
      };
      return {
        ...state,
        recipes: [...recipes],
      };
  }
};

const AddMeal = () => {
  const [number, setNumber] = useState(1);
  const [stepNumber, setStepNumber] = useState(1);
  const [state, dispatch] = useReducer(reducer, initialState);

  console.log(state);

  const handleAddingIngredientsBox = () => {
    setNumber((prevState) => prevState + 1);
    dispatch({ type: "ADD_INGREDIENT_BOX", number: number });
  };

  const handleAddingRecipeBox = () => {
    setStepNumber((prevState) => prevState + 1);
    dispatch({ type: "ADD_RECIPE_BOX", id: stepNumber });
  };

  const ingredientsBoxes = state.ingredients.map((box) => (
    <div key={box.ingredientId} className="AddingPanel__ingredientsItemBox">
      <input
        required
        name="ingredientName"
        value={state.ingredients[box.ingredientId].ingredientName}
        onChange={(e) =>
          dispatch({
            type: "GET_INGREDIENT_BOX_VALUE",
            value: e.target.value,
            index: box.ingredientId,
            name: e.target.name,
          })
        }
        type="text"
        placeholder="Nazwa Składnika"
        className="AddingPanel__ingredientsNameInput"
      />

      <label className="AddingPanel__ingredientsQuantityLabel">
        Ilość:
        <input
          required
          name="ingredientQuantity"
          value={state.ingredients[box.ingredientId].ingredientQiantity}
          onChange={(e) =>
            dispatch({
              type: "GET_INGREDIENT_BOX_VALUE",
              value: e.target.value,
              index: box.ingredientId,
              name: e.target.name,
            })
          }
          type="number"
          id="quantity"
          className="AddingPanel__ingredientsQuantityInput"
        />
        <select
          value={state.ingredients[box.ingredientId].ingredientUnit}
          onChange={(e) =>
            dispatch({
              type: "GET_INGREDIENT_BOX_VALUE",
              value: e.target.value,
              index: box.ingredientId,
              name: e.target.name,
            })
          }
          name="ingredientUnit"
          id="weightSelect"
          className="AddingPanel__weightSelect"
        >
          <option value="g">g</option>
          <option value="ml">ml</option>
        </select>
      </label>
    </div>
  ));

  const recipeBoxes = state.recipes.map((box) => (
    <div key={box.recipeId} className="AddingPanel__recipeItemBox">
      <input
        type="text"
        name="recipeName"
        value={state.recipes[box.recipeId].recipeName}
        onChange={(e) =>
          dispatch({
            type: "GET_RECIPE_BOX_VALUE",
            name: e.target.name,
            value: e.target.value,
            id: box.recipeId,
          })
        }
        placeholder="Zmień nazwę"
        className="AddingPanel__recipeNameInput"
      />
      <label htmlFor="recipe" className="AddingPanel__recipeLabel"></label>
      Wpisz treść
      <textarea
        required
        id="recipe"
        name="recipeText"
        value={state.recipes[box.recipeId].recipeText}
        onChange={(e) =>
          dispatch({
            type: "GET_RECIPE_BOX_VALUE",
            name: e.target.name,
            value: e.target.value,
            id: box.recipeId,
          })
        }
        className="AddingPanel__recipeTextInput"
      />
    </div>
  ));

  const handleChange = (e) =>
    dispatch({
      type: "INPUT_VALUE",
      value: e.target.value,
      name: e.target.name,
    });

  const SubmitForm = (e) => {
    //e.preventDefault();
    const {nameOfMeal , protein, fat, carbs, mainPhoto, platePhoto, ingredients, recipes} = state;
    //const copyOfIngredients = [];
    

    firebase.database().ref('/meals/' + nameOfMeal).set({
      protein: parseInt(protein),
      carbs: parseInt(carbs),
      fat: parseInt(fat),
      src: mainPhoto,
      platePhoto: platePhoto,
      ingredients: ingredients,
      recipe: recipes,
    });
  };

  return (
    <div className="AddingPanel">
      <h1 className="AddingPanel__header">Dodaj Posiłek</h1>
      <form className="AddingPanel__form">
        <input type="text" name="nameOfMeal" value={state.nameOfMeal} onChange={handleChange} required className="AddingPanel__nameOfMeal" placeholder="Nazwa potrawy"/>
        <label htmlFor="typeOfMeal" className="AddingPanel__selectLabel">
          Gdzie dodać posiłek?
        </label>
        <select
          value={state.typeOfMeal}
          onChange={handleChange}
          name="typeOfMeal"
          id="typeOfMeal"
          className="AddingPanel__selectTypeOfMeal"
        >
          <option value="breakfast">Breakfast</option>
          <option value="dinner">Dinner</option>
          <option value="supper">Supper</option>
          <option value="snacks">Snacks</option>
        </select>

        <label htmlFor="protein" className="AddingPanel__proteinLabel">
          Białko :
          <input
            required
            name="protein"
            value={state.protein}
            onChange={handleChange}
            type="number"
            id="protein"
            className="AddingPanel__proteinInput"
          />
          g
        </label>

        <label htmlFor="carbs" className="AddingPanel__carbsLabel">
          Węglowodany :
          <input
            required
            name="carbs"
            value={state.carbs}
            onChange={handleChange}
            type="number"
            id="carbs"
            className="AddingPanel__carbsInput"
          />
          g
        </label>

        <label htmlFor="fat" className="AddingPanel__fatLabel">
          Tłuszcz :
          <input
            required
            value={state.fat}
            onChange={handleChange}
            name="fat"
            type="number"
            id="fat"
            className="AddingPanel__fatInput"
          />
          g
        </label>

        <h3 className="AddingPanel__ingredientsHeader">Składniki:</h3>

        {ingredientsBoxes}

        <div
          className="AddingPanel__addAnotherIngredientsItemBox"
          onClick={handleAddingIngredientsBox}
        >
          +
        </div>

        <h3 className="AddingPanel__recipeHeader">Przepis:</h3>

        {recipeBoxes}
        <div
          className="AddingPanel__addAnotherRecipeItemBox"
          onClick={handleAddingRecipeBox}
        >
          +
        </div>

        <h3 className="AddingPanel__recipeHeader">Zdjęcia:</h3>

        <label
          htmlFor="photoOnMealBox"
          className="AddingPanel__photoOnMealBoxLabel"
        >
          ../../../assets/images/{state.typeOfMeal}/
          <input
            required
            value={state.mainPhoto}
            onChange={handleChange}
            name="mainPhoto"
            type="text"
            placeholder="zdjęcie główne"
            className="AddingPanel__photoOnMealBoxName"
          />
          .jpg
        </label>

        <label
          htmlFor="photoOnMealBox"
          className="AddingPanel__photoPlateLabel"
        >
          ../../assets/images/{state.typeOfMeal}/
          <input
            required
            value={state.platePhoto}
            onChange={handleChange}
            name="platePhoto"
            type="text"
            placeholder="zdjęcie talerza"
            className="AddingPanel__photoPlateName"
          />
          .png
        </label>
        <button className="AddingPanel__submitButton" onClick={SubmitForm}>
          Dodaj
        </button>
      </form>
    </div>
  );
};

export default AddMeal;
