import React, { useEffect, useState, useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import firebase from "../../../assets/firebase/firebase";
import "firebase/database";
import gsap from "gsap";
import { AppContext } from "../../../store/Store";

const DailyGoals = () => {
  const history = useHistory();

  const [calories, setCalories] = useState(2500);
  const [proteins, setProteins] = useState(27);
  const [carbs, setCarbs] = useState(53);
  const [fat, setFat] = useState(20);
  
  let savedModal = useRef(null);
  let modalBlur = useRef(null);
  
  const summaryPerc = proteins + fat + carbs;
  
  const { userOptions, currentUser } = useContext(AppContext);

  
  const handleChange = (e) => {
    const { value } = e.target;
    setCalories(value);
  };

  const recountMacro = (macro, number) => {
    return Math.floor((calories * (macro * 0.01)) / number);
  };

  const modalAnimation = () => {
    const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });

    tl.to(savedModal, { duration: 0.3, autoAlpha: 1 });
    tl.to(modalBlur, { duration: 0.3, autoAlpha: 1 }, "-=0.3");
  };

  const modalOpenExit = () => {
    const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });

    tl.to(savedModal, { duration: 0.3, autoAlpha: 0 });
    tl.to(modalBlur, { duration: 0.3, autoAlpha: 0 }, "-=0.3");
  };

  const handleSave = () => {
    if (summaryPerc === 100) {
      const ref = firebase
        .database()
        .ref("/users/" + currentUser + "/options")
        .child("macros");
      ref.update({
        calories,
        proteins,
        carbs,
        fat,
      });
      modalAnimation();
    } else {
      console.log("NONE");
    }
  };

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });
    tl.set([savedModal, modalBlur], { autoAlpha: 0 });

    userOptions.map(item => {
      setCarbs(item.carbs)
      setCalories(item.calories)
      setFat(item.fat)
      setProteins(item.proteins)
    });
  }, [userOptions]);

  return (
    <section className="DailyGoals">
      {/* >>>>>>>>>>>>>>> NAVIGATION AREA <<<<<<<<<<<<<<<< */}

      <div className="DailyGoals__navPanel">
        <div onClick={() => history.goBack()}>
          <FontAwesomeIcon icon={faArrowLeft} className="DailyGoals__backBox" />
        </div>
        <p className="DailyGoals__navHeader">Cele dzienne</p>
        <p
          className={
            summaryPerc === 100
              ? "DailyGoals__navSave"
              : "DailyGoals__navSave DailyGoals__navSave--disabled"
          }
          onClick={handleSave}
        >
          Zapisz
        </p>
      </div>

      {/* >>>>>>>>>>>>>>> HEADER AREA <<<<<<<<<<<<<<<< */}

      <header className="DailyGoals__header">Wyznacz swoje cele!</header>

      {/* >>>>>>>>>>>>>>> CALORIES AREA <<<<<<<<<<<<<<<< */}

      <p className="DailyGoals__caloriesTxt">Łączna ilość kalorii:</p>

      <div className="DailyGoals__caloriesValueBox">
        <label htmlFor="" className="DailyGoals__caloriesValueLabel">
          <input
            value={calories}
            onChange={(e) => setCalories(parseInt(e.target.value))}
            name="calories"
            type="number"
            className="DailyGoals__caloriesValueInput"
          />
          kcal
        </label>
      </div>

      {/* >>>>>>>>>>>>>>> PROTEIN AREA <<<<<<<<<<<<<<<< */}

      <p className="DailyGoals__proteinTxt">Białko</p>

      <div className="DailyGoals__proteinValueBox">
        <label htmlFor="" className="DailyGoals__proteinValueLabel">
          <input
            name="proteinValue"
            value={recountMacro(proteins, 4)}
            onChange={handleChange}
            type="number"
            className="DailyGoals__proteinValueInput"
          />
          g
        </label>
      </div>

      <div className="DailyGoals__proteinPercBox">
        <label htmlFor="" className="DailyGoals__proteinPercLabel">
          <input
            value={proteins}
            name="proteins"
            onChange={(e) => setProteins(parseInt(e.target.value))}
            type="number"
            className="DailyGoals__proteinPercInput"
          />
          %
        </label>
      </div>

      {/* >>>>>>>>>>>>>>> CARBS AREA <<<<<<<<<<<<<<<< */}

      <p className="DailyGoals__carbsTxt">Węgl.</p>

      <div className="DailyGoals__carbsValueBox">
        <label htmlFor="" className="DailyGoals__carbsValueLabel">
          <input
            value={recountMacro(carbs, 4)}
            name="carbs"
            onChange={handleChange}
            type="number"
            className="DailyGoals__carbsValueInput"
          />
          g
        </label>
      </div>

      <div className="DailyGoals__carbsPercBox">
        <label htmlFor="" className="DailyGoals__carbsPercLabel">
          <input
            value={carbs}
            name="carbsPerc"
            onChange={(e) => setCarbs(parseInt(e.target.value))}
            type="number"
            className="DailyGoals__carbsPercInput"
          />
          %
        </label>
      </div>

      {/* >>>>>>>>>>>>>>> FAT AREA <<<<<<<<<<<<<<<< */}

      <p className="DailyGoals__fatTxt">Tłuszcze</p>

      <div className="DailyGoals__fatValueBox">
        <label htmlFor="" className="DailyGoals__fatValueLabel">
          <input
            value={recountMacro(fat, 9)}
            name="fatValue"
            onChange={handleChange}
            type="number"
            className="DailyGoals__fatValueInput"
          />
          g
        </label>
      </div>

      <div className="DailyGoals__fatPercBox">
        <label htmlFor="" className="DailyGoals__fatPercLabel">
          <input
            value={fat}
            name="fat"
            onChange={(e) => setFat(parseInt(e.target.value))}
            type="number"
            className="DailyGoals__fatPercInput"
          />
          %
        </label>
      </div>

      {/* >>>>>>>>>>>>>>> HELPER AREA <<<<<<<<<<<<<<<< */}

      <p className="DailyGoals__helper">Sprawdź jak obliczyć</p>

      {/* >>>>>>>>>>>>>>> SUMMARY AREA <<<<<<<<<<<<<<<< */}

      <div className="DailyGoals__summaryBox">
        <p className="DailyGoals__summaryHeader">Razem:</p>
        <p className="DailyGoals__summaryTxt">
          Łączna wartość % mkroskładników musi wynosić 100%
        </p>
        <p
          className={
            summaryPerc === 100
              ? "DailyGoals__summaryPerc"
              : "DailyGoals__summaryPerc DailyGoals__summaryPerc--red"
          }
        >
          {summaryPerc}%
        </p>
      </div>

      {/* >>>>>>>>>>>>>>> CONFIRMATION DIALOG <<<<<<<<<<<<<<<< */}

      <>
        <div
          className="DailyGoals__confirmBoxWrapper"
          ref={(el) => (modalBlur = el)}
        ></div>
        <div className="DailyGoals__confirmBox" ref={(el) => (savedModal = el)}>
          <p className="DailyGoals__confirmTxt">Zmiany zostały zapisane!</p>
          <p className="DailyGoals__confirmExit" onClick={modalOpenExit}>
            OK
          </p>
        </div>
      </>
    </section>
  );
};

export default DailyGoals;
