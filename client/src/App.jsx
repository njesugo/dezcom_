// import "./App.css";
import Payment from "./Payment2";
import Completion from "./Completion";

import Home from "./pages/Home";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";
import Success from "./pages/Success";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext"; // Import AuthContext
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Load your Stripe publishable key
const stripePromise = loadStripe("pk_test_51Q624iRrwERZ54J8tuLum6IK0hbbyqHLGMHlVkint5FiYE7aHa9i8GaE6bhe4KzBqcF5dVVdVvLp4QKpNuFqUU0400Af0xhzE0"); // Replace with your actual key

function App() {
  const { user, logout } = useContext(AuthContext); // Utiliser le contexte

  const handleLogout = () => {
    logout(); // Appel de la fonction logout
  };

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
            <Route path="/checkout" element={<Payment />} />
            <Route path="/completion" element={<Completion />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
