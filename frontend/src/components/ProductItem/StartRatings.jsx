import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import './StarRating.css';

export default function StarRating({ noOfStars = 5, productId }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  useEffect(() => {
    const savedRating = localStorage.getItem(`starRating_${productId}`);
    if (savedRating) {
      setRating(parseInt(savedRating));
    }
  }, [productId]);

  function handleClick(getCurrentIndex) {
    setRating(getCurrentIndex);
    localStorage.setItem(`starRating_${productId}`, getCurrentIndex);
  }

  function handleMouseEnter(getCurrentIndex) {
    setHover(getCurrentIndex);
  }

  function handleMouseLeave() {
    setHover(rating);
  }

  return (
    <div className="star-rating">
      {[...Array(noOfStars)].map((_, index) => {
        index += 1;

        return (
          <FaStar
            key={index}
            className={index <= (hover || rating) ? "active" : "inactive"}
            onClick={() => handleClick(index)}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave()}
            size={16} // Adjust the size here if needed
          />
        );
      })}
    </div>
  );
}
