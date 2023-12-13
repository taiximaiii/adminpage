import axios from "axios";
import { registerUrl, userUrl } from "./api";

export const getAllUserApi = async () => {
    try{
    const response = await axios.get(userUrl.concat("/listUser"));
        const data = await response.data;
        return data;
    }catch (error) {
        console.error('Error fetching:', error);
      }
}
export const deleteUserApi = async (userId) => {
    try {
      const response = await axios.delete(`${userUrl}/delete/${userId}`);
      const data = await response.data;
      return data;
    } catch (error) {
      console.error('Error deleting :', error);
      throw error;
    }
}
export const addUserApi = async (formData) => {
    try {
      const response = await axios.post(registerUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const data = await response.data;
      return data;
    } catch (error) {
      console.error('Error adding :', error);
      throw error;
    }
  };