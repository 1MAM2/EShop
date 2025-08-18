import React from "react";
import type { ProductReadDTO } from "../types/ProductTypes/PrdocutReadDTO";
import { useKeenSlider } from "keen-slider/react";
import Product from "./Product";

type Props = {
  products: ProductReadDTO[];
};

const ProductSlider = ({ products }: Props) => {
  const [sliderRef] = useKeenSlider({
    loop: true,
    mode: "free-snap",
    slides: {
      perView: 1,
      spacing: 20,
      origin:'center',
      
    },
    breakpoints: {
       "(min-width: 320px)": {
        slides: { perView: 1, spacing: 10, origin:'center', },
        
      },
      "(min-width: 425px)": {
        slides: { perView: 2, spacing: 20, origin:'center', },
      },
      "(min-width: 645px)": {
        slides: { perView: 3, spacing: 0, origin:'center', },
      },
      "(min-width: 1024px)": {
        slides: { perView: 4, spacing:  0, origin:'center',},
      },
      "(min-width: 1280px)": {
        slides: { perView: 4, spacing: 0, origin:'center', },
      },
    },
  });
  return (
    <div ref={sliderRef} className="keen-slider newArrivals ">
      {products.map((product) => (
        <div key={product.Id} className="keen-slider__slide  sliderProduct ">
          <Product props={product} />
        </div>
      ))}
    </div>
  );
};

export default ProductSlider;
