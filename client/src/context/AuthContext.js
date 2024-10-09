// src/context/AuthContext.js
import React, { createContext, useReducer } from "react";

// Créez votre contexte
export const AuthContext = createContext();

// Définissez un réducteur (reducer)
const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
    case "REGISTER_START":
      return { ...state, isFetching: true, error: false };
    case "LOGIN_SUCCESS":
    case "REGISTER_SUCCESS":
      return { ...state, isFetching: false, user: action.payload };
    case "LOGIN_FAILURE":
    case "REGISTER_FAILURE":
      return { ...state, isFetching: false, error: true };
    default:
      return state;
  }
};

// Créez le fournisseur (provider)
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isFetching: false,
    error: false,
  });

  // Fonction pour la connexion
  const login = async (username, password) => {
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      dispatch({ type: "LOGIN_SUCCESS", payload: data });
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };

  // Fonction pour l'inscription
  const register = async (userData) => {
    dispatch({ type: "REGISTER_START" });
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const data = await res.json();
      
      if (res.ok) { // Si la réponse est réussie
        dispatch({ type: "REGISTER_SUCCESS", payload: data });
        return true; // Indiquer que l'inscription a réussi
      } else {
        throw new Error(data.message || "Registration failed."); // Lever une erreur si l'inscription échoue
      }
    } catch (err) {
      dispatch({ type: "REGISTER_FAILURE" });
      return false; // Indiquer que l'inscription a échoué
    }
  };
  

  return (
    <AuthContext.Provider value={{ ...state, login, register }}>
      {children}
    </AuthContext.Provider>
  );
};
