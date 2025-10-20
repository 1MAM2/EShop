import { createContext, useContext, useEffect, useState } from "react";
import type { CategoryReadDTO } from "../types/CategoryTypes/CategoryReadDTO";
import { CategoryService } from "../Services/CategoryService";
import type { ProductReadDTO } from "../types/ProductTypes/PrdocutReadDTO";

interface CategoryContexValue {
  categories: CategoryReadDTO[];
  catProducts:ProductReadDTO[];
  isLoading: boolean;
  error: string | null;
  fetchCategories: () => Promise<void>;
  getProductsByCategory: (catId: number) => Promise<void>;
}

const CategoryContext = createContext<CategoryContexValue | null>(null);

export const CategoryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // contex işleniyor
  const [categories, setCategories] = useState<CategoryReadDTO[]>([]);
  const [catProducts, setCatProducts] = useState<ProductReadDTO[]>([]);

  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    try {
      setIsloading(true);
      const res = await CategoryService.getAll();
      if (!res) throw new Error("Kategoriler yüklenemedi");
      setCategories(res);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsloading(false);
    }
  };
  const getProductsByCategory = async (catId: number) => {
    try {
      setIsloading(true);
      const res = await CategoryService.getProductsByCategory(catId);
      if (!res) throw new Error("Ürünler yüklenemedi");
      setCatProducts(res);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsloading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <CategoryContext.Provider
      value={{
        fetchCategories,
        getProductsByCategory,
        categories,
        catProducts,
        isLoading,
        error,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategories = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error(
      "useCategoies sadece CategoryProvider içinde kullanılabilir"
    );
}
    return context;
};
