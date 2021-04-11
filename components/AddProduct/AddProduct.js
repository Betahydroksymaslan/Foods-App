import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import firebase from "firebase/app";
import "firebase/database";

const AddProduct = () => {
  const history = useHistory();
  const [nameValue, setNameValue] = useState("");
  const [proteinValue, setProteinValue] = useState("");
  const [carbsValue, setCarbsValue] = useState("");
  const [fatValue, setFatValue] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isFormCorrect, setIsFormCorrect] = useState(false);

  const handleSubmit = () => {
    setIsDialogOpen(true);
    if (nameValue && proteinValue && carbsValue && fatValue) {
      firebase
        .database()
        .ref("/products/" + nameValue)
        .set({
          nameValue,
          proteinValue,
          carbsValue,
          fatValue,
        });
      setNameValue("");
      setProteinValue("");
      setCarbsValue("");
      setFatValue("");
      setIsFormCorrect(true);
    } else {
      setIsFormCorrect(false);
    }
  };

  return (
    <div className="AddProduct">
      <div className="AddProduct__backBox" onClick={() => history.goBack()}>
        <FontAwesomeIcon icon={faArrowLeft} className="AddingPanel__backIcon" />
      </div>
      <h1 className="AddProduct__header">Dodaj produkt</h1>

      <label className="AddProduct__nameLabel">
        Nazwa:
        <input
          type="text"
          onChange={(e) => setNameValue(e.target.value)}
          value={nameValue}
          className="AddProduct__nameInput"
        />
      </label>

      <label className="AddProduct__proteinLabel">
        Białko:
        <input
          type="number"
          onChange={(e) => setProteinValue(parseInt(e.target.value))}
          value={proteinValue}
          className="AddProduct__proteinInput"
        />
      </label>

      <label className="AddProduct__carbsLabel">
        Węglowodany:
        <input
          type="number"
          onChange={(e) => setCarbsValue(parseInt(e.target.value))}
          value={carbsValue}
          className="AddProduct__carbsInput"
        />
      </label>

      <label className="AddProduct__fatLabel">
        Tłuszcz:
        <input
          type="number"
          onChange={(e) => setFatValue(parseInt(e.target.value))}
          value={fatValue}
          className="AddProduct__fatInput"
        />
      </label>

      <button className="AddProduct__submitButton" onClick={handleSubmit}>
        Dodaj
      </button>

      {isDialogOpen ? (
        <>
          <div className="AddProduct__dialogWindowWrapper"></div>
          <div className="AddProduct__dialogWindow">
            <p className="AddProduct__dialogTxt">
              {isFormCorrect ? "Dodano!" : "Sprawdź poprawność pól formularza!"}
            </p>
            <p className="AddProduct__dialogConfirm" onClick={() => setIsDialogOpen(false)}>OK</p>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default AddProduct;
