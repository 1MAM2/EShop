import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Account from "./Pages/Account";
import Cart from "./Pages/Cart";
import Shop from "./Pages/Shop";
import Footer from "./Components/Footer";
import ProductDetails from "./Pages/ProductDetails";
import { CartProvider } from "./Context/CartContext";
import { ToastContainer } from "react-toastify";
import Profile from "./Pages/Profile";
import { PrivateRoute } from "./Components/PrivateRoute";
import Checkout from "./Pages/Checkout";

import { useAuth } from "./Context/AuthContext";
import { useEffect } from "react";
import Payment from "./Pages/Payment";
import VerifyEmail from "./Pages/VerifyEmail";
import EmailVerifiedSuccess from "./Pages/EmailVerifiedSuccess";
function App() {
  const { checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
  }, []);
  return (
    <>
      <CartProvider>
        <Navbar />
        <div className="mainRoot">
          <Routes>
            <Route path={"/"} element={<Home />} />
            <Route path={"/account"} element={<Account />} />
            <Route path={"/cart"} element={<Cart />} />
            <Route path="/browse" element={<Shop />} />
            <Route path="/verify-email/:token" element={<VerifyEmail />} />

            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route path="/email-verified-success" element={<EmailVerifiedSuccess />} />
            <Route path="/payment/:transactionId" element={<Payment />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
          <ToastContainer position="top-right" />
        </div>
        <Footer />
      </CartProvider>
    </>
  );
}

export default App;
