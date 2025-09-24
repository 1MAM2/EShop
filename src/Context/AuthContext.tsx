import React, { createContext, useContext, useState } from "react";
import { authService } from "../Services/AuthService";
import type { UserLoginDTO } from "../types/UserTypes/UserLoginDTO";
import type { UserRegisterDTO } from "../types/UserTypes/UserRegisterDTO";
import type { TokenResponseDTO } from "../types/UserTypes/TokenResponseDTO";

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

type AuthContextType = {
  isAuthenticated: boolean;
  accessToken: string | null;
  login: (req: UserLoginDTO) => Promise<void>;
  register: (req: UserRegisterDTO) => Promise<void>;
  logout: (userId: number) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem(ACCESS_TOKEN_KEY)
  );

  const isAuthenticated = !!accessToken;
  

  const login = async (req: UserLoginDTO) => {
    const tokens: TokenResponseDTO = await authService.login(req);
    localStorage.setItem(ACCESS_TOKEN_KEY, tokens.accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken);
    setAccessToken(tokens.accessToken);
  };

  const register = async (req: UserRegisterDTO) => {
    await authService.register(req);
  };

  const logout = async (userId: number) => {
    await authService.logout(userId);
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    setAccessToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        accessToken,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
