import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import ProductItem from "../ProductItem/ProductItem";
import "./ProductDisplay.css";
import { StoreContext } from "../../context/StoreContext";

const ProductDisplay = ({ category, categories }) => {
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAllState, setShowAllState] = useState({});

  const { addToCart } = useContext(StoreContext); // Access addToCart function from context

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let response;
        if (category === "All") {
          response = await axios.get(`http://localhost:4000/api/food/list/`);
          setAllData(groupByCategory(response.data.data));
        } else {
          response = await axios.get(
            `http://localhost:4000/api/food/list/${category}`
          );
          setData(response.data.data);
        }
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [category]);

  const groupByCategory = (data) => {
    return data.reduce((acc, item) => {
      const cat = item.category;
      if (!acc[cat]) {
        acc[cat] = [];
      }
      acc[cat].push(item);
      return acc;
    }, {});
  };

  const handleShowMore = (cat) => {
    setShowAllState((prevState) => ({ ...prevState, [cat]: true }));
  };

  const handleShowLess = (cat) => {
    setShowAllState((prevState) => ({ ...prevState, [cat]: false }));
  };

  const renderProducts = (products, categoryKey) => (
    <div className="food-display-list">
      {products.slice(0, showAllState[categoryKey] ? products.length : 4).map((item) => (
        <ProductItem
          key={item._id}
          id={item._id}
          name={item.name}
          price={item.price}
          description={item.description}
          image={`http://localhost:4000/images/${item.image}`}
          onAddToCart={() => addToCart(item._id)} // Pass addToCart function as prop
        />
      ))}
      {products.length > 4 && (
        <div className="show-more-less">
          {showAllState[categoryKey] ? (
            <button className="show-less" onClick={() => handleShowLess(categoryKey)}>
              Show less
            </button>
          ) : (
            <button className="see-more" onClick={() => handleShowMore(categoryKey)}>
              Show more
            </button>
          )}
        </div>
      )}
      {products.length === 0 && <p>No products found.</p>}
    </div>
  );

  const getCategoryHeading = (categoryKey) => {
    const categoryObj = categories.find((cat) => cat.key === categoryKey);
    return categoryObj ? categoryObj.heading : `${categoryKey} Products`;
  };

  return (
    <div className="food-display">
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {!loading && (
        <div>
          {category === "All" ? (
            // Render all products grouped by category
            Object.keys(allData).map((cat) => (
              <div key={cat}>
                <h2 className="heading">{getCategoryHeading(cat)}</h2>
                {renderProducts(allData[cat], cat)}
              </div>
            ))
          ) : (
            <div>
              <h2>{getCategoryHeading(category)}</h2>
              {renderProducts(data, category)}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductDisplay;
