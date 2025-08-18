import type { CartReadDTO } from "../types/CartTypes/CartReadDTO";
import { FaMinus, FaPlus, FaTimes } from "react-icons/fa";

type CompProps = CartReadDTO & {
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  removeCartItem: (productId: number) => void;
};

const CartItem = (props: CompProps) => {
  return (
    <div className="px-2 grid grid-cols-5  w-full place-items-center cartItem shadow-lg shadow-gray-400 hover:bg-gray-300 transition-all my-10 h-[80px] gap-2">
      <div className="flex justify-center items-center ">
        <button
          className="cartButton"
          onClick={() => props.removeCartItem(Number(props.ProductId))}
        >
          <FaTimes className="text-red-900 bg-none text-3xl md:text-5xl" />
        </button>
      </div>
      <div className="cartProductImage w-16 md:w-32">
        <img src={props.ImgUrl} className="w-full " />
      </div>
      <div className="productName text-sm md:text-3xl font-bold text-gray-800 truncate">
        <p>{props.ProductName}</p>
      </div>
      <div className="incDec flex  w-[30px] md:w-[60px]">
        <button
          className="cartButton mx-2 md:mx-4"
          onClick={() => props.decreaseQuantity(Number(props.ProductId))}
        >
          <FaMinus className="text-sm md:text-2xl" />
        </button>
        <span className="text-lg md:text-3xl">{props.Quantity}</span>
        <button
          className="cartButton mx-2 md:mx-4"
          onClick={() => props.increaseQuantity(Number(props.ProductId))}
        >
          <FaPlus className="text-sm md:text-2xl" />
        </button>
      </div>
      <div className="text-green-600 font-bold text-sm md:text-3xl lg:text-3xl bg-green-100 p-4 rounded-lg text-center">{props.Quantity * props.Price} $</div>
    </div>
  );
};

export default CartItem;
