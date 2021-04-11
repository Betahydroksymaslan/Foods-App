import React, { useState, useEffect, useRef,useContext } from "react";
import firebase from "../../assets/firebase/firebase";
import "firebase/database";
import foodPlate from "../../assets/images/foodPlate.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import favouriteIcon from "../../assets/images/favouriteHeart.svg";
import {AppContext} from '../../store/Store';
import gsap from "gsap";
import ingredientsPhoto from "../../assets/images/dinner/ingredientsPhoto.jpg";
import foodPhoto2 from "../../assets/images/dinner/foodPhoto2.jpg";
import foodPhoto3 from "../../assets/images/dinner/phadThai.jpg";



const MealPage = ({ match }) => {
  const [meal, setMeal] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [recipe, setRecipe] = useState([]);
  const [favouriteValue, setFavouriteValue] = useState();
  let favouriteBox = useRef(null);
  let mealPage = useRef(null);
  const history = useHistory();
  const { currentUser} = useContext(AppContext);
  
  const countTotalCalories = (protein, carbs, fat) => {
    return protein * 4 + carbs * 4 + fat * 9;
  };

  const handleAddingToFavourite = () => {
    if (!favouriteValue) {
      const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });
      tl.fromTo(
        favouriteBox,
        { autoAlpha: 0, y: "+=50px" },
        { duration: 0.8, autoAlpha: 1, y: "0px" }
      );
      tl.fromTo(
        favouriteBox,
        { autoAlpha: 1 },
        { duration: 0.8, autoAlpha: 0, y: "+=50px" },
        "+=1"
      );
      favouriteBox.style.backgroundColor = " rgb(107, 212, 58)";

      meal.map((meal) =>
        firebase
          .database()
          .ref("/users/" + currentUser + "/favourites/" + match.params.name)
          .set({
            id: match.params.name,
            fat: meal.fat,
            protein: meal.protein,
            carbs: meal.carbs,
            typeOfMeal: meal.typeOfMeal,
            src: meal.src,
            difficulty: meal.difficulty,
            time: meal.time,
            favourite: true,
          })
      );
    } else if (favouriteValue) {
      const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });
      tl.fromTo(
        favouriteBox,
        { autoAlpha: 0, y: "+=50px" },
        { duration: 0.8, autoAlpha: 1, y: "0px" }
      );
      tl.fromTo(
        favouriteBox,
        { autoAlpha: 1 },
        { duration: 0.8, autoAlpha: 0, y: "+=50px" },
        "+=1"
      );
      favouriteBox.style.backgroundColor = "red";

      firebase
        .database()
        .ref("/users/" + currentUser + "/favourites/" + match.params.name)
        .remove();
    }
  };
 
  useEffect(() => {

    const favouriteRef = firebase
      .database()
      .ref("/users/" + currentUser + "/favourites/" + match.params.name);
    
    const mealsRef = firebase.database().ref("/meals/" + match.params.name);

    const ingredientsRef = firebase
      .database()
      .ref("/meals/" + match.params.name + "/ingredients");

    const recipeRef = firebase
      .database()
      .ref("/meals/" + match.params.name + "/recipe");

    const watch = () => {
      mealsRef.once("value", (snapshot) => {
        const meal = snapshot.val();
        const mealData = [];
        mealData.push(meal);
        setMeal(mealData);
      });

      ingredientsRef.once("value", (snapshot) => {
        const ingredients = snapshot.val();
        const ingredientsData = [];
        for (let id in ingredients) {
          ingredientsData.push({ id, ...ingredients[id] });
        }
        setIngredients(ingredientsData);
      });

      recipeRef.once("value", (snapshot) => {
        const recipe = snapshot.val();
        const recipeData = [];
        for (let id in recipe) {
          recipeData.push({ id, ...recipe[id] });
        }
        setRecipe(recipeData);
      });

      favouriteRef.on("value", (snapshot) => {
        const favourite = snapshot.val();
        setFavouriteValue(favourite);
      });
  
    };

    gsap.set([mealPage, favouriteBox], { autoAlpha: 0 });

    const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });
    tl.to(mealPage, { duration: 0.4, autoAlpha: 1 });

    watch();
    return () => watch();
  }, [match.params.name, currentUser]);

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

  const ingredientsList = ingredients.map((item) => (
    <div key={item.id} className="MealPage__ingredients">
      <div className="MealPage__ingredientsIcon">
        <img
          src={require(`../../assets/images/${item.typeOfIngredient}Icon.svg`)}
          alt="icon"
          className="MealPage__ingredientsIconImage"
        />
      </div>
      <div className="MealPage__ingredientsValueBox">
        <div className="MealPage__ingredientsName">{item.ingredientName}</div>
        <div className="MealPage__ingredientsValue">
          {item.ingredientQuantity}
          {item.ingredientUnit}
        </div>
      </div>
    </div>
  ));

  const prepareList = recipe.map((item, index) =>
    index === 1 ? (
      <div key={item.id}>
        <div className="MealPage__prepareItemBox">
          <p className="MealPage__prepareItemHeader">{item.recipeName}</p>
          <li className="MealPage__prepareStep">{item.recipeText}</li>
        </div>
        <div className="MealPage__preparePhoto1Wrapper">
          <img src={foodPhoto2} alt="" className="MealPage__preparePhoto1" />
        </div>
      </div>
    ) : (
      <div key={item.id} className="MealPage__prepareItemBox">
        <p className="MealPage__prepareItemHeader">{item.recipeName}</p>
        <li className="MealPage__prepareStep">{item.recipeText}</li>
      </div>
    )
  );

  return (
    <div className="MealPage" ref={(el) => (mealPage = el)}>
      <div className="MealPage__backBox" onClick={() => history.goBack()}>
        <FontAwesomeIcon icon={faArrowLeft} className="MealPage__backIcon" />
      </div>
      <div className="MealPage__circle"></div>
      <img src={foodPlate} alt="foodPlate" className="MealPage__plateImage" />

      <article className="MealPage__content">
        <h1 className="MealPage__header">{match.params.name}</h1>
        <p className="MealPage__smallerHeader">Makroskładniki</p>
        {items}
        <p className="MealPage__smallerHeader">Składniki</p>
        <div className="MealPage__ingredientsBox">{ingredientsList}</div>
        <p className="MealPage__smallerHeader MealPage__smallerHeader--prepare">
          Przygotowanie
        </p>

        <div className="MealPage__ingredientsPhotoWrapper">
          <img
            src={ingredientsPhoto}
            alt="ingredients"
            className="MealPage__ingredientsPhoto"
          />
        </div>

        <div className="MealPage__prepare">
          <ol className="MealPage__prepareList">
            {prepareList}
            <div className="MealPage__preparePhoto1Wrapper">
              <img
                src={foodPhoto3}
                alt=""
                className="MealPage__preparePhoto1"
              />
            </div>
          </ol>
        </div>
      </article>

      {currentUser ? <div
        className="MealPage__addToFavourite"
        onClick={handleAddingToFavourite}
      >
        <img
          src={favouriteIcon}
          alt="favourite"
          className="MealPage__favouriteIcon"
        />
        <p className="MealPage__addToFavouriteText">
          {!favouriteValue ? "Dodaj do ulubionych!" : "Usuń z ulubionych"}
        </p>
      </div> : null}

      <div className="MealPage__dotsWrapper">
        <div className="MealPage__endDots"></div>
      </div>

      <div
        ref={(el) => (favouriteBox = el)}
        className="MealPage__addedToFavouriteBox"
      >
        {favouriteValue ? "Dodano do ulubionych!" : "Usunięto z ulubionych"}
      </div>
    </div>
  );
};

export default MealPage;
