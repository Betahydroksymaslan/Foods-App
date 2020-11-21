import React from 'react';


const MacroBox = () => {
    let fatBar = useRef(null);
    let proteinBar = useRef(null);
    let carbsBar = useRef(null);




    return ( 
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
     );
}
 
export default MacroBox;