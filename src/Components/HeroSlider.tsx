import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { useEffect } from "react";

const HeroSlider = () => {
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: "free-snap",
    renderMode: "performance",
    slides: {
      perView: 1,
      spacing: 0,
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      instanceRef.current?.next();
    }, 3000);
    return () => clearInterval(interval);
  }, [instanceRef]);

  return (
    <div className="w-full overflow-hidden">
      <div ref={sliderRef} className="keen-slider h-[300px] w-full slides">
        <div className="keen-slider__slide slide bg-gradient-to-r from-red-600 to-orange-500">
    
        </div>
        <div className="keen-slider__slide slide bg-blue-500">
          
        </div>
        <div className="keen-slider__slide slide bg-green-500 text-white text-3xl flex items-center justify-center">
          Yeni Sezon
        </div>
      </div>
    </div>
  );
};

export default HeroSlider;
