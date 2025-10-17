import { Link } from "react-router-dom";
import type { ProductReadDTO } from "../types/ProductTypes/PrdocutReadDTO";

type Props = {
  props: ProductReadDTO;
};

const Product = ({ props }: Props) => {
  return (
    <Link to={`/product/${props.Id}`}>
      <div className="bg-white relative rounded-lg hover:scale-105 xl:shadow-xl xl:w-[250px] xl:h-[250px] 2xl:w-[250px] 2xl:h-[250px] 2xl:shadow-xl p-8 shadow-md transition-all flex flex-col items-center justify-around my-5 sm:w-[150px] sm:h-[200px] xl:p-12 sm:p-5 sm:justify-center max-sm:w-[200px] max-sm:h-[250px]">
        <div className=" xl:w-[150px] xl:h-[150px] 2xl:w-[150px] 2xl:h-[100px]">
          <img
            src={props.ImgUrl}
            alt={props.ProductName}
            loading="lazy"
            className="w-full h-full  object-contain p-2 sm:h-32 md:h-36 xl:h-full aspect-square"
          />
        </div>
        <h4 className="text-pretty text-2xl font-semibold py-1 xl:text-3xl 2xl:text-3xl">
          {props.ProductName}
        </h4>

        {props.Discount > 0 && (
          <div>
            <p className="text-lg sm:text-2xl xl:text-2xl text-gray-500 line-through  2xl:text-3xl">
              {props.Price.toFixed(2)} $
            </p>
            <p className="text-red-600 font-bold text-lg sm:text-2xl my-4 xl:text-2xl 2xl:text-4xl text-center">
              {props.FinalPrice} $
            </p>
            <span className="absolute top-2 right-2 bg-red-500 text-white text-lg px-2 py-1 rounded 2xl:text-xl xl:text-xl xl:rounded-xl 2xl:rounded-xl   ">
              -{props.Discount * 100}%
            </span>
          </div>
        )}

        {props.Discount === 0 && (
          <p className="text-blue-700 sm:text-2xl font-bold xl:text-xl 2xl:text-4xl my-4">
            {props.Price} $
          </p>
        )}
      </div>
    </Link>
  );
};

export default Product;
