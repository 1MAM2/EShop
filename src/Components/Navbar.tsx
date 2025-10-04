import { PiShoppingCartBold } from "react-icons/pi";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import Categories from "./Categories";
import { useCart } from "../Context/CartContext";
import { useAuth } from "../Context/AuthContext";

const Navbar = () => {
  const { cartItems } = useCart();
  const{accessToken} = useAuth();

  return (
    <nav className="bg-blue-900  text-white">
      <div className="flex justify-between items-center h-[80px] px-[25px] xl:text-4xl xl:h-[80px]">
        <div className="w-[200px] h-[100px] ">
          <Link to={"/"}>
            <img src="/Static imgs/eshop_logo_transparent.png" alt="ESHOP" className="w-full h-full bg-transparent mix-blend-lighten"  />
          </Link>
        </div>
        <ul className="flex text-2xl sm:text-5xl justify-between items-center gap-[20px] xl:text-5xl">
          <Link to={"/browse"}>
            <li className="hover:text-sky-300 transition-all duration-300">
              Shop
            </li>
          </Link>
          <Link to={accessToken == undefined || null ? "/account":"/profile"}>
            {/* Sonra yapılacak */}
            <li className="text-2xl sm:text-4xl hover:text-sky-300 transition-all duration-300 xl:text-5xl">
              <FaUserCircle />
            </li>
          </Link>
          <Link to={"/cart"}>
            <li className="text-2xl sm:text-4xl hover:text-sky-300 transition-all duration-300 relative xl:text-5xl">
              <PiShoppingCartBold />
              {cartItems !== null && cartItems.length > 0 && (
                <span className="absolute text-center top-4 left-3 text-2xl w-8 h-8 sm:top-6 sm:left-5 sm:w-12 sm:h-12 sm:text-4xl  bg-sky-600 rounded-full flex items-center justify-center xl:top-8 xl:left-9 xl:w-10 xl:h-10 xl:text-4xl">
                  {cartItems.length}
                </span>
              )}
            </li>
          </Link>
        </ul>
      </div>
      <Categories />
    </nav>
  );
};

export default Navbar;
