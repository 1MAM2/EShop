import { useState } from "react";
import { useCart } from "../Context/CartContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { OrderService } from "../Services/OrderService";
import type { OrderCreateDTO } from "../types/OrderTypes/OrderCreateDTO";

const Checkout = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const { cartItems, clearCart } = useCart();
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.Price * item.Quantity,
    0
  );
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Buraya ödeme veya sipariş işlemi eklenebilir
  };
  const CreateOrder = async () => {
    try {
      const { fullName, email, address, city, zip, cardNumber, expiry, cvv } =
        formData;
      if (!fullName)
        return toast.error("Full name is required", { toastId: "validation" });
      if (!/\S+@\S+\.\S+/.test(email))
        return toast.error("Invalid email address", { toastId: "validation" });
      if (!address)
        return toast.error("Address is required", { toastId: "validation" });
      if (!city)
        return toast.error("City name is required", { toastId: "validation" });
      if (!zip)
        return toast.error("Zip is required", { toastId: "validation" });
      if (!cardNumber)
        return toast.error("CardNumber name is required", {
          toastId: "validation",
        });
      if (!expiry)
        return toast.error("Expiry date is required", {
          toastId: "validation",
        });
      if (!cvv)
        return toast.error("CVV date is required", { toastId: "validation" });

      toast.info(
        "You’re being redirected for payment verification. Please wait..."
      );
      const newOrder: OrderCreateDTO = {
        TotalPrice: cartItems.reduce(
          (sum, item) => sum + item.Price * item.Quantity,
          0
        ),
        orderItems: cartItems.map((item) => ({
          productId: +item.ProductId,
          quantity: item.Quantity,
          unitPrice: item.Price,
          imgUrl: item.ImgUrl,
          productName: item.ProductName,
        })),
        OrderStatus: "Pending",
        FullName: fullName,
        Email: email,
        Address: address,
        City: city,
        ZipCode: zip,
      };

      const createdOrder = await OrderService.createOrder(newOrder);

      const TransactionId = createdOrder.OrderId;
      console.log(createdOrder);
      navigate(`/payment/${TransactionId}`);
      clearCart();
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  return (
    <div className="flex flex-col lg:flex-row justify-center gap-6 p-6 min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="flex-1 bg-white shadow-lg rounded-2xl p-8 space-y-6"
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Checkout</h2>

        {/* Personal Info */}
        <div className="space-y-4">
          <input
            type="text"
            id="fullName"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            autoComplete="name"
            className="w-full p-4 border rounded-xl focus:outline-none focus:ring-2 my-2 focus:ring-cyan-500 transition"
          />
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            autoComplete="email"
            className="w-full p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 transition my-2 "
          />
        </div>

        {/* Shipping Info */}
        <div className="space-y-4">
          <input
            type="text"
            id="address"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            autoComplete="street-address"
            className="w-full p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 transition my-2 "
          />
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              id="city"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              autoComplete="address-level2"
              className="flex-1 p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 transition my-2 "
            />
            <input
              type="text"
              id="zip"
              name="zip"
              placeholder="ZIP / Postal Code"
              value={formData.zip}
              onChange={handleChange}
              autoComplete="postal-code"
              className="flex-1 p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 transition my-2 "
            />
          </div>
        </div>

        {/* Payment Info */}
        <div className="space-y-4">
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            placeholder="Card Number"
            value={formData.cardNumber}
            onChange={handleChange}
            autoComplete="cc-number"
            className="w-full p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 transition my-2 "
          />
          <div className="flex gap-4">
            <input
              type="text"
              id="expiry"
              name="expiry"
              placeholder="MM/YY"
              value={formData.expiry}
              onChange={handleChange}
              autoComplete="cc-exp"
              className="flex-1 p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 transition my-2 "
            />
            <input
              type="text"
              id="cvv"
              name="cvv"
              placeholder="CVV"
              value={formData.cvv}
              onChange={handleChange}
              autoComplete="cc-csc"
              className="flex-1 p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 transition my-2 "
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-cyan-600 text-white font-bold rounded-xl shadow-md hover:bg-cyan-700 transition"
          onClick={CreateOrder}
        >
          Place Order
        </button>
      </form>

      {/* Sağ taraf - Order Summary */}
      <div className="w-full lg:w-1/3 bg-gray-50 rounded-2xl shadow-md p-6 h-fit flex flex-col gap-4">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <div className="flex justify-between text-lg">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-lg">
          <span>Shipping</span>
          <span className="text-green-600">Free</span>
        </div>
        <div className="flex justify-between text-xl font-bold mb-4">
          <span>Total</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <p className="text-gray-500 text-sm">
          Review your order before placing it. Make sure all information is
          correct.
        </p>
      </div>
    </div>
  );
};

export default Checkout;
