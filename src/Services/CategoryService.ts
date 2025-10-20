
import type { CategoryReadDTO } from "../types/CategoryTypes/CategoryReadDTO";
import type { ProductReadDTO } from "../types/ProductTypes/PrdocutReadDTO";
import type { CategoryCreateDTO } from "../types/CategoryTypes/CategoryCreateDTO";
import type { CategoryUpdateDTO } from "../types/CategoryTypes/CategoryUpdateDTO";
import api from "./api";

const BASE_URL: string = `${import.meta.env.VITE_API_URL}/api/category`;

export const CategoryService = {
  async getAll(): Promise<CategoryReadDTO[]> {
    const res = await api.get(BASE_URL);
    return res.data;
  },
  async getProductsByCategory(catId: number): Promise<ProductReadDTO[]> {
    const res = await api.get(`${BASE_URL}/${catId}/products`);
    return res.data;
  },
  //admin
  async getById(catId: number): Promise<CategoryReadDTO> {
    const res = await api.get(`${BASE_URL}/${catId}`);
    return res.data;
  },
  //admin
  async CreateCategory(
    category: CategoryCreateDTO
  ): Promise<CategoryCreateDTO> {
    const res = await api.post(BASE_URL, category);
    return res.data;
  },
  async DeleteCategory(catId: number): Promise<void> {
    await api.delete(`${BASE_URL}/${catId}`);
  },
  async UpdateCategory(
    catId: number,
    category: CategoryUpdateDTO
  ): Promise<void> {
    await api.put(`${BASE_URL}/${catId}`, category);
  },
};
