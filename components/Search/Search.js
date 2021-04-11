import React, { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import firebase from "../../assets/firebase/firebase";
import "firebase/database";
import MealItem from "../FoodBook/MealItem/MealItem";

const Search = () => {
  const wrapper = useRef(null);

  const [inputFocused, setInputFocused] = useState(false);
  const [meals, setMeals] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const searchPageHandle = () => {
    setInputFocused(true);
  };

  const exitHandle = () => {
    setInputFocused(false);
    setInputValue('');
  }

  const foundItems = meals.filter((item) => {
    if (inputValue) {
      return item.id.includes(inputValue);
    } else return;
  });

  const foundItem = foundItems.map((item) => (
    <MealItem
      key={item.id}
      id={item.id}
      src={item.src}
      time={item.time}
      difficulty={item.difficulty}
      typeOfMeal={item.typeOfMeal}
    />
  ));

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
    return watch();
  }, []);

  return (
    <>
      {inputFocused ? (
        <div className="Search__pageWrapper">
          <div className="Search__exit" onClick={exitHandle}>
            <FontAwesomeIcon className="Search__exitIcon" icon={faTimes} />
          </div>
          <ul className="Dinner__list">{foundItem}</ul>
        </div>
      ) : null}
      <div className={inputFocused ? "Search Search--focused" : "Search"}>
        <input
          ref={wrapper}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value.toLowerCase())}
          type="search"
          placeholder="Czego szukasz?"
          className="Search__input"
          onClick={searchPageHandle}
        />
        <FontAwesomeIcon className="Search__icon" icon={faSearch} />
      </div>
    </>
  );
};

export default Search;
