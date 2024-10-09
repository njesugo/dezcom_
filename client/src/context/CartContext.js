// src/context/CartContext.js
import React, { createContext, useContext, useReducer } from 'react';

// Initialiser l'état du panier
const initialState = {
  products: [],
  quantity: 0,
  total: 0,
};

// Créer le contexte
const CartContext = createContext();

// Réducteur pour gérer les actions du panier
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return {
        ...state,
        products: [...state.products, action.payload],
        quantity: state.quantity + 1,
        total: state.total + action.payload.price * action.payload.quantity,
      };
    case 'REMOVE_FROM_CART':
      // Logique pour supprimer un produit du panier, si nécessaire
      return state;
    case 'CLEAR_CART':
      return initialState;
    default:
      return state;
  }
};

// Fournisseur de contexte
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Fonction pour ajouter un produit au panier
  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  // Vous pouvez également ajouter d'autres fonctions pour gérer le panier (remove, clear, etc.)
  
  return (
    <CartContext.Provider value={{ state, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook pour utiliser le contexte
export const useCart = () => {
  return useContext(CartContext);
};
