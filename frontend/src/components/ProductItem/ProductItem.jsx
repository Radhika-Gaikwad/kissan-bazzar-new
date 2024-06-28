import React, { useState, useEffect, useContext } from "react";
import "./ProductItem.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import StarRating from "./StartRatings";
import { assets } from "../../assets/frontend_assets/assets";
import { StoreContext } from "../../context/StoreContext";

const ProductItem = ({ id, name, price, description, image }) => {
  const [liked, setLiked] = useState(false);
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);

  useEffect(() => {
    const likedItems = JSON.parse(localStorage.getItem("likedItems")) || [];
    if (likedItems.includes(id)) {
      setLiked(true);
    }
  }, [id]);

  const maxLengthName = 12; // Maximum characters for the name
  const maxLengthDescription = 100; // Maximum characters for the description

  const toggleLike = () => {
    const likedItems = JSON.parse(localStorage.getItem("likedItems")) || [];
    const updatedLikedItems = likedItems.includes(id)
      ? likedItems.filter((itemId) => itemId !== id)
      : [...likedItems, id];

    localStorage.setItem("likedItems", JSON.stringify(updatedLikedItems));
    setLiked(!liked);
  };

  const renderDescription = () => {
    // Truncate description if it exceeds maxLengthDescription
    if (description.length > maxLengthDescription) {
      return `${description.substring(0, maxLengthDescription)}...`;
    }
    return description;
  };

  const renderName = () => {
    // Truncate name if it exceeds maxLengthName
    if (name.length > maxLengthName) {
      return `${name.substring(0, maxLengthName)}...`;
    }
    return name;
  };

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img className="food-item-img" src={image} alt={name} />
        <FontAwesomeIcon
          icon={liked ? solidHeart : regularHeart}
          className="like-icon"
          onClick={toggleLike}
          style={{ color: liked ? "greenyellow" : "rgb(0, 3, 3)" }}
        />
        {!cartItems[id] ? (
          <img
            className="add"
            onClick={() => addToCart(id)}
            src={assets.add_icon_white}
            alt="Add Icon"
          />
        ) : (
          <div className="food-item-counter">
            <img
              onClick={() => removeFromCart(id)}
              src={assets.remove_icon_red}
              alt="Remove Icon"
            />
            <p>{cartItems[id]}</p>
            <img
              onClick={() => addToCart(id)}
              src={assets.add_icon_green}
              alt="Add Icon"
            />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{renderName()}</p>
          <StarRating noOfStars={5} productId={id} />
        </div>
        <p className="food-item-description">{renderDescription()}</p>
        <p className="food-item-price">Rs. {price}</p>
      </div>
    </div>
  );
};

export default ProductItem;
