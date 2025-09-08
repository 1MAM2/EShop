import axios from "axios";
import type { UserRegisterDTO } from "../types/UserTypes/UserRegisterDTO";
import type { UserLoginDTO } from "../types/UserTypes/UserLoginDTO";
import type { TokenResponseDTO } from "../types/UserTypes/TokenResponseDTO";
import type { RefreshTokenRequestDTO } from "../types/UserTypes/RefreshTokenRequestDTO";




const BASE_URL: string = `${import.meta.env.VITE_API_URL}/api/auth`;


export const authService = {
  async register(req:UserRegisterDTO): Promise<string>
  {
    const request = await axios.post(`${BASE_URL}/register`,req);
    return request.data;
  },
  async login(req:UserLoginDTO) : Promise<TokenResponseDTO> {
    const request = await axios.post<TokenResponseDTO>(`${BASE_URL}/login`,req);
    return request.data;
    
  },
  async logout(userId:number) : Promise<string>{
    const request = await axios.post(`${BASE_URL}/logout?userId=${userId}`);
    return request.data;
  },
  async refresh_Token(req:RefreshTokenRequestDTO): Promise<TokenResponseDTO>
  {
    const request = await axios.post(`${BASE_URL}/refresh-token`,req)
    return request.data;
  }
};