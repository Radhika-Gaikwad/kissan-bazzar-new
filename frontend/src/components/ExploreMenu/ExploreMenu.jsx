import React, { useEffect } from "react";
import "./ExploreMenu.css";
import { menu_list } from "../../assets/frontend_assets/assets";

const ExploreMenu = ({ categories, setCategory }) => {
  useEffect(() => {
    const menuList = document.querySelector('.explore-menu-container');

    const handleMouseEnter = () => {
      menuList.style.animationPlayState = 'paused';
    };

    const handleMouseLeave = () => {
      menuList.style.animationPlayState = 'running';
    };

    menuList.addEventListener('mouseenter', handleMouseEnter);
    menuList.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      menuList.removeEventListener('mouseenter', handleMouseEnter);
      menuList.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const handleCategoryClick = (category) => {
    setCategory(category);
  };

  return (
    <div className="explore-menu">
      <h1 className="explore-menu-title">Explore Our Products</h1>
      <p className="explore-menu-text">
        From the freshest farm produce to artisanal products, discover a variety
        of offerings crafted with care and dedication. Browse through our
        categories to find exactly what you need to bring the farm-fresh
        experience to your home.
      </p>
      <div className="explore-menu-container">
        <div className="explore-menu-list">
          {menu_list && menu_list.concat(menu_list).map((item, index) => (
            <div key={index} className="explore-menu-list-item">
              <img src={item.menu_image} alt={item.menu_name} />
              <p>{item.menu_name}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="explore-menu-buttons">
      {categories && categories.map((category, index) => (
  <button
    key={index}
    className="category-button"
    onClick={() => handleCategoryClick(category.key)}
  >
    {category.key}
  </button>
))}

      </div>
      <hr className="explore-menu-hr" />
    </div>
  );
};

export default ExploreMenu;
