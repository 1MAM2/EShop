import axios from "axios";
import type { UserReadDTO } from "../types/UserTypes/UserReadDTO";

const BASE_URL: string = `${import.meta.env.VITE_API_URL}/api/user`;

export const UserService = {
  async getUserData(): Promise<UserReadDTO[]> {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${BASE_URL}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  },
  async deleteAccount(): Promise<void> {
    const token = localStorage.getItem("token");

    const res = await axios.delete(`${BASE_URL}/deleteAccount`,{
        headers:{
           Authorization: `Bearer ${token}`, 
        }
    });
    return res.data;
  },
};
