import type { ProductReadDTO } from "../types/ProductTypes/PrdocutReadDTO";
import type { ProductCreateDTO } from "../types/ProductTypes/ProductCreateDTO";
import type { ProductUpdateDTO } from "../types/ProductTypes/ProductUpdateDTO";
import type { CategoryReadDTO } from "../types/CategoryTypes/CategoryReadDTO";
import api from "./api";
import type { CategoryCreateDTO } from "../types/CategoryTypes/CategoryCreateDTO";
import type { CategoryUpdateDTO } from "../types/CategoryTypes/CategoryUpdateDTO";
import type { OrderReadDTO } from "../types/OrderTypes/OrderReadDTO";
import type { UserReadDTO } from "../types/UserTypes/UserReadDTO";
import type { DashboardDTO } from "../types/DashBoard/DashboardDTO";

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
// });
const BaseUrl = `${import.meta.env.VITE_API_URL}/api`;

export const AdminService = {
  //Product
  async GetAllProducts(): Promise<ProductReadDTO[]> {
    const res = await api.get(`${BaseUrl}/Product/adminGetAll`);
    const data = res.data;
    return data;
  },
  async CreateProduct(dto: ProductCreateDTO): Promise<ProductReadDTO> {
    try {
      const res = await api.post(`${BaseUrl}/Product`, dto);
      const data = res.data;
      return data;
    } catch (err: any) {
      console.error("Ürün oluşturulurken hata:", err.response?.data || err);
      throw err;
    }
  },
  async UpdateProduct(id: number, dto: ProductUpdateDTO): Promise<void> {
    try {
      await api.put(`${BaseUrl}/Product/${id}`, dto);
    } catch (err: any) {
      console.error("Ürün update edilemedi hata:", err.response?.data || err);
      throw err;
    }
  },
  async DeleteProduct(id: number): Promise<void> {
    await api.delete(`${BaseUrl}/Product/${id}`);
  },
  async GetProductById(id: number): Promise<ProductReadDTO> {
    const res = await api.get(`${BaseUrl}/Product/${id}`);
    return res.data;
  },

  //Categories
  async GetAllCategories(): Promise<CategoryReadDTO[]> {
    const res = await api.get(`${BaseUrl}/Category`);
    return res.data;
  },
  async DeleteCategory(id: number): Promise<void> {
    await api.get(`${BaseUrl}/Category/${id}`);
  },
  async CreateCategory(dto: CategoryCreateDTO): Promise<CategoryReadDTO> {
    const res = await api.post(`${BaseUrl}/Category`, dto);
    return res.data;
  },
  async UpdateCategory(
    dto: CategoryUpdateDTO,
    id: number
  ): Promise<CategoryReadDTO> {
    const res = await api.put(`${BaseUrl}/Category/${id}`, dto);
    return res.data;
  },
  // Orders

  async GetAllOrders(): Promise<OrderReadDTO[]> {
    const res = await api.get(`${BaseUrl}/Order`);
    return res.data;
  },
  getOrderById: async (id: number): Promise<OrderReadDTO> => {
    const res = await api.get<OrderReadDTO>(`${BaseUrl}/${id}`);
    return res.data;
  },
  updateOrderStatus: async (id: number, status: string): Promise<void> => {
    await api.patch(`${BaseUrl}/Order/${id}/status?status=${status}`);
  },
  deleteOrder: async (id: number): Promise<void> => {
    await api.delete(`${BaseUrl}/${id}`);
  },

  // Users
  async getAllUsers(): Promise<UserReadDTO[]> {
    const res = await api.get(`${BaseUrl}/User`);
    return res.data;
  },

  async deleteAccount(id: number): Promise<void> {
    await api.put(`${BaseUrl}/User/soft-delete/${id}`);
  },
  async changeRole(id: number, role: string): Promise<void> {
    await api.put(`${BaseUrl}/User/change-role`, { id, role });
  },
  // DashBoard
  async dashboard(): Promise<DashboardDTO> {
    const res = await api.get(`${BaseUrl}/DashBoard`);
    return res.data;
  },
  async updateProductStock(productId: number, newStock: number): Promise<void> {
    await api.put(
      `${BaseUrl}/Product/${productId}/stock`,
      { newStock },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  },
};
