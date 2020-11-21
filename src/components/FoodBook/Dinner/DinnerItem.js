import React, { useRef, useEffect, useState } from "react";
import { ReactComponent as Favourite } from "../../../assets/images/favourite.svg";
import { Link } from "react-router-dom";
import fatIcon from "../../../assets/images/fatIcon.svg";
import carbsIcon from "../../../assets/images/carbsIcon.svg";
import proteinIcon from "../../../assets/images/proteinIcon.svg";

/* !!! Formula for calculating calories per 100 grams !!! */

const recountMacro = (mainMacro, secondMacro, thirdMacro) => {
  return Math.round((100 * mainMacro) / (mainMacro + secondMacro + thirdMacro));
};

/* !!! End formula for calculating calories per 100 grams !!! */

/* !!! Formula for calculating calories per one portion !!! */

const countTotalCalories = (protein, carbs, fat) => {
  return protein * 4 + carbs * 4 + fat * 9;
};

/* !!! End formula for calculating calories per one portion !!! */

const DinnerItem = ({ id, protein, fat, carbs, src }) => {
  const imageRef = useRef(null);
  let fatBar = useRef(null);
  let proteinBar = useRef(null);
  let carbsBar = useRef(null);
  const [star, setStar] = useState(false);

  useEffect(() => {
    const [elements] = imageRef.current.children;

    const starFill = elements.querySelector(".starFill");
    const starRec = elements.querySelector(".starRec");

    star ? (starFill.style.fill = "#fcca03") : (starFill.style.fill = "none");
    star ? (starRec.style.fill = "#fcca03") : (starRec.style.fill = "white");

    fatBar.style.width = `${recountMacro(fat, protein, carbs) * 1.3}%`;
    proteinBar.style.width = `${recountMacro(protein, fat, carbs) * 1.3}%`;
    carbsBar.style.width = `${recountMacro(carbs, fat, protein) * 1.3}%`;
  });

  return (
    <Link to={`/foodBook/dinner/${id}`} className="DinnerItem">
      <div className="DinnerItem">
        <div
          ref={imageRef}
          onClick={() => setStar(!star)}
          className="DinnerItem__favourite"
        >
          <Favourite />
        </div>
        <img
          src={require(`../../../assets/images/dinner/${src}.jpg`)}
          alt={id}
          className="DinnerItem__image"
        />
        <h2 className="DinnerItem__name">{id}</h2>

        <div className="DinnerItem__macro-box">
          <p className="DinnerItem__kcalValue">
            {countTotalCalories(protein, carbs, fat) + " kcal"}
          </p>
          <img src={proteinIcon} alt="Fat" className="DinnerItem__fatLabel" />
          <div
            ref={(el) => (proteinBar = el)}
            className="DinnerItem__proteinBar"
          ></div>
          <img src={carbsIcon} alt="Fat" className="DinnerItem__fatLabel" />
          <div
            ref={(el) => (carbsBar = el)}
            className="DinnerItem__carbsBar"
          ></div>
          <img src={fatIcon} alt="Fat" className="DinnerItem__fatLabel" />
          <div ref={(el) => (fatBar = el)} className="DinnerItem__fatBar"></div>
        </div>
      </div>
    </Link>
  );
};

export default DinnerItem;
