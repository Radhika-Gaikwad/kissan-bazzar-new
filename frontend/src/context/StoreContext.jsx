import axios from 'axios';
import React, { createContext, useState, useEffect, useCallback } from 'react';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCartItems = localStorage.getItem('cartItems');
    return savedCartItems ? JSON.parse(savedCartItems) : {};
  });

  const [token, setToken] = useState("");
  const [fruitList, setFruitList] = useState([]);
  const [foodList, setFoodList] = useState([]); // Corrected typo
  const [vegList, setVegList] = useState([]);
  const [leafyList, setLeafyList] = useState([]);
  const [milkList, setMilkList] = useState([]);
  const [nvegList, setNvegList] = useState([]);
  const [grainList, setGrainList] = useState([]);
  const [pulseList, setPulseList] = useState([]);
  const [seedList, setSeedList] = useState([]);
  const [spiceList, setSpiceList] = useState([]);
  const [flowerList, setFlowerList] = useState([]);
  const [plantList, setPlantList] = useState([]);

  const url = "http://localhost:4000";

  // Function to clear cart items
  const clearCart = () => {
    setCartItems({});
    localStorage.removeItem('cartItems'); // Remove cartItems from localStorage
  };

  const addToCart = useCallback(async (itemId) => {
    setCartItems((prev) => {
      const newCartItems = {
        ...prev,
        [itemId]: (prev[itemId] || 0) + 1,
      };
      localStorage.setItem('cartItems', JSON.stringify(newCartItems));
      return newCartItems;
    });

    if (token) {
      try {
        await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
      } catch (error) {
        console.error('Error adding item to cart:', error);
      }
    }
  }, [token, url]);

  const removeFromCart = useCallback(async (itemId) => {
    setCartItems((prev) => {
      const updatedItems = { ...prev };
      if (updatedItems[itemId] > 1) {
        updatedItems[itemId] -= 1;
      } else {
        delete updatedItems[itemId];
      }
      localStorage.setItem('cartItems', JSON.stringify(updatedItems));
      return updatedItems;
    });
    if (token) {
      try {
        await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
      } catch (error) {
        console.error('Error removing item from cart:', error);
      }
    }
  }, [token, url]);

  const getTotalCartAmount = useCallback(() => {
    let totalAmount = 0;
    const allProducts = [
      ...fruitList,
      ...vegList,
      ...leafyList,
      ...milkList,
      ...nvegList,
      ...grainList,
      ...pulseList,
      ...seedList,
      ...spiceList,
      ...flowerList,
      ...plantList,
      ...foodList
    ];

    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = allProducts.find((product) => product._id === item);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  }, [
    cartItems,
    fruitList,
    vegList,
    leafyList,
    milkList,
    nvegList,
    grainList,
    pulseList,
    seedList,
    spiceList,
    flowerList,
    plantList,
    foodList
  ]);

  const fetchFoodListByCategory = async (category) => {
    try {
      const response = await axios.get(`${url}/api/food/list/${category}`);
      return response.data.data; // Assuming the API response structure
    } catch (error) {
      console.error(`Error fetching ${category} list:`, error);
      return []; // Handle error appropriately based on your application's logic
    }
  };

  const loadCartData = async (token) => {
    const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } });
    setCartItems(response.data.cartData);
  }

  useEffect(() => {
    const loadData = async () => {
      try {
        const [
          fruitListData,
          vegListData,
          leafyListData,
          milkListData,
          nvegListData,
          grainListData,
          pulseListData,
          seedListData,
          spiceListData,
          flowerListData,
          plantListData,
          foodListData
        ] = await Promise.all([
          fetchFoodListByCategory("Fruits"),
          fetchFoodListByCategory("Vegetables"),
          fetchFoodListByCategory("Leafy"),
          fetchFoodListByCategory("Dairy"),
          fetchFoodListByCategory("Meat"),
          fetchFoodListByCategory("Grains"),
          fetchFoodListByCategory("Pulses"),
          fetchFoodListByCategory("Seeds"),
          fetchFoodListByCategory("Spices"),
          fetchFoodListByCategory("Flowers"),
          fetchFoodListByCategory("Plants"),
          fetchFoodListByCategory("Food")
        ]);

        setFruitList(fruitListData);
        setVegList(vegListData);
        setLeafyList(leafyListData);
        setMilkList(milkListData);
        setNvegList(nvegListData);
        setGrainList(grainListData);
        setPulseList(pulseListData);
        setSeedList(seedListData);
        setSpiceList(spiceListData);
        setFlowerList(flowerListData);
        setPlantList(plantListData);
        setFoodList(foodListData); // Corrected typo

        if (localStorage.getItem("token")) {
          setToken(localStorage.getItem("token"));
          await loadCartData(localStorage.getItem("token"));
        }
      } catch (error) {
        console.error('Failed to load food lists:', error);
        // Handle error state or display error message to the user
      }
    };

    loadData();
  }, []);

  const contextValue = {
    fruitList,
    vegList,
    leafyList,
    milkList,
    nvegList,
    grainList,
    pulseList,
    seedList,
    spiceList,
    flowerList,
    plantList,
    foodList,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    clearCart, // Add clearCart to context value
    url,
    token,
    setToken
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
