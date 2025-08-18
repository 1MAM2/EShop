import React from "react";
import Categories from "../Components/Categories";
import HeroSlider from "../Components/HeroSlider";
import NewArrivals from "../Components/NewArrivals";
import HomeDiscount from "../Components/HomeDiscount";
import { useProducts } from "../Context/ProductContext";
import { BeatLoader } from "react-spinners";

const Home = () => {
  const { products, isLoading, error } = useProducts();
  const loading = true;
  const discountedProducts = products.filter((p) => p.Discount != 0);
  return (
    <div>
      {isLoading ? (
        <div className="h-[100vh] flex items-center justify-center">
          <BeatLoader size={50} color="#0b3af8" />
        </div>
      ) : (
        <div>
          <HeroSlider />
          <NewArrivals props={products} />
          <HomeDiscount props={discountedProducts} />
        </div>
      )}
    </div>
  );
};

export default Home;
