import HeroSlider from "../Components/HeroSlider";
import NewArrivals from "../Components/NewArrivals";
import HomeDiscount from "../Components/HomeDiscount";
import { useProducts } from "../Context/ProductContext";
import Loading from "../Components/Loading";

const Home = () => {
  const { products, isLoading } = useProducts();
  const discountedProducts = products.filter((p) => p.Discount != 0);
  return (
    <div>
      {isLoading ? (
        <Loading />
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
