import axios from "axios";
import { productUrl } from "./api";


export const getAllProductApi = async (options = {}) => {
  try {
    const { search, minPrice, maxPrice, ...otherOptions } = options;
    const searchQuery = search ? `search=${encodeURIComponent(search)}` : '';
    const minPriceQuery = minPrice !== undefined ? `minPrice=${minPrice}` : '';
    const maxPriceQuery = maxPrice !== undefined ? `maxPrice=${maxPrice}` : '';

    // Combine all query parameters
    const queryString = [searchQuery, minPriceQuery, maxPriceQuery].filter(Boolean).join('&');

    const response = await axios.get(`${productUrl}/all${queryString ? `?${queryString}` : ''}`, otherOptions);

    if (response.status !== 200) {
      throw new Error(`Failed to fetch products. Status: ${response.status}`);
    }

    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Failed to fetch products.');
  }
};


export const deleteProductApi = async (productId) => {
    try {
      const response = await axios.delete(`${productUrl}/${productId}`);
      const data = await response.data;
      return data;
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
}
export const editProductApi = async (productId, updatedData) => {
    const { price, description } = updatedData;
    const request = axios({
      method: "PUT",
      url: `${productUrl}/${productId}`,
      data: { price, description },
      headers: {
        "Content-Type": "application/json",
      },
    });
    return request;
  };
  
  export const addProductApi = async (formData) => {
    try {
      const response = await axios.post(productUrl.concat("/add"), formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const data = await response.data;
      return data;
    } catch (error) {
      console.error('Error adding product:', error);
      throw error;
    }
  };