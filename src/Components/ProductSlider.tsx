import type { ProductReadDTO } from "../types/ProductTypes/PrdocutReadDTO";
import { useKeenSlider } from "keen-slider/react";
import Product from "./Product";
import "keen-slider/keen-slider.min.css";
import ContinuousAutoplay from "../utilits/ContinuousAutoplay";

type Props = {
  products: ProductReadDTO[];
};

const ProductSlider = ({ products }: Props) => {
  const extendedProducts =
    products.length < 20
      ? [...products, ...products, ...products] // 3 kez çoğalt
      : products;
  console.log(extendedProducts.length);

  const [sliderRef] = useKeenSlider(
    {
      loop: true,
      mode: "snap",
      renderMode: "performance",
      slides: { perView: Math.min(5, extendedProducts.length), spacing: 25 },
      breakpoints: {
        "(min-width: 425px)": { slides: { perView: 2.2, spacing: 15 } },
        "(min-width: 768px)": { slides: { perView: 3.2, spacing: 20 } },
        "(min-width: 1024px)": { slides: { perView: 4.2, spacing: 25 } },
        "(min-width: 1280px)": { slides: { perView: 5, spacing: 25 } },
      },
    },
    [ContinuousAutoplay(0.00080)] // speed px/frame, startDelay ms
  );

  return (
    <div className="w-full overflow-hidden">
      <div
        ref={sliderRef}
        className="keen-slider flex w-full justify-center items-center"
      >
        {extendedProducts.length > 0 && (
          <div ref={sliderRef} className="keen-slider w-full overflow-hidden">
            {extendedProducts.map((p, idx) => (
              <div key={idx} className="keen-slider__slide">
                <Product props={p} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductSlider;
