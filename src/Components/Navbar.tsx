import { PiShoppingCartBold } from "react-icons/pi";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import Categories from "./Categories";
import { useCart } from "../Context/CartContext";

const Navbar = () => {
  const { cartItems } = useCart();
  //Hatalı koşul sağlanıyro render edilyor sonra tekrar koşul sağlanıyor tekrar render ediliyor Hata
  // if (cartItems !== null) {
  //   console.log(cartItems.length);
  //   setLength(cartItems.length)
  // }

  return (
    <nav className="bg-blue-800  text-white">
      <div className="flex justify-between items-center h-[80px] px-[25px] xl:text-4xl xl:h-[80px]">
        <div>
          <Link to={"/"}>
            <b className="text-3xl cursor-pointer hover:text-sky-300 duration-300 transition-all xl:text-6xl">
              Eshop
            </b>
          </Link>
        </div>
        <ul className="flex text-2xl sm:text-5xl justify-between items-center gap-[20px] xl:text-6xl">
          <Link to={"/browse"}>
            <li className="hover:text-sky-300 transition-all duration-300">
              Shop
            </li>
          </Link>
          <Link to={"/"}>
            {/* Sonra yapılacak */}
            <li className="text-2xl sm:text-5xl hover:text-sky-300 transition-all duration-300 xl:text-6xl">
              <FaUserCircle />
            </li>
          </Link>
          <Link to={"/cart"}>
            <li className="text-2xl sm:text-4xl hover:text-sky-300 transition-all duration-300 relative xl:text-6xl">
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
