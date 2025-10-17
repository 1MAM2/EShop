import type { CartReadDTO } from "../types/CartTypes/CartReadDTO";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";

type CompProps = CartReadDTO & {
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  removeCartItem: (productId: number) => void;
};

const CartItem = ({
  ProductId,
  ProductName,
  ImgUrl,
  Price,
  Quantity,
  increaseQuantity,
  decreaseQuantity,
  removeCartItem,
}: CompProps) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all">
      
      {/* Silme Butonu */}
      <button
        onClick={() => removeCartItem(Number(ProductId))}
        className="text-red-600 hover:text-red-800 p-2 rounded-full transition"
        title="Remove Item"
      >
        <FaTrash className="text-xl md:text-2xl" />
      </button>

      {/* Ürün Görseli */}
      <div className="w-24 md:w-32 h-24 md:h-32 flex-shrink-0">
        <img
          src={ImgUrl}
          alt={ProductName}
          loading="lazy"
          className="w-full h-full object-contain rounded-xl"
        />
      </div>

      {/* Ürün Adı */}
      <div className="flex-1 text-center md:text-left">
        <p className="text-sm md:text-lg lg:text-xl font-semibold text-gray-800 truncate">
          {ProductName}
        </p>
      </div>

      {/* Miktar Butonları */}
      <div className="flex items-center gap-2 md:gap-4">
        <button
          onClick={() => decreaseQuantity(Number(ProductId))}
          className="bg-gray-200 hover:bg-gray-300 p-1 md:p-2 rounded-lg transition"
        >
          <FaMinus className="text-sm md:text-lg text-cyan-700" />
        </button>
        <span className="text-lg md:text-xl font-medium">{Quantity}</span>
        <button
          onClick={() => increaseQuantity(Number(ProductId))}
          className="bg-gray-200 hover:bg-gray-300 p-1 md:p-2 rounded-lg transition"
        >
          <FaPlus className="text-sm md:text-lg text-cyan-700" />
        </button>
      </div>

      {/* Fiyat */}
      <div className="text-green-700 font-bold text-sm md:text-lg lg:text-xl bg-green-100 px-4 py-2 rounded-xl text-center min-w-[80px]">
        ${(Quantity * Price).toFixed(2)}
      </div>
    </div>
  );
};

export default CartItem;