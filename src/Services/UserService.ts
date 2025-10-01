import axios from "axios";
import type { UserReadDTO } from "../types/UserTypes/UserReadDTO";
import { ACCESS_TOKEN_KEY } from "../Context/AuthContext";
import type { UserUpdateDTO } from "../types/UserTypes/UserUpdateDTO";

const BASE_URL: string = `${import.meta.env.VITE_API_URL}/api/user`;

export const UserService = {
  async getUserData(): Promise<UserReadDTO> {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    const res = await axios.get(`${BASE_URL}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  },
  async deleteAccount(): Promise<void> {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);

     await axios.delete(`${BASE_URL}/deleteAccount`,{
        headers:{
           Authorization: `Bearer ${token}`, 
        }
    });
    
  },
  async updateUser(req:UserUpdateDTO):Promise<void>
  {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    await axios.put(`${BASE_URL}/updateuser`,req,{
      headers:
      {
        Authorization: `Bearer ${token}`
      }
    });
  }
};
