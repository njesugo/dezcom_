import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { CartProvider } from "./context/CartContext"; // Importer le CartProvider
import { AuthContextProvider } from "./context/AuthContext"; // Importer le AuthContextProvider

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider> {/* Envelopper avec le AuthContextProvider */}
      <CartProvider> {/* Envelopper avec le CartProvider */}
        <App />
      </CartProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
