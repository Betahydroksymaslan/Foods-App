import React, { useContext, useState, useEffect } from "react";
import fbIcon from "../../assets/images/fbIcon.png";
import googleIcon from "../../assets/images/googleIcon.png";
import userIcon from "../../assets/images/userIcon.png";
import keyIcon from "../../assets/images/keyIcon.png";
import { AppContext } from "../../store/Store";

import firebase, {
  signInWithGoogle,
  signInWithFacebook,
  handleSignIn,
  handleLogin,
} from "../../assets/firebase/firebase";
import { useHistory } from "react-router-dom";

const Login = () => {
  const {
    email,
    password,
    handleEmail,
    handlePassword,
    clearInputs,
    emailError,
    passwordError,
    setEmailError,
    setPasswordError,
  } = useContext(AppContext);

  const history = useHistory();

  const [isLoginScreenOpen, setIsLoginScreenOpen] = useState(true);

  const handleLoginScreen = () => setIsLoginScreenOpen(!isLoginScreenOpen);

  

  useEffect(() => {
    let unsubscribe;

    const authListener = () => {
      unsubscribe = firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          clearInputs();
          history.goBack();
        }
      });
    };
    authListener();
    return () => unsubscribe();
  }, [clearInputs, history]);

  return (
    <section className="login">
      <div className="login__login-box">
        {isLoginScreenOpen ? (
          <span className="login__login-span">Login</span>
        ) : (
          <span className="login__login-span">Register</span>
        )}

        <div className="login__boubles login__boubles--one"></div>
        <div className="login__boubles login__boubles--two"></div>
      </div>
      
      <div className="login__form-wrapper">
        <form className="login__inputs-box">
          <div className="login__username-wrapper">
            <img src={userIcon} alt="User" className="login__username-icon" />
            <input
              type="text"
              value={email}
              onChange={handleEmail}
              className="login__username"
              placeholder="Email"
            />
          </div>

          <div className="login__password-wrapper">
            <img
              src={keyIcon}
              alt="Password"
              className="login__password-icon"
            />
            <input
              type="password"
              value={password}
              onChange={handlePassword}
              className="login__password"
              placeholder="Password"
            />
          </div>
        </form>

        {isLoginScreenOpen ? (
          <button
            className="login__button"
            onClick={() =>
              handleLogin(email, password, setEmailError, setPasswordError)
            }
          >
            LOGIN
          </button>
        ) : (
          <button
            className="login__button"
            onClick={() =>
              handleSignIn(email, password, setEmailError, setPasswordError)
            }
          >
            REGISTER
          </button>
        )}

        <div className="login__errorMessage">
          {emailError} {passwordError}
        </div>

        <button
          className="login__button login__button--google"
          onClick={signInWithGoogle}
        >
          <img
            src={googleIcon}
            alt="google"
            className="login__button--google-icon"
          />
          Sign in with google
        </button>
        <button
          className="login__button login__button--facebook"
          onClick={signInWithFacebook}
        >
          <img
            src={fbIcon}
            alt="facebook"
            className=" login__button--fb-icon"
          />
          Sign in with facebook
        </button>
      </div>
      <div className="login__signUp-box">
        {isLoginScreenOpen ? (
          <span className="login__signUp-span" onClick={handleLoginScreen}>
            Sign Up
          </span>
        ) : (
          <span className="login__signUp-span" onClick={handleLoginScreen}>
            Sign In
          </span>
        )}

        <div className="login__boubles login__boubles--three"></div>
        <div className="login__boubles login__boubles--four"></div>
      </div>
    </section>
  );
};

export default Login;
