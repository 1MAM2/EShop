import axios from "axios";
import { ACCESS_TOKEN_KEY } from "../Context/AuthContext";
import type { OrderReadDTO } from "../types/OrderTypes/OrderReadDTO";
import type { OrderCreateDTO } from "../types/OrderTypes/OrderCreateDTO";

const BASE_URL: string = `${import.meta.env.VITE_API_URL}/api`;

export const OrderService = {
  userGetAllOrder: async (): Promise<OrderReadDTO[]> => {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    const res = await axios.get(`${BASE_URL}/order/user-getall-orders`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  },
  getOrderById: async (id: number): Promise<OrderReadDTO> => {
    const res = await axios.get<OrderReadDTO>(`${BASE_URL}/${id}`);
    return res.data;
  },
  createOrder: async (order: OrderCreateDTO): Promise<OrderReadDTO> => {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    const response = await axios.post<OrderReadDTO>(
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
  updateOrderStatus: async (id: number, status: string): Promise<void> => {
    await axios.patch(`${BASE_URL}/${id}/status?status=${status}`);
  },
  deleteOrder: async (id: number): Promise<void> => {
    await axios.delete(`${BASE_URL}/${id}`);
  },
};
