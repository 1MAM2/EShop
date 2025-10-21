import type { ProductReadDTO } from "../types/ProductTypes/PrdocutReadDTO";
import type { ProductCreateDTO } from "../types/ProductTypes/ProductCreateDTO";
import type { ProductUpdateDTO } from "../types/ProductTypes/ProductUpdateDTO";
import api from "./api";

const BASE_URL: string = `${import.meta.env.VITE_API_URL}/api/product`;

export const ProductService = {
  async getAll(): Promise<ProductReadDTO[]> {
    const res = await api.get(BASE_URL);
    return res.data;
  },
  async getById(Id: number): Promise<ProductReadDTO> {
    const res = await api.get(`${BASE_URL}/${Id}`);
    return res.data;
  },
  async getByCategory(catId: number): Promise<ProductReadDTO[]> {
    const res = await api.get(`${BASE_URL}/${catId}`);
    return res.data;
  },
  async createProduct(data: ProductCreateDTO): Promise<ProductCreateDTO> {
    const res = await api.post(BASE_URL, data);
    return res.data;
  },
  async updateProduct(id: number, data: ProductUpdateDTO): Promise<void> {
    await api.put(`${BASE_URL}/${id}`, data);
  },
  async deleteProduct(id: number): Promise<void> {
    await api.delete(`${BASE_URL}/${id}`);
  },
};
