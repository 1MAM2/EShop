import { ACCESS_TOKEN_KEY } from "../Context/AuthContext";
import type { OrderReadDTO } from "../types/OrderTypes/OrderReadDTO";
import type { OrderCreateDTO } from "../types/OrderTypes/OrderCreateDTO";
import api from "./api";

const BASE_URL: string = `${import.meta.env.VITE_API_URL}/api`;

export const OrderService = {
  userGetAllOrder: async (): Promise<OrderReadDTO[]> => {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    const res = await api.get(`${BASE_URL}/order/user-getall-orders`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  },
  createOrder: async (order: OrderCreateDTO): Promise<OrderReadDTO> => {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    const response = await api.post<OrderReadDTO>(
      `${BASE_URL}/order/create-order`,
      order,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  },
};
