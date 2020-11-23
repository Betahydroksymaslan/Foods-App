import React, { useState } from "react";

const AddMeal = () => {
  const [typeOfMeal, setTypeOfMeal] = useState("Śniadanie");
    const [protein, setProtein] = useState('');
    const [carbs, setCarbs] = useState('');
    const [fat, setFat] = useState('');
    const [ingredientsList, setIngredientsList] = useState([]);
    const [mainPhoto, setMainPhoto] = useState('');
    const [platePhoto, setPlatePhoto] = useState('')

  const [number, setNumber] = useState(2);
  const [quantityIngredients, setQuantityIngredients] = useState([
    { number: 1 },
  ]);
  const [stepNumber, setStepNumber] = useState(2);
  const [quantityRecipes, setQuantityRecipes] = useState([{ number: 1 }]);

  const handleAddingIngredientsBox = () => {
    setQuantityIngredients((prevState) => [...prevState, { number: number }]);
    setNumber((prevState) => prevState + 1);
  };

  const handleAddingRecipeBox = () => {
    setQuantityRecipes((prevState) => [...prevState, { number: stepNumber }]);
    setStepNumber((prevState) => prevState + 1);
  };

  const ingredientsBoxes = quantityIngredients.map((box) => (
    <div key={box.number} className="AddingPanel__ingredientsItemBox">
      <input
        type="text"
        placeholder="Nazwa Składnika"
        className="AddingPanel__ingredientsNameInput"
      />

      <label
        htmlFor="quantity"
        className="AddingPanel__ingredientsQuantityLabel"
      >
        Ilość:
        <input
          type="number"
          id="quantity"
          className="AddingPanel__ingredientsQuantityInput"
        />
        <select
          name="weightSelect"
          id="weightSelect"
          className="AddingPanel__weightSelect"
        >
          <option value="g">g</option>
          <option value="ml">ml</option>
        </select>
      </label>
    </div>
  ));

  const recipeBoxes = quantityRecipes.map((box) => (
    <div key={box.number} className="AddingPanel__recipeItemBox">
      <input
        type="text"
        value={`Krok ${box.number}`}
        placeholder="Zmień nazwę kroku"
        className="AddingPanel__recipeNameInput"
      />
      <label htmlFor="recipe" className="AddingPanel__recipeLabel"></label>
      Wpisz treść kroku {box.number}
      <textarea id="recipe" className="AddingPanel__recipeTextInput" />
    </div>
  ));

  return (
    <div className="AddingPanel">
      <h1 className="AddingPanel__header">Dodaj Posiłek</h1>
      <form className="AddingPanel__form">
        <label htmlFor="typeOfMeal" className="AddingPanel__selectLabel">
          Gdzie dodać posiłek?
        </label>
        <select
            value={typeOfMeal}
            onChange={e => setTypeOfMeal(e.target.value)}
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
          value={protein}
          onChange={e => setProtein(e.target.value)}
            type="number"
            id="protein"
            className="AddingPanel__proteinInput"
          />
          g
        </label>

        <label htmlFor="carbs" className="AddingPanel__carbsLabel">
          Węglowodany :
          <input 
          value={carbs} 
          onChange={e => setCarbs(e.target.value)} type="number" id="carbs" className="AddingPanel__carbsInput" />
          g
        </label>

        <label htmlFor="fat" className="AddingPanel__fatLabel">
          Tłuszcz :
          <input 
          value={fat} onChange={e => setFat(e.target.value)} type="number" id="fat" className="AddingPanel__fatInput" />g
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
          ../../../assets/images/{typeOfMeal}/
          <input
          value={mainPhoto}
          onChange={e => setMainPhoto(e.target.value)}
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
          ../../assets/images/
          <input
          value={platePhoto}
          onChange={e => setPlatePhoto(e.target.value)}
            type="text"
            placeholder="zdjęcie talerza"
            className="AddingPanel__photoPlateName"
          />
          .png
        </label>
      </form>
    </div>
  );
};

export default AddMeal;
