import { useCart } from "../Context/CartContext";
import { Link } from "react-router-dom";
import CartItem from "../Components/CartItem";

const Cart = () => {
  const {
    cartItems,
    error,
    decreaseQuantity,
    increaseQuantity,
    removeCartItem,
  } = useCart();
  return (
    <div className="min-h-[100vh]">
      {error ? (
        <div className="text-center text-5xl">
          <p>{error}</p>
        </div>
      ) : cartItems.length > 0 ? (
        <div className="cartItems w-full sm:w-full md:w-full xl:w-full 2xl:w-full p-2">
          {cartItems.map((item, index) => (
            <CartItem
              key={index}
              {...item}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
              removeCartItem={removeCartItem}
            />
          ))}
        </div>
      ) : (
        <div className="text-center text-5xl underline text-shadow-lg my-10 text-blue-500 text-shadow-cyan-600">
          <Link to={"/browse"}>
            <p>Add some joy to your cart today.</p>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
