// import "./App.css";
import Payment from "./Payment";
import Completion from "./Completion";

import Home from "./pages/Home";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";
import Success from "./pages/Success";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext"; // Importer AuthContext

function App() {

  const { user } = useContext(AuthContext); // Utiliser AuthContext pour obtenir l'utilisateur

  return (
    <main>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:category" element={<ProductList />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route
                path="/login"
                element={user ? <Navigate to="/" /> : <Login />}
          /> 
          <Route 
            path="/register" 
            element={user ? <Navigate to="/" /> : <Register />} 
          />
          <Route path="/checkout" element={<CheckoutForm />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}


export default App;
