import React, { useEffect, useRef, useState } from "react";
import { ReactComponent as UserImage } from "../../assets/images/userImage.svg";
import { ReactComponent as GymIcon } from "../../assets/images/gymIcon.svg";
import { ReactComponent as FavouriteIcon } from "../../assets/images/favouriteHeart.svg";
import { ReactComponent as AddingIcon } from "../../assets/images/addingIcon.svg";
import gsap from "gsap";
import firebase from "../../assets/firebase/firebase";
import { logOut } from "../../assets/firebase/firebase";
import { Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation";

const User = () => {
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const imageWrapper = useRef(null);
  let component = useRef(null);
  let gymWrapper = useRef(null);
  let favouriteWrapper = useRef(null);
  let logButton = useRef(null);
  let addMeal = useRef(null);
  let addProduct = useRef(null);
  const [currentUser, setCurrentUser] = useState("");
  
  useEffect(() => {
    let unsubscribe;
    const watch = () => {
      unsubscribe = firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          setCurrentUser(user.email);
        } else {
          setCurrentUser("");
        }
      });
    };

    const [elements] = imageWrapper.current.children;

    const circles = elements.querySelectorAll(".cls-2__circles");
    const stars = elements.querySelectorAll(".cls-2__stars");
    const cloudRight = elements.querySelector(".cls-1__clouds--cloudOne");
    const cloudLeft = elements.querySelector(".cls-1__clouds--cloudTwo");

    gsap.set(
      [
        ...circles,
        ...stars,
        cloudRight,
        cloudLeft,
        gymWrapper,
        favouriteWrapper,
        addMeal,
        addProduct,
        logButton,
      ],
      { autoAlpha: 0 }
    );

    const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });

    tl.to(component, { duration: 0, css: { visibility: "visible" } })
      .fromTo(
        cloudRight,
        { x: "-=100" },
        { duration: 1.5, x: "+=100", autoAlpha: 1 }
      )
      .fromTo(
        cloudLeft,
        { x: "+=100" },
        { duration: 1.5, x: "-=100", autoAlpha: 1 },
        "-=.80"
      )
      .to(stars, { duration: 2, autoAlpha: 1, stagger: 0.2 }, "-=1")
      .to(circles, { duration: 2, autoAlpha: 1, stagger: 0.2 }, "-=3")
      .fromTo(
        gymWrapper,
        { x: "+=60" },
        { duration: 0.5, x: "-=60", autoAlpha: 1 },
        "-=4"
      )
      .fromTo(
        favouriteWrapper,
        { x: "+=60" },
        { duration: 0.5, x: "-=60", autoAlpha: 1 },
        "-=3.8"
      )
      .fromTo(
        addMeal,
        { x: "+=60" },
        { duration: 0.5, x: "-=60", autoAlpha: 1 },
        "-=3.6"
      )
      .fromTo(
        addProduct,
        { x: "+=60" },
        { duration: 0.5, x: "-=60", autoAlpha: 1 },
        "-=3.4"
      )
      .fromTo(
        logButton,
        { x: "+=60" },
        { duration: 0.5, x: "-=60", autoAlpha: 1 },
        "-=3.4"
      );
    watch();
    return () => unsubscribe();
  }, [isButtonClicked]);

  const emailInfo = currentUser ? (
    <p className="User__email">{currentUser}</p>
  ) : (
    <p className="User__email">Niezalogowany</p>
  );

  return (
    <>
      <div className="User" ref={(el) => (component = el)}>
        <div ref={imageWrapper} className="User__imageWrapper">
          <UserImage />
        </div>

        {emailInfo}

        <div className="User__training" ref={(el) => (gymWrapper = el)}>
          <GymIcon className="User__gym-icon" />
          <p className="User__training-text">Mój Trening</p>
        </div>

        <Link
          to="/FavouriteMeals"
          className="User__favourite"
          ref={(el) => (favouriteWrapper = el)}
        >
          <FavouriteIcon className="User__favourite-icon" />
          <p className="User__training-text">Ulubione</p>
        </Link>

        <Link
          to="/addMeal"
          className="User__addMeal"
          ref={(el) => (addMeal = el)}
        >
          <AddingIcon className="User__gym-icon" />
          <p className="User__training-text">Dodaj posiłek</p>
        </Link>

        <Link
          to="/addProduct"
          className="User__addMeal"
          ref={(el) => (addProduct = el)}
        >
          <AddingIcon className="User__gym-icon" />
          <p className="User__training-text">Dodaj produkt</p>
        </Link>

        {!currentUser ? (
          <Link
            to="/login"
            ref={(el) => (logButton = el)}
            className="User__login-button"
          >
            Zaloguj się
          </Link>
        ) : (
          <div
            onClick={() => {
              logOut();
              setIsButtonClicked(true);
            }}
            ref={(el) => (logButton = el)}
            className="User__login-button--logout User__login-button"
          >
            Wyloguj się
          </div>
        )}
      </div>
      <Navigation />
    </>
  );
};

export default User;
