import type { ProductReadDTO } from "../types/ProductTypes/PrdocutReadDTO";
import { useKeenSlider } from "keen-slider/react";
import Product from "./Product";
import "keen-slider/keen-slider.min.css";

type Props = {
  products: ProductReadDTO[];
};

const ProductSlider = ({ products }: Props) => {
  const [sliderRef] = useKeenSlider({
    loop: true,
    mode: "free-snap",
    renderMode: "performance",
    slides: {
      perView: 1.2, // tam 1 yerine biraz geniş tut ki sağ boşluk olmasın
      spacing: 10,
    },
    breakpoints: {
      "(min-width: 425px)": {
        slides: { perView: 2.2, spacing: 15 },
      },
      "(min-width: 768px)": {
        slides: { perView: 3.2, spacing: 20 },
      },
      "(min-width: 1024px)": {
        slides: { perView: 4.2, spacing: 25 },
      },
      "(min-width: 1280px)": {
        slides: { perView: 5, spacing: 25 },
      },
    },
  });

  return (
    <div className="w-full overflow-hidden">
      <div ref={sliderRef} className="keen-slider flex w-full justify-center items-center">
        {products.map((product) => (
          <div
            key={product.Id}
            className="keen-slider__slide flex justify-center items-center"
          >
            <div className="w-full max-w-[250px]">
              <Product props={product} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSlider;
