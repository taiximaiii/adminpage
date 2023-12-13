import axios from "axios";
import { categoryUrl } from "./api";
export const getAllCategoryApi = async () => {
    try{
    const response = await axios.get(categoryUrl.concat("/all"));
        const data = await response.data;
        return data;
    }catch (error) {
        console.error('Error fetching:', error);
      }
}

export const addCategoryApi = async (categoryData) => {
    try {
      const response = await axios.post(`${categoryUrl}/add`, categoryData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const data = response.data;
      return data;
    } catch (error) {
      console.error('Error adding:', error);
      throw error;
    }
  };