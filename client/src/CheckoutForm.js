import { PaymentElement } from "@stripe/react-stripe-js";
import { useState, useEffect } from "react";
import { useStripe, useElements, Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import './checkoutform.css'; // Import your CSS file
import { userRequest } from "./requestMethods"; 

// Load Stripe using your publishable key
const stripePromise = loadStripe("pk_test_51Q624iRrwERZ54J8tuLum6IK0hbbyqHLGMHlVkint5FiYE7aHa9i8GaE6bhe4KzBqcF5dVVdVvLp4QKpNuFqUU0400Af0xhzE0");

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [clientSecret, setClientSecret] = useState("");
  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Fetch the clientSecret from the backend when the component mounts

  
  useEffect(() => {
    userRequest.post("/stripe/create-payment-intent", 
      { amount: 1000, currency: "usd" }
    )
      .then((res) => setClientSecret(res.data.clientSecret));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/completion`,
      },
      redirect: "if_required",
    });

    if (error?.type === "card_error" || error?.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsProcessing(false);
  };

  // If clientSecret is not yet available, show a loading message
  if (!clientSecret) {
    return <div>Loading...</div>;
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <div className="checkout-form"> {/* Specific class for styling */}
        <form id="payment-form" onSubmit={handleSubmit}>
          <PaymentElement id="payment-element" />
          <button disabled={isProcessing || !stripe || !elements} id="submit">
            <span id="button-text">
              {isProcessing ? "Processing ... " : "Pay now"}
            </span>
          </button>
          {message && <div id="payment-message">{message}</div>}
        </form>
      </div>
    </Elements>
  );
}
