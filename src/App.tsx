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
function App() {
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
            <Route path="/product/:id" element={<ProductDetails />} />
          </Routes>
        </div>
        <Footer />
      </CartProvider>
    </>
  );
}

export default App;
