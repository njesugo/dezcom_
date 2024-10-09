import { useEffect, useState } from "react";
import { useCart } from "./context"; 
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm2";
import { loadStripe } from "@stripe/stripe-js";
import { userRequest } from "./requestMethods";
function Payment() {
    const [stripePromise, setStripePromise] = useState(null);
    const [clientSecret, setClientSecret] = useState("");
    const { state } = useCart();
    useEffect(() => {
        userRequest.get("/stripe/config")
            .then(async (r) => {
                const { publishableKey } = await r.data;
                setStripePromise(loadStripe(publishableKey));
            });
    }, []);

    useEffect(() => {
        userRequest.post("/stripe/create-payment-intent", {
            amount: state.total * 100,
            currency: "EUR"
        }).then(async (result) => {
            var { clientSecret } = await result.data;
            setClientSecret(clientSecret);
        });
    }, []);

    return (
        <>
            <h1>React Stripe and the Payment Element</h1>
            {clientSecret && stripePromise && (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <CheckoutForm />
                </Elements>
            )}
        </>
    );
}

export default Payment;