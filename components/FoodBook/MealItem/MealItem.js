import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import clockIcon from "../../../assets/images/clockIcon.svg";
import { ReactComponent as DifficultyIcon } from "../../../assets/images/difficultyIcon.svg";


const MealItem = ({ id, src, typeOfMeal, time, difficulty }) => {
  let mealItem = useRef(null);
  const difficultyIco = useRef(null);
  
  

  useEffect(() => {
    const [difficulties] = difficultyIco.current.children;

    gsap.set(mealItem, { autoAlpha: 0 });

    const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });
    tl.to(mealItem, { duration: 0.6, autoAlpha: 1 });

    const easy = difficulties.querySelector("#easy");
    easy.style.fill = "#00cc44";
    const medium = difficulties.querySelector("#medium");
    medium.style.fill = difficulty !== "Łatwe" ? "#ffcc00" : "#ffffff";
    const hard = difficulties.querySelector("#hard");
    hard.style.fill = difficulty === "Trudne" ? "#ff4d4d" : "#ffffff";
  });
  
  return (
    <Link
      to={`/foodBook/${typeOfMeal}/${id}`}
      className="MealItem"
      ref={(el) => (mealItem = el)}
    >
      <div className="MealItem__imageWrapper">
        <h2 className="MealItem__name">{id}</h2>
        <img
          src={require(`../../../assets/images/${typeOfMeal}/${src}.jpg`)}
          alt={id}
          className="MealItem__image"
        />
      </div>

      <div className="MealItem__infoWrapper">
        

        <div className="MealItem__clockWrapper">
          <img src={clockIcon} alt="" className="MealItem__clockIcon" />
          <p className="MealItem__timeText">- {time}min</p>
        </div>

        <div className="MealItem__dificultyWrapper">
          <div className="MealItem__difficultyIconWrapper" ref={difficultyIco}>
            <DifficultyIcon className="MealItem__difficulty" />
          </div>
          <p className="MealItem__dificultyText">- {difficulty}</p>
        </div>
      </div>
    </Link>
  );
};

export default MealItem;
