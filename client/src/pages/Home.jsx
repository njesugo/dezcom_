import React from "react";
// import Sale from "../components/Sale";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
// import Newsletter from "../components/Newsletter";
import Products from "../components/Products";
// import Slider from "../components/Slider";

const Home = () => {
  return (
    <div>
      {/* <Sale /> */}
      <Navbar />
      {/* <Slider /> */}
      <Categories />
      <Products/>
      {/* <Newsletter/> */}
      <Footer/>
    </div>
  );
};

export default Home;