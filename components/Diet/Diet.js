import React, { useEffect, useRef } from "react";
import "firebase/database";
import { useHistory, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCog, faTimes } from "@fortawesome/free-solid-svg-icons";
import gsap from "gsap";
import dietImage from "../../assets/images/dietBGC.jpg";

const Diet = () => {
  let breakfastBox = useRef(null);
  let secondBreakfastBox = useRef(null);
  let lunchBox = useRef(null);
  let dinnerBox = useRef(null);
  let supperBox = useRef(null);
  let snacksBox = useRef(null);
  let breakfastList = useRef(null);
  let secondBreakfastList = useRef(null);
  let lunchList = useRef(null);
  let dinnerList = useRef(null);
  let supperList = useRef(null);
  let snacksList = useRef(null);
  let boxRef = useRef(null);
  let listRef = useRef(null);
  const mealBoxes = [
    { typeOfMeal: "ŚNIADANIE", boxRef: breakfastBox, listRef: breakfastList },
    {
      typeOfMeal: "II ŚNIADANIE",
      boxRef: secondBreakfastBox,
      listRef: secondBreakfastList,
    },
    { typeOfMeal: "LUNCH", boxRef: lunchBox, listRef: lunchList },
    { typeOfMeal: "OBIAD", boxRef: dinnerBox, listRef: dinnerList },
    { typeOfMeal: "KOLACJA", boxRef: supperBox, listRef: supperList },
    { typeOfMeal: "PRZEKĄSKA", boxRef: snacksBox, listRef: snacksList },
  ];
  let page = useRef(null);
  const history = useHistory();

  const slideBox = (boxItem, listItem) => {
    if  (listItem) {
      const tl = gsap.timeline(
      { reversed: true, paused: true },
      { defaults: { ease: "power3.inOut" } }
    );

    tl.to(boxItem, { height: "auto", duration: 0.3 }).from(
      listItem,
      { autoAlpha: 0, duration: 0.3 },
      "-=0.1"
    );
    const toggle = () => {
      tl.reversed() ? tl.play() : tl.reverse();
    };

    boxItem.addEventListener("click", toggle);}
  };

  const listOfMealBoxes = mealBoxes.map((item) => (
    <div
      key={item.typeOfMeal}
      onClick={() => slideBox(boxRef, listRef)}
      className="Diet__mainWrapper"
      ref={(el) => (boxRef = el)}
    >
      <div className="Diet__infoWrapper">
        <p className="Diet__infoNameBox">{item.typeOfMeal}</p>
        <div className="Diet__infoCaloriesBox">450</div>
        <div className="Diet__infoProteinBox">24</div>
        <div className="Diet__infoCarbsBox">58</div>
        <div className="Diet__infoFatBox">17</div>
      </div>
      <div className="list" ref={(el) => (listRef = el)}>
        <div className="itemBox">
          <p className="itemName">Szynka</p>
          <p className="itemG">120g</p>
          <p className="itemCalories">45 kcal</p>
          <p className="itemProtein">54</p>
          <p className="itemCarbs">85</p>
          <p className="itemFat">15</p>
          <FontAwesomeIcon icon={faTimes} className="itemRemove" />
        </div>
        <div className="itemBox">
          <p className="itemName">Kukurydza</p>
          <p className="itemG">120g</p>
          <p className="itemCalories">45 kcal</p>
          <p className="itemProtein">54</p>
          <p className="itemCarbs">85</p>
          <p className="itemFat">15</p>
          <FontAwesomeIcon icon={faTimes} className="itemRemove" />
        </div>
        <div className="itemBox">
          <p className="itemName">Białko serwatkowe WPC</p>
          <p className="itemG">120g</p>
          <p className="itemCalories">45 kcal</p>
          <p className="itemProtein">54</p>
          <p className="itemCarbs">85</p>
          <p className="itemFat">15</p>
          <FontAwesomeIcon icon={faTimes} className="itemRemove" />
        </div>

        <div className="Diet__addProduct">+</div>
      </div>
    </div>
  ));

  useEffect(() => {
    const tlPage = gsap.timeline({ defaults: { ease: "power3.inOut" } });
    tlPage.to(page, { duration: 0.3, autoAlpha: 1 });

    
  }, []);

  return (
    <div className="Diet" ref={(el) => (page = el)}>
      <div className="Diet__backBox" onClick={() => history.goBack()}>
        <FontAwesomeIcon icon={faArrowLeft} className="Diet__backIcon" />
      </div>

      <Link to="/diet/dailygoals">
        <FontAwesomeIcon icon={faCog} className="Diet__options" />
      </Link>

      <img src={dietImage} alt="" className="Diet__headerImage" />

      <h1 className="Diet__header">Plan Diety</h1>

      <div className="Diet__mainContentWrapper">{listOfMealBoxes}</div>

      <div className="Diet__macroWrpper">
        <div className="Diet__caloriesBox">
          <div className="Diet__bar">
            <div className="Diet__caloriesBarDark"></div>
          </div>
          <div className="Diet__caloriesValue">k: 2500</div>
        </div>
        <div className="Diet__proteinBox">
          <div className="Diet__bar">
            <div className="Diet__proteinBarDark"></div>
          </div>
          <div className="Diet__proteinValue">B: 180</div>
        </div>
        <div className="Diet__carbsBox">
          <div className="Diet__bar">
            <div className="Diet__carbsBarDark"></div>
          </div>
          <div className="Diet__carbsValue">W: 300</div>
        </div>
        <div className="Diet__fatBox">
          <div className="Diet__bar">
            <div className="Diet__fatBarDark"></div>
          </div>
          <div className="Diet__fatValue">T: 89</div>
        </div>
      </div>
    </div>
  );
};

export default Diet;
