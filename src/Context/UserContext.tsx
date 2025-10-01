import { createContext, useContext, useState } from "react";
import type { UserReadDTO } from "../types/UserTypes/UserReadDTO";
import { UserService } from "../Services/UserService";
import type { UserUpdateDTO } from "../types/UserTypes/UserUpdateDTO";

interface UserContextValue {
  user: UserReadDTO | null;
  fetchUserData: () => Promise<void>;
  softDeleteAccount: () => Promise<void>;
  updateUserAsync: (req:UserUpdateDTO) => Promise<void>
  isLoading: boolean;
  error: string | null;
}

const UserContext = createContext<UserContextValue | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserReadDTO | null>(null);
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchUserData = async () => {
    try {
      const res = await UserService.getUserData();
      if (!res) throw new Error("An Error detected");
      setUser(res);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsloading(false);
    }
  };
  const softDeleteAccount = async () => {
    const res = await UserService.deleteAccount();
    return res;
  };
  const updateUserAsync = async (req:UserUpdateDTO) =>
  {
    const res = await UserService.updateUser(req);
    return res;
  }
  return (
    <UserContext.Provider
      value={{
        user,
        isLoading,
        error,
        fetchUserData,
        softDeleteAccount,
        updateUserAsync
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser sadece UserProvider içinde kullanılabilir");
  }
  return context;
};
