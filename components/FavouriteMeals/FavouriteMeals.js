import React, { useContext } from "react";
import Navigation from "../Navigation/Navigation";
import Search from "../Search/Search";
import MealItem from "../FoodBook/MealItem/MealItem";
import { ReactComponent as EmptyList } from "../../assets/images/emptyList.svg";
import {AppContext} from '../../store/Store';


const FavouriteMeals = () => {
  const {favouriteMeals} = useContext(AppContext);

  const favouriteMealsList = favouriteMeals.map((item) => (
    <MealItem
      key={item.id}
      id={item.id}
      fat={item.fat}
      protein={item.protein}
      carbs={item.carbs}
      typeOfMeal={item.typeOfMeal}
      src={item.src}
      difficulty={item.difficulty}
      time={item.time}
    />
  ));

  

  return (
    <>
      <Search />
      <div className="FavouriteMeals">
        <h1 className="FavouriteMeals__header">Ulubione</h1>
        {favouriteMeals[0] ? (
          <ul className="FavouriteMeals__listOfFavourites">
            {favouriteMealsList}
          </ul>
        ) : (
          <div className="FavouriteMeals__emptyListWrapper">
            <EmptyList className="FavouriteMeals__emptyListImage" />
            
          </div>
        )}
      </div>
      <Navigation />
    </>
  );
};

export default FavouriteMeals;
