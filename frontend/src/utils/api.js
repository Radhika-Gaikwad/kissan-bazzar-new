// utils/api.js (assuming this is your existing API utility file)

// Import any necessary dependencies
import axios from 'axios'; // Example: using Axios for HTTP requests

// Example function to fetch products from an API endpoint
export const fetchProducts = async (category) => {
  try {
    const response = await axios.get(`/api/food/list/${category}`);
    return response.data; // Assuming your API response contains the data directly
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error; // Rethrow the error so calling functions can handle it
  }
};
