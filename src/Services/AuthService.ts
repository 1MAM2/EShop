import axios from "axios";
import type { UserRegisterDTO } from "../types/UserTypes/UserRegisterDTO";
import type { UserLoginDTO } from "../types/UserTypes/UserLoginDTO";
import type { TokenResponseDTO } from "../types/UserTypes/TokenResponseDTO";
import type { RefreshTokenRequestDTO } from "../types/UserTypes/RefreshTokenRequestDTO";
import { ACCESS_TOKEN_KEY } from "../Context/AuthContext";
import api from "./api";

const BASE_URL: string = `${import.meta.env.VITE_API_URL}/api/Auth`;

export const authService = {
  async register(req: UserRegisterDTO): Promise<string> {
    const request = await axios.post(`${BASE_URL}/register`, req);
    return request.data;
  },
  async login(req: UserLoginDTO): Promise<TokenResponseDTO> {
    const request = await api.post<TokenResponseDTO>(`${BASE_URL}/login`, req);
    return request.data;
  },
  async logout(): Promise<string> {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    const request = await api.post(
      `${BASE_URL}/logout`,
      {}, // body boş
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return request.data;
  },
  async refresh_Token(req: RefreshTokenRequestDTO): Promise<TokenResponseDTO> {
    const request = await api.post(`${BASE_URL}/refresh-token`, req);
    return request.data;
  },
};
