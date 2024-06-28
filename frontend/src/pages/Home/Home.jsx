import React, { useState } from "react";
import Header from "../../components/Header/Header";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu";
import ProductDisplay from "../../components/ProductDisplay/ProductDispay";
import AppDownload from "../../components/AppDownload/AppDownload";

const Home = () => {
  const [category, setCategory] = useState("All");

  const categories = [
    { key: "Food", heading: "Delicious Food Near You" },
    { key: "Vegetables", heading: "Fresh and Organic Vegetables Near You" },
    { key: "Fruits", heading: "Fresh Fruits Near You" },
    { key: "Leafy", heading: "Green and Leafy Vegetables" },
    { key: "Dairy", heading: "Dairy and Milk Products" },
    { key: "Meat", heading: "Non-Vegetarian Items" },
    { key: "Grains", heading: "Healthy Grains" },
    { key: "Pulses", heading: "Nutritious Pulses" },
    { key: "Seeds", heading: "Seeds and Nuts" },
    { key: "Spices", heading: "Spices and Herbs" },
    { key: "Flowers", heading: "Beautiful Flowers" },
    { key: "Plants", heading: "Plants for Your Garden" },
  ];

  return (
    <div>
      <Header />

     <ExploreMenu categories={categories} setCategory={setCategory} />

      <ProductDisplay category={category} categories={categories} />
      <AppDownload />
    </div>
  );
};

export default Home;
