import axios from "axios";
import { productUrl } from "./api";
export const getAllProductApi = async () => {
    try{
    const response = await axios.get(productUrl.concat("/all"));
        const data = await response.data;
        return data;
    }catch (error) {
        console.error('Error fetching:', error);
      }
}
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