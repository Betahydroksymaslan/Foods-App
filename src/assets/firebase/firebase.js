import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyDf8J4O8NiXyDXa8Eaxu4qd--sT7w5k9qk",
  authDomain: "foodapp-f5fbe.firebaseapp.com",
  databaseURL: "https://foodapp-f5fbe.firebaseio.com",
  projectId: "foodapp-f5fbe",
  storageBucket: "foodapp-f5fbe.appspot.com",
  messagingSenderId: "180328613038",
  appId: "1:180328613038:web:79c06c34fa2b5cf964193f",
  measurementId: "G-XB8ZZ4MVHZ",
};

firebase.initializeApp(firebaseConfig);


export const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = async () => {
  await auth
    .signInWithPopup(googleProvider)
    .then((res) => {
      console.log(res.user);
      firebase
        .database()
        .ref("/users/" + res.user.uid)
        .set({
          email: res.user.email,
          uid: res.user.uid,
        });
    })
    .catch((error) => {
      console.log(error.message);
    });
};

const facebookProvider = new firebase.auth.FacebookAuthProvider();
export const signInWithFacebook = async () => {
  await auth
    .signInWithPopup(facebookProvider)
    .then((res) => {
      console.log(res.user);
      firebase
        .database()
        .ref("/users/" + res.user.uid)
        .set({
          email: res.user.email,
          uid: res.user.uid,
        });
    })
    .catch((error) => {
      console.log(error.message);
    });
};

const clearErrors = (setEmailError, setPasswordError) => {
  setEmailError("");
  setPasswordError("");
};

export const handleSignIn = async (
  username,
  password,
  setEmailError,
  setPasswordError
) => {
  clearErrors(setEmailError, setPasswordError);
  await firebase
    .auth()
    .createUserWithEmailAndPassword(username, password)
    .then((credential) => {
      firebase
        .database()
        .ref("/users/" + credential.user.uid)
        .set({
          email: credential.user.email,
          uid: credential.user.uid,
        });
    })
    .catch((err) => {
      console.log(err);
      switch (err.code) {
        case "auth/invalid-email":
        case "auth/user-disabled":
        case "auth/email-already-in-use":
          setEmailError(err.message);
          break;
        default:
        case "auth/weak-password":
          setPasswordError(err.message);
          break;
      }
    });
};

export const handleLogin = async (
  username,
  password,
  setEmailError,
  setPasswordError
) => {
  clearErrors(setEmailError, setPasswordError);
  await firebase
    .auth()
    .signInWithEmailAndPassword(username, password)
    .catch((err) => {
      switch (err.code) {
        case "auth/invalid-email":
        case "auth/user-not-found":
          setEmailError(err.message);
          break;
        default:
        case "auth/wrong-password":
          setPasswordError(err.message);
          break;
      }
    });
};

export const logOut = () => {
  auth.signOut();
};

export default firebase;
