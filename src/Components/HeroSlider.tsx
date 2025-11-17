import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import Autoplay from "../utilits/AutoPlay";

const HeroSlider = () => {
  const [sliderRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      mode: "snap",
      slides: { perView: 1, spacing: 0 },
      defaultAnimation: {
        duration: 3000,
      },
      renderMode: "performance",
    },
    [Autoplay(3000)]
  );

  return (
    <div className="w-full overflow-hidden">
      <div ref={sliderRef} className="keen-slider h-[300px] w-full slides  bg-linear-to-r from-blue-600 via-blue-500 to-blue-300">
        <div className="keen-slider__slide slide "></div>
        <div className="keen-slider__slide slide"></div>
        <div className="keen-slider__slide slide text-white text-3xl flex items-center justify-center">
          Yeni Sezon
        </div>
      </div>
    </div>
  );
};

export default HeroSlider;
