import React, { useEffect, useRef } from "react";
import fatIcon from "../../assets/images/fatIcon.svg";
import carbsIcon from "../../assets/images/carbsIcon.svg";
import proteinIcon from "../../assets/images/proteinIcon.svg";


const MacroBox = ({protein, fat, carbs}) => {
  let fatBar = useRef(null);
  let proteinBar = useRef(null);
  let carbsBar = useRef(null);

  /* !!! Formula for calculating calories per 100 grams !!! */

  const recountMacro = (mainMacro, secondMacro, thirdMacro) => {
    return Math.round(
      (100 * mainMacro) / (mainMacro + secondMacro + thirdMacro)
    );
  };

 

  /* !!! Formula for calculating calories per one portion !!! */

  const countTotalCalories = (protein, carbs, fat) => {
    return protein * 4 + carbs * 4 + fat * 9;
  };

  

  useEffect(() => {
    console.log(fat, protein, carbs)
    
    fatBar.style.width = `${recountMacro(fat, protein, carbs) * 1.3}%`;
    proteinBar.style.width = `${recountMacro(protein, fat, carbs) * 1.3}%`;
    carbsBar.style.width = `${recountMacro(carbs, fat, protein) * 1.3}%`;
    
    console.log(fat, protein, carbs)
  }, []);

  return (
    <div className="MacroBox">
      <p className="MacroBox__kcalValue">
        {countTotalCalories(protein, carbs, fat) + " kcal"}
      </p>
      <img src={proteinIcon} alt="Fat" className="MacroBox__fatLabel" />
      <div
        ref={(el) => (proteinBar = el)}
        className="MacroBox__proteinBar"
      ></div>
      <img src={carbsIcon} alt="Fat" className="MacroBox__fatLabel" />
      <div ref={(el) => (carbsBar = el)} className="MacroBox__carbsBar"></div>
      <img src={fatIcon} alt="Fat" className="MacroBox__fatLabel" />
      <div ref={(el) => (fatBar = el)} className="MacroBox__fatBar"></div>
    </div>
  );
};

export default MacroBox;


