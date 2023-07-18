import React, { createContext, useEffect, useState, useContext } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

const config = {
    apiKey: "AIzaSyDnCjboOAshsUuh96-n7ikDgCxUtPrfhSs",
    authDomain: "personal-website-610c4.firebaseapp.com",
    projectId: "personal-website-610c4",
    storageBucket: "personal-website-610c4.appspot.com",
    messagingSenderId: "156171430732",
    appId: "1:156171430732:web:25e9283ee34cccae98bde9",
    measurementId: "G-M9BSDJ3DJL"
  };


/*
 * This is used to create a new user.
 * return the user if the creation is successful.
 * throw an error if the creation is not successful.
 */
export const newUser = (email: string, password: string, auth: any) =>
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      return userCredential.user;
    })
    .catch((error) => {
      const errorMessage = error.message;
      const parsedError = errorMessage
        .split("(")[1]
        .split(")")[0]
        .split("/")[1];
      throw new Error(parsedError);
    });

/*
 * This is used to login the user.
 * return the user if the login is successful.
 * throw an error if the login is not successful.
 */
export const login = (email: string, password: string, auth: any) =>
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      return userCredential.user;
    })
    .catch((error) => {
      const errorMessage = error.message;
      const parsedError = errorMessage
        .split("(")[1]
        .split(")")[0]
        .split("/")[1];
      throw new Error(parsedError);
    });

/*
 * This is used to logout the user.
 */
export const logout = (auth: any) => auth.signOut();

export const authIsUserLoggedIn = (auth: any) => {
  if (auth.currentUser) {
    return true;
  }
  return false;
};

/*
 * This is used to get the user token for the current user.
 * return null if the user is not logged in.
 */
export const getUserToken = async (auth: any) => {
  if (auth.currentUser) {
    try {
      const idToken = await auth.currentUser.getIdToken(true);
      return idToken;
    } catch (error) {
      return null;
    }
  }
  return null;
};

interface IAuthContext {
  isLoggedIn: boolean;
  isLoading: boolean;
  auth: any;
}

const AuthContext = createContext<IAuthContext>({ isLoggedIn: false, isLoading: true, auth: null });

interface Props {
  children: React.ReactNode;
}

export const AuthProvider = ({ children}: Props) => {
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(true);
  // Initialize Firebase
  const app = initializeApp(config);
  const auth = getAuth(app);

  getUserToken(auth).then((token) => {
    console.log(token);
  });


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
      setLoading(false);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, isLoading, auth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);








