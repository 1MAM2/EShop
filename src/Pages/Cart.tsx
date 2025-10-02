import { useCart } from "../Context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import CartItem from "../Components/CartItem";

const Cart = () => {
  const {
    cartItems,
    error,
    decreaseQuantity,
    increaseQuantity,
    removeCartItem,
  } = useCart();
  const navigate = useNavigate();
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-600 text-3xl font-semibold">{error}</p>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen text-center px-4">
        <p className="text-2xl md:text-4xl text-gray-600 font-bold mb-6">
          Your cart is empty 🛒
        </p>
        <Link
          to="/browse"
          className="px-6 py-3 bg-cyan-600 text-white rounded-xl shadow-lg hover:bg-cyan-700 transition"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.Price * item.Quantity,
    0
  );
  const handleClick = () => {
    navigate("/checkout");
  };

  return (
    <div className="flex flex-col lg:flex-row justify-between gap-6 p-6 min-h-screen bg-gray-50">
      {/* Cart Items */}
      <div className="flex-1 bg-white rounded-2xl shadow-md p-4 space-y-4">
        <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
        {cartItems.map((item, index) => (
          <CartItem
            key={index || item.ProductName}
            {...item}
            increaseQuantity={increaseQuantity}
            decreaseQuantity={decreaseQuantity}
            removeCartItem={removeCartItem}
          />
        ))}
      </div>

      {/* Order Summary */}
      <div className="w-full lg:w-1/3 bg-white rounded-2xl shadow-md p-6 h-fit flex flex-col gap-4">
        <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
        <div className="flex justify-between text-lg">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-lg">
          <span>Shipping</span>
          <span className="text-green-600">Free</span>
        </div>
        <div className="flex justify-between text-xl font-bold">
          <span>Total</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <button
          onClick={handleClick}
          className="w-full py-3 bg-cyan-600 text-white rounded-xl shadow-md hover:bg-cyan-700 transition mt-4"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
