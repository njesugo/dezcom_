import { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router";
import { AuthContext } from "../context/AuthContext"; // Importer AuthContext
import { CartContext } from "../context/CartContext"; // Importer CartContext
import { userRequest } from "../requestMethods"; // Si ce fichier est encore utilisé pour faire des requêtes

const Success = () => {
  const location = useLocation();
  const data = location.state.stripeData; // Informations sur Stripe
  const { cart } = useContext(CartContext); // Accéder au contexte du panier
  const { user } = useContext(AuthContext); // Accéder à l'utilisateur authentifié
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    const createOrder = async () => {
      try {
        const res = await userRequest.post("/orders", {
          userId: user._id, // Utiliser l'ID de l'utilisateur du contexte
          products: cart.products.map((item) => ({
            productId: item._id,
            quantity: item.quantity, // Remplacez _quantity par quantity
          })),
          amount: cart.total, // Montant total
          address: data.billing_details.address, // Adresse de facturation
        });
        setOrderId(res.data._id);
      } catch (err) {
        console.error(err); // Gérer les erreurs
      }
    };
    data && createOrder();
  }, [cart, data, user]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {orderId
        ? `Order has been created successfully. Your order number is ${orderId}`
        : `Success! Your order is being prepared...`}
      <button style={{ padding: 10, marginTop: 20 }}>Go to Homepage</button>
    </div>
  );
};

export default Success;
