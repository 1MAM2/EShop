import { createContext, useContext, useEffect, useState } from "react";
import type { CartReadDTO } from "../types/CartTypes/CartReadDTO";
import { toast } from "react-toastify";

interface CartContextValue {
  cartItems: CartReadDTO[];
  isLoading: boolean;
  error: string | null;
  fetchCartItems: () => void;
  clearCart: () => void;
  addToCart: (cartItem: CartReadDTO) => void;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  removeCartItem: (productId: number) => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartReadDTO[]>([]);
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCartItems = () => {
    try {
      // localden geliyor daha sonra veritabanından da cekecez
      setIsloading(true);
      // burası önemli
      const cartItems = JSON.parse((localStorage.getItem("cart") || "[]")) as CartReadDTO[];
      setCartItems(cartItems);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsloading(false);
    }
  };
  const addToCart = (product: CartReadDTO) => {
   
    let newCart = [...cartItems]; // cartItems, context'teki state
    const existingProductIndex = newCart.findIndex(
      (item) => item.ProductId === product.ProductId
    );

    if (existingProductIndex !== -1) {
      newCart[existingProductIndex].Quantity += 1;
    } else {
      newCart.push({
        ProductId: product.ProductId,
        ProductName: product.ProductName,
        Price: product.Price,
        Quantity: 1,
        ImgUrl: product.ImgUrl,
      });
      toast.success("Ürün Başarıyla eklendi.");
    }
    //  if (!Array.isArray(cartItems)) {
    //     console.error("cartItems bir dizi değil",cartItems)
    // }

    setCartItems(newCart); // context güncelle
    localStorage.setItem("cart", JSON.stringify(newCart)); // localStorage güncelle
    
  };

  const increaseQuantity = (productId: number) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    if (cart !== null) {
      const cartProductIndex = cart.findIndex(
        (item: CartReadDTO) => item.ProductId === productId
      );
      if (cartProductIndex > -1) {
        cart[cartProductIndex].Quantity += 1;
        //sonradan geldi UI kısmına yanısımıyordu
        setCartItems([...cart]);
        localStorage.setItem("cart", JSON.stringify(cart));
      }
    } else {
      setError("Hata!!! Lütfen daha sonra tekrar deneyin");
    }
  };
  const decreaseQuantity = (productId: number) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    if (cart !== null) {
      const cartProductIndex = cart.findIndex(
        (item: CartReadDTO) => item.ProductId == productId
      );
      if (cartProductIndex > -1) {
        cart[cartProductIndex].Quantity -= 1;
        if (cart[cartProductIndex].Quantity == 0) {
          cart.splice(cartProductIndex, 1);
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        setCartItems([...cart]);
      }
    } else {
      setError("Hata!!! Lütfen daha sonra tekrar deneyin");
    }
  };

  const removeCartItem = (productId: number) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const newCart = cart.filter(
      (item: CartReadDTO) => item.ProductId !== productId
    );
    localStorage.setItem("cart", JSON.stringify(newCart));
    setCartItems([...newCart]);
  };
  const clearCart = () =>
  {
    setCartItems([]);
    localStorage.removeItem("cart");
  }

  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <CartContext.Provider
      value={{
        fetchCartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeCartItem,
        clearCart,
        cartItems,
        isLoading,
        error,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart sadece CartProvider içinde kullanılabilir");
  }
  return context;
};
