import type { UserReadDTO } from "../types/UserTypes/UserReadDTO";
import { ACCESS_TOKEN_KEY } from "../Context/AuthContext";
import type { UserUpdateDTO } from "../types/UserTypes/UserUpdateDTO";
import api from "./api";



export const UserService = {
  async getUserData(): Promise<UserReadDTO> {
    const res = await api.get("/api/user/me");
    return res.data;
  },

  async deleteAccount(): Promise<void> {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);

     await api.delete(`api/user/deleteAccount`,{
        headers:{
           Authorization: `Bearer ${token}`, 
        }
    });
    
  },
  async updateUser(req:UserUpdateDTO):Promise<void>
  {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    await api.put(`api/user/updateuser`,req,{
      headers:
      {
        Authorization: `Bearer ${token}`
      }
    });
  }
};
