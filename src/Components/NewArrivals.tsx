import React from "react";
import Product from "./Product";
import type { ProductReadDTO } from "../types/ProductTypes/PrdocutReadDTO";
import ProductSlider from "./ProductSlider";

type PageProps = {
  props: ProductReadDTO[];
};
const NewArrivals = ({ props }: PageProps) => {
  return (
    <div className="section_Slider py-10 rounded-2xl my-10">
      <div className="flex justify-center items-center">
        <h3 className="underline text-indigo-700 text-6xl font-bold text-center px-2.5">
          New Arrivals
        </h3>
      </div>
      <div className="my-10 px-10">
        <ProductSlider products={props} />
      </div>
    </div>
  );
};

export default NewArrivals;
