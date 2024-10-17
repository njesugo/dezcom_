// src/context/CartContext.js
import React, { createContext, useContext, useReducer } from 'react';

// Initialiser l'état du panier
// const initialState = {
//   products: [],
//   quantity: 0,
//   total: 0,
// }; 

const initialState = localStorage.getItem("cart")?JSON.parse(localStorage.getItem("cart")) : {
    products: [],
    quantity: 0,
    total: 0,
    pickupPointId: ""
  }; 

// Créer le contexte
export const CartContext = createContext();

const saveCart =(s)=>{
  localStorage.setItem("cart",JSON.stringify(s)) 
}

let s

// Réducteur pour gérer les actions du panier
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
       s = {
        ...state,
        products: [...state.products, action.payload],
        quantity: state.quantity + 1,
        total: state.total + action.payload.price * action.payload.quantity,
      };
      saveCart(s)
      return s;
    case 'REMOVE_FROM_CART':
      // Logique pour supprimer un produit du panier, si nécessaire
      return state;
    case "PICKUP_POINT":
       s = {
        ...state,
        pickupPointId: action.pickupPointId
      };
      saveCart(s)
      return s;
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

  const setPickupPointId = (pickupPointId) => {
    dispatch({ type: 'PICKUP_POINT', pickupPointId });
  };
  // Vous pouvez également ajouter d'autres fonctions pour gérer le panier (remove, clear, etc.)
  
  return (
    <CartContext.Provider value={{ state, addToCart,setPickupPointId }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook pour utiliser le contexte
export const useCart = () => {
  return useContext(CartContext);
};
