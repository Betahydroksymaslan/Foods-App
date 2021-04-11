import React, { useEffect, useRef } from "react";
import Navigation from "../Navigation/Navigation";
import Search from "../Search/Search";
import gsap from "gsap";
import snacksImage from "../../assets/images/snacks/snacksImage.jpg";
import dinnerImage from "../../assets/images/dinner/dinnerImage.jpg";
import supperImage from "../../assets/images/supper/supperImage.jpg";
import breakfastImage from "../../assets/images/breakfast/breakfastImage.jpg";
import { Link } from "react-router-dom";

const FoodBook = () => {
  let componentWrapper = useRef(null);

  useEffect(() => {
    gsap.set(componentWrapper, { autoAlpha: 0 });

    const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });
    tl.fromTo(
      componentWrapper,
      { y: "+=10px" },
      { duration: 0.5, y: "-=10px", autoAlpha: 1 }
    );
  });

  return (
    <>
      <div ref={(el) => (componentWrapper = el)} className="FoodBook">
        <h1 className="FoodBook__header">Food Book</h1>
        <div className="FoodBook__foodCategoriesBox">
          
          <Link to='/foodBook/breakfast' className="FoodBook__foodCategory FoodBook__foodCategory--tittle-breakfast">
            <img
              src={breakfastImage}
              alt="Breakfast"
              className="FoodBook__foodCategory--breakfast"
            />
          </Link>

          <Link to='/foodBook/dinner' className="FoodBook__foodCategory FoodBook__foodCategory--tittle-dinner">
            
              <img
                src={dinnerImage}
                alt="Dinner"
                className="FoodBook__foodCategory--dinner"
              />
            
          </Link>

          <Link to='/foodBook/supper' className="FoodBook__foodCategory FoodBook__foodCategory--tittle-supper">
            <img
              src={supperImage}
              alt="Supper"
              className="FoodBook__foodCategory--supper"
            />
          </Link>

          <Link to='/foodBook/snacks' className="FoodBook__foodCategory FoodBook__foodCategory--tittle-snacks">
            <img
              src={snacksImage}
              alt="Snacks"
              className="FoodBook__foodCategory--snacks"
            />
          </Link>

          <Link to='/foodBook/snacks' className="FoodBook__foodCategory FoodBook__foodCategory--tittle-snacks">
            <img
              src={snacksImage}
              alt="Snacks"
              className="FoodBook__foodCategory--snacks"
            />
          </Link>
          
        </div>
      </div>
      <Navigation />
      <Search />
    </>
  );
};

export default FoodBook;
