import React, { createContext, useState, useEffect } from "react";
import firebase from "../assets/firebase/firebase";
import "firebase/database";

export const AppContext = createContext();

const Store = ({ children }) => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const ref = firebase.database().ref("/meals");
    ref.on("value", (snapshot) => {
      const meals = snapshot.val();
      setMeals(meals);
    });
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const clearInputs = () => {
    setEmail("");
    setPassword("");
  };

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  return (
    <AppContext.Provider
      value={{
        email,
        password,
        handleEmail,
        handlePassword,
        clearInputs,
        emailError,
        passwordError,
        setEmailError,
        setPasswordError,
        meals,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default Store;
