import React, { createContext, useState, useEffect } from "react";
import firebase from "../assets/firebase/firebase";
import "firebase/database";

export const AppContext = createContext();

const Store = ({ children }) => {
  const [meals, setMeals] = useState([]);
  const [currentUser, setCurrentUser] = useState('');
  const [currentUserEmail, setCurrentUserEmail] = useState('');
  const [favouriteMeals, setFavouriteMeals] = useState([]);
  const [userOptions, setUserOptions] = useState([]);
  const [products, setProducts] = useState([]);
  

  useEffect(() => {
    const mealsRef = firebase.database().ref("/meals");
    const favouriteRef = firebase.database().ref("/users/" + currentUser + "/favourites");
    const userOptionsRef = firebase.database().ref("/users/" + currentUser + "/options");
    const productsRef = firebase.database().ref("/products");

    const watch = () => { 
      
      /* >>>>>>>>  PENDING FOR CURRENT USER <<<<<<<<<*/
      
     firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          setCurrentUser(user.uid);
          setCurrentUserEmail(user.email);
        }
      });
  
      /* >>>>>>>>  PENDING FOR CURRENT USER OPTIONS <<<<<<<<<*/

      userOptionsRef.on("value", (snapshot) => {
        const options = snapshot.val();
        const temporaryOptions = [];
        for (let id in options) {
          temporaryOptions.push({ ...options[id] })
        }
        setUserOptions(temporaryOptions);
      })
      /* >>>>>>>>  PENDING FOR FAVOURITE CURRENT USER MEALS <<<<<<<<<*/

      favouriteRef.on("value", (snapshot) => {
        const meals = snapshot.val();
        const newMeals = [];
        for (let id in meals) {
          newMeals.push({ id, ...meals[id] });
        }
       
        setFavouriteMeals(newMeals);
      });

      /* >>>>>>>>  PENDING FOR ALL MEALS <<<<<<<<<*/
      
      mealsRef.on("value", (snapshot) => {
        const meals = snapshot.val();
        const temporaryMeals = [];
        for (let id in meals) {
          temporaryMeals.push({id, ...meals[id]})
        }
        setMeals(temporaryMeals);
      });

      /* >>>>>>>>  PENDING FOR ALL PRODUCTS <<<<<<<<<*/

      productsRef.on("value", (snapshot) => {
        const products = snapshot.val();
        const temporaryProducts = [];
        for (let id in products) {
          temporaryProducts.push({ ...products[id]})
        }
        setProducts(temporaryProducts);
      });
    };
    
    
    watch();
    return () => watch();
  }, [currentUser]);

  
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
        currentUser,
        currentUserEmail,
        favouriteMeals,
        userOptions,
        products,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default Store;
