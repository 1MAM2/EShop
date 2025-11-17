import { PiShoppingCartBold } from "react-icons/pi";
import { FaUserCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";
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
  else
  {
    role=null;
  }

  return (
    <nav className="bg-blue-900  text-white">
      <div className="flex justify-between items-center h-20 px-[25px] xl:text-4xl xl:h-20">
        <NavLink
          to={"/"}
          aria-label="Home Page"
          className="w-[200px] h-[100px] "
        >
          <img
            src="/Static imgs/eshop_logo_transparent.png"
            alt="ESHOP"
            className="w-full h-full bg-transparent mix-blend-lighten"
          />
        </NavLink>

        <ul className="flex text-xl sm:text-3xl items-center gap-8">
          {role === "Admin" && (
            <li>
              <NavLink
                to="/admin-panel"
                className="px-4 py-2 bg-blue-800 hover:bg-blue-700 rounded-lg transition-all duration-300"
              >
                Admin Panel
              </NavLink>
            </li>
          )}

          <li>
            <NavLink
              to="/browse"
              className={({ isActive }) =>
                `transition-all duration-300 hover:text-sky-300 ${
                  isActive ? "text-blue-300" : "text-white"
                }`
              }
            >
              Shop
            </NavLink>
          </li>

          <li>
            <NavLink
              to={!accessToken ? "/account" : "/profile"}
              className={({ isActive }) =>
                `transition-all duration-300 hover:text-sky-300 ${
                  isActive ? "text-blue-300" : "text-white"
                }`
              }
            >
              <FaUserCircle />
            </NavLink>
          </li>

          <li className="relative">
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `transition-all duration-300 hover:text-sky-300 ${
                  isActive ? "text-blue-300" : "text-white"
                }`
              }
            >
              <PiShoppingCartBold />
              {cartItems?.length > 0 && (
                <span className="absolute top-4 left-4 bg-sky-600 text-white rounded-full w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center text-sm sm:text-lg">
                  {cartItems.length}
                </span>
              )}
            </NavLink>
          </li>
        </ul>
      </div>
      <Categories />
    </nav>
  );
};

export default Navbar;
