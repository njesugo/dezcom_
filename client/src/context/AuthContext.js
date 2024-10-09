// src/context/AuthContext.js
import React, { createContext, useReducer } from "react";

// Créez votre contexte
export const AuthContext = createContext();

// Définissez un réducteur (reducer)
const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return { ...state, isFetching: true, error: false };
    case "LOGIN_SUCCESS":
      return { ...state, isFetching: false, user: action.payload };
    case "LOGIN_FAILURE":
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

  const login = async (username, password) => {
    dispatch({ type: "LOGIN_START" });
    try {
      // Remplacez cette partie par votre logique d'appel d'API pour la connexion
      const res = await fetch("API_URL", {
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

  return (
    <AuthContext.Provider value={{ ...state, login }}>
      {children}
    </AuthContext.Provider>
  );
};
