const express = require("express");
const app = express();
const mongoose = require("mongoose");

require('dotenv').config();

const userRoute = require("./src/routes/user");
const authRoute = require("./src/routes/auth");
const productRoute = require("./src/routes/product");
const cartRoute = require("./src/routes/cart");
const orderRoute = require("./src/routes/order");
const stripeRoute = require("./src/routes/stripe");  // Importer la route Stripe

const cors = require("cors");

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/stripe", stripeRoute);  // Utiliser la route Stripe

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

app.listen(5000, () =>
  console.log(`Node server listening at http://localhost:5000`)
);
