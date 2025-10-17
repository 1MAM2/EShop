import { PiShoppingCartBold } from "react-icons/pi";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import Categories from "./Categories";
import { useCart } from "../Context/CartContext";
import { useAuth } from "../Context/AuthContext";
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
  const { cartItems } = useCart();
  const { accessToken } = useAuth();
  let role;
  if (accessToken != null) {
    const decode: any = jwtDecode(accessToken!);
    role =
      decode["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    console.log(role);
  }

  return (
    <nav className="bg-blue-900  text-white">
      <div className="flex justify-between items-center h-[80px] px-[25px] xl:text-4xl xl:h-[80px]">
        <div className="w-[200px] h-[100px] ">
          <Link to={"/"} aria-label="Home Page">
            <img
              src="/Static imgs/eshop_logo_transparent.png"
              alt="ESHOP"
              className="w-full h-full bg-transparent mix-blend-lighten"
            />
          </Link>
        </div>
        <ul className="flex text-2xl sm:text-5xl justify-between items-center gap-[20px] xl:text-5xl">
          {role == "Admin" && (
            <Link to={"/admin-panel"} aria-label="Admin page">
              <li className="hover:text-sky-500 transition-all duration-300 bg-green-600 h-16 text-center w-md text-4xl flex justify-center items-center hover:bg-green-800">
                Admin Panel
              </li>
            </Link>
          )}

          <li className="hover:text-sky-300 transition-all duration-300">
            <div>
              <Link to={"/browse"} aria-label="Shop Page">
                Shop
              </Link>
            </div>
          </li>

          <li className="text-2xl sm:text-4xl hover:text-sky-300 transition-all duration-300 xl:text-5xl">
            <div>
              <Link
                to={accessToken == undefined || null ? "/account" : "/profile"}
                aria-label="Profile"
              >
                <FaUserCircle />
              </Link>
            </div>
          </li>

          <li className="text-2xl sm:text-4xl hover:text-sky-300 transition-all duration-300 relative xl:text-5xl">
            <div>
              <Link to={"/cart"} aria-label="Cart">
                <PiShoppingCartBold />
                {cartItems !== null && cartItems.length > 0 && (
                  <span className="absolute text-center top-4 left-3 text-2xl w-8 h-8 sm:top-6 sm:left-5 sm:w-12 sm:h-12 sm:text-4xl  bg-sky-600 rounded-full flex items-center justify-center xl:top-8 xl:left-9 xl:w-10 xl:h-10 xl:text-4xl">
                    {cartItems.length}
                  </span>
                )}
              </Link>
            </div>
          </li>
        </ul>
      </div>
      <Categories />
    </nav>
  );
};

export default Navbar;
