import type { ProductReadDTO } from "../types/ProductTypes/PrdocutReadDTO";
import ProductSlider from "./ProductSlider";

type PageProps = {
  props: ProductReadDTO[];
};
const NewArrivals = ({ props }: PageProps) => {
  return (
    <div className="section_Slider py-10 rounded-2xl my-10 bg-linear-to-r from-blue-500 via-blue-400 to-blue-300">
      <div className="flex justify-center items-center">
        <h3 className="underline  font-semibold text-gray-800 tracking-tight text-6xl  text-center px-2.5 my-3.5">
          New Arrivals
        </h3>
      </div>
      <div className="w-full">
        <ProductSlider products={props} />
      </div>
    </div>
  );
};

export default NewArrivals;
