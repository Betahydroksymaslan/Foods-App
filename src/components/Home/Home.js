import React from "react";
import { ReactComponent as FoodBag } from "../../assets/images/foodBag.svg";
import Navigation from "../Navigation/Navigation";
import Search from "../Search/Search";


const Home = () => {
  

  return (
    <>
      <div className="Home">
        <div className='Home__imageWrpper'>
        <FoodBag className="Home__foodBag" />
        </div>
        <h1 className="Home__header">Witaj na Food Site!</h1>
      </div>
      <Navigation />
      <Search />
    </>
  );
};

export default Home;
