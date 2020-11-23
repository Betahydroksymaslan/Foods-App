import React, { useRef, useEffect, useState } from "react";
import { ReactComponent as Favourite } from "../../../assets/images/favourite.svg";
import { Link } from "react-router-dom";
import MacroBox from "../../MacroBox/MacroBox";


const DinnerItem = ({ id, protein, fat, carbs, src }) => {
  const imageRef = useRef(null);
  const [star, setStar] = useState(false);

  useEffect(() => {
    const [elements] = imageRef.current.children;

    const starFill = elements.querySelector(".starFill");
    const starRec = elements.querySelector(".starRec");

    star ? (starFill.style.fill = "#fcca03") : (starFill.style.fill = "none");
    star ? (starRec.style.fill = "#fcca03") : (starRec.style.fill = "white");
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
        <MacroBox protein={protein} fat={fat} carbs={carbs}/>
      </div> 
    </Link>
  );
};

export default DinnerItem;
