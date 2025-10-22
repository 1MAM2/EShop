import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { ProductReadDTO } from "../types/ProductTypes/PrdocutReadDTO";
import { ProductService } from "../Services/ProductService";

interface ProductContextValue {
  products: ProductReadDTO[];
  product: ProductReadDTO | null;
  isLoading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
  fetchSingleProduct: (id: number) => Promise<void>;
  clearSingleProduct: () => void;
}

const ProductContext = createContext<ProductContextValue | null>(null);

export const ProductProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [products, setProducts] = useState<ProductReadDTO[]>([]);
  const [product, setProduct] = useState<ProductReadDTO | null>(null);
  const [isLoading, setIsloading] = useState(false);
  const [Page] = useState(1);
  const itemsPerPage = 10;
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setIsloading(true);
      setError(null);
      const res = await ProductService.getAll(Page, itemsPerPage);
      if (!res) throw new Error("Ürünler yüklenemedi");
      setProducts(res?.Products ?? []);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsloading(false);
    }
  };
  const fetchSingleProduct = useCallback(async (id: number) => {
    try {
      setIsloading(true);
      setError(null);
      const res = await ProductService.getById(id);
      if (!res) throw new Error("Ürün yüklenemedi");
      setProduct(res);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsloading(false);
    }
  }, []);

  const clearSingleProduct = () => setProduct(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        product,
        products,
        isLoading,
        error,
        fetchProducts,
        fetchSingleProduct,
        clearSingleProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context)
    throw new Error(
      "useProducts sadece ProductsProvider içinde kullanılabilir"
    );
  return context;
};
