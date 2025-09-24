import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ProductProvider } from "./Context/ProductContext";
import { CategoryProvider } from "./Context/CategoryContext";
import { CartProvider } from "./Context/CartContext";
import { AuthProvider } from "./Context/AuthContext";
import { UserProvider } from "./Context/UserContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <UserProvider>
        <CartProvider>
          <CategoryProvider>
            <ProductProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </ProductProvider>
          </CategoryProvider>
        </CartProvider>
      </UserProvider>
    </AuthProvider>
  </StrictMode>
);
