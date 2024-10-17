import { useCart } from "./context"; 
import { useEffect, useState } from "react";
import { userRequest } from "./requestMethods";
import { useNavigate } from "react-router-dom";

function Completion(props) {
  const { state } = useCart();
  const navigate = useNavigate();  // Initialize useNavigate for redirection
  useEffect(()=>{
    userRequest.post("/orders",
      {
        products: state.products.map((it)=>({productId: it._id,quantity: it.quantity })),
        amount : state.total,
        address: "Adresse de livraison",
        pickupPoint: state.pickupPointId ,
      }
    )
    .then(() => {
      // Clear the cart after successful order placement
      localStorage.removeItem("cart");
      
      // Redirect to the Orders page after 3 seconds
      setTimeout(() => {
        navigate("/orders");
      }, 3000); // 3-second delay for user to see the "Thank you" message
    });
  },[])

  return <h1>Thank you!</h1>;
}

export default Completion;
