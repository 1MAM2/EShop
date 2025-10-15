import { Navigate, Route, Routes } from "react-router-dom";
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
// import Profile from "./Pages/Profile";
// import { PrivateRoute } from "./Components/PrivateRoute";
import Checkout from "./Pages/Checkout";

// import { useAuth } from "./Context/AuthContext";
// import { useEffect } from "react";
import Payment from "./Pages/Payment";
import VerifyEmail from "./Pages/VerifyEmail";
import EmailVerifiedSuccess from "./Pages/EmailVerifiedSuccess";
import AdminLayout from "./Admin/AdminLayout";
import AdminProducts from "./Admin/Pages/AdminProducts";
import AdminDashBoard from "./Admin/Pages/AdminDashBoard";
import AdminOrders from "./Admin/Pages/AdminOrders";
import AdminUser from "./Admin/Pages/AdminUser";
import AdminCategory from "./Admin/Pages/AdminCategory";
import Profile from "./Pages/Profile";
import AdminProductEdit from "./Admin/Pages/AdminProductEdit";
function App() {
  // const { checkAuth } = useAuth();

  // useEffect(() => {
  //   checkAuth();
  // }, []);
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

            <Route path="/profile" element={<Profile />} />
            <Route
              path="/email-verified-success"
              element={<EmailVerifiedSuccess />}
            />
            <Route path="/payment/:transactionId" element={<Payment />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/checkout" element={<Checkout />} />
            {/* Admin */}
            <Route path="/admin-panel" element={<AdminLayout />}>
              {/* Varsayılan yönlendirme */}
              <Route index element={<Navigate to="dashboard" replace />} />

              {/* Alt rotalar */}
              <Route path="dashboard" element={<AdminDashBoard />} />
              <Route path="adminProducts" element={<AdminProducts />} />
              <Route path="adminProducts/:id" element={<AdminProductEdit />} />
              <Route path="adminOrders" element={<AdminOrders />} />
              <Route path="adminUser" element={<AdminUser />} />
              <Route path="adminCategory" element={<AdminCategory />} />
            </Route>
          </Routes>

          <ToastContainer position="top-right" />
        </div>
        <Footer />
      </CartProvider>
    </>
  );
}

export default App;
