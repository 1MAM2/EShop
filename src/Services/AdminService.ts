import type { ProductReadDTO } from "../types/ProductTypes/PrdocutReadDTO";
import type { ProductCreateDTO } from "../types/ProductTypes/ProductCreateDTO";
import type { ProductUpdateDTO } from "../types/ProductTypes/ProductUpdateDTO";
import type { CategoryReadDTO } from "../types/CategoryTypes/CategoryReadDTO";
import type { CategoryCreateDTO } from "../types/CategoryTypes/CategoryCreateDTO";
import type { CategoryUpdateDTO } from "../types/CategoryTypes/CategoryUpdateDTO";
import type { OrderReadDTO } from "../types/OrderTypes/OrderReadDTO";
import type { UserReadDTO } from "../types/UserTypes/UserReadDTO";
import type { DashboardDTO } from "../types/DashBoard/DashboardDTO";
import api from "./api";
import { toast } from "react-toastify";

const BaseUrl = `${import.meta.env.VITE_API_URL}/api`;

export const AdminService = {
  //  Product
  async GetAllProducts(page = 1, pageSize = 10): Promise<{
    TotalItems: number;
    Page: number;
    PageSize: number;
    Products: ProductReadDTO[];
  }> {
    const res = await api.get(`${BaseUrl}/Product/adminGetAll?page=${page}&pageSize=${pageSize}`);
    return res.data;
  },

  async CreateProduct(dto: ProductCreateDTO): Promise<ProductReadDTO> {
    try {
      const res = await api.post(`${BaseUrl}/Product`, dto);
      toast.success("Product created successfully!");
      return res.data;
    } catch (err: any) {
      toast.error(
        `Failed to create product: ${
          err.response?.data?.message || "Unexpected error"
        }`
      );
      throw err;
    }
  },

  async UpdateProduct(id: number, dto: ProductUpdateDTO): Promise<void> {
    try {
      await api.put(`${BaseUrl}/Product/${id}`, dto);
      toast.info("Product updated successfully");
    } catch (err: any) {
      toast.error(
        `Update failed: ${err.response?.data?.message || "Unexpected error"}`
      );
      throw err;
    }
  },

  async DeleteProduct(id: number): Promise<void> {
    try {
      await api.delete(`${BaseUrl}/Product/${id}`);
      toast.warning("Product deleted");
    } catch (err: any) {
      toast.error("Failed to delete product");
      throw err;
    }
  },

  async GetProductById(id: number): Promise<ProductReadDTO> {
    const res = await api.get(`${BaseUrl}/Product/${id}`);
    return res.data;
  },
  //Category
  async GetAllCategories(): Promise<CategoryReadDTO[]> {
    const res = await api.get(`${BaseUrl}/Category`);
    return res.data;
  },

  async DeleteCategory(id: number): Promise<void> {
    try {
      await api.delete(`${BaseUrl}/Category/${id}`);
      toast.warning("Category deleted");
    } catch (err: any) {
      toast.error("Failed to delete category");
      throw err;
    }
  },

  async CreateCategory(dto: CategoryCreateDTO): Promise<CategoryReadDTO> {
    const res = await api.post(`${BaseUrl}/Category`, dto);
    toast.success("Category created");
    return res.data;
  },

  async UpdateCategory(
    dto: CategoryUpdateDTO,
    id: number
  ): Promise<CategoryReadDTO> {
    const res = await api.put(`${BaseUrl}/Category/${id}`, dto);
    toast.info("Category updated");
    return res.data;
  },
  //Order
  async GetAllOrders(): Promise<OrderReadDTO[]> {
    const res = await api.get(`${BaseUrl}/Order`);

    return res.data;
  },

  async getOrderById(id: number): Promise<OrderReadDTO> {
    const res = await api.get<OrderReadDTO>(`${BaseUrl}/Order/${id}`);
    return res.data;
  },

  async updateOrderStatus(id: number, status: string): Promise<void> {
    await api.patch(`${BaseUrl}/Order/${id}/status?status=${status}`);
    toast.info(`Order status changed`);
  },

  async deleteOrder(id: number): Promise<void> {
    await api.delete(`${BaseUrl}/Order/${id}`);
    toast.warning("Order deleted");
  },
  //User
  async getAllUsers(): Promise<UserReadDTO[]> {
    const res = await api.get(`${BaseUrl}/User`);
    return res.data;
  },

  async deleteAccount(id: number): Promise<void> {
    await api.put(`${BaseUrl}/User/soft-delete/${id}`);
    toast.warning("User account deactivated");
  },

  async changeRole(id: number, role: string): Promise<void> {
    await api.put(`${BaseUrl}/User/change-role`, { id, role });
    toast.success(`Role changed to "${role}"`);
  },

  // DASHBOARD
  async dashboard(): Promise<DashboardDTO> {
    const res = await api.get(`${BaseUrl}/DashBoard`);
    toast.success("Welcome back, Admin!");
    return res.data;
  },

  // STOCK UPDATE
  async updateProductStock(productId: number, newStock: number): Promise<void> {
    await api.put(
      `${BaseUrl}/Product/${productId}/stock`,
      { newStock },
      { headers: { "Content-Type": "application/json" } }
    );
    toast.info(`Stock updated to ${newStock}`);
  },
};
