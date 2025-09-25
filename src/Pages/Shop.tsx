import { useEffect, useMemo, useState } from "react";
// import { product } from "../Components/NewArrivals";
import Product from "../Components/Product";
import { useSearchParams } from "react-router-dom";
import { CategoryService } from "../Services/CategoryService";
import type { ProductReadDTO } from "../types/ProductTypes/PrdocutReadDTO";
import { ProductService } from "../Services/ProductService";
import Loading from "../Components/Loading";
const Shop = () => {
  // Ana Kaynak
  const [allProducts, setAllProducts] = useState<ProductReadDTO[]>([]);
  const [categoryProducts, setCategoryProducts] = useState<ProductReadDTO[]>(
    []
  );
  //Kategori ile filtreleme
  const [searchParams] = useSearchParams();
  const categoryIdParam = searchParams.get("cat");
  const categoryId = categoryIdParam ? Number(categoryIdParam) : undefined;

  const [searchString, setSearchStirng] = useState("");
  const [isLoading, setIsloading] = useState<boolean>(false);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setIsloading(true);
        const data = await ProductService.getAll();
        setAllProducts(data);
        setIsloading(false);
      } catch (e) {
        console.error("Ürünler alınamadı", e);
        setIsloading(false);
      }
    };
    fetchAll();
  }, []);

  //Kategori varsa Fetch
  useEffect(() => {
    const fetchByCat = async () => {
      if (!categoryId) {
        setCategoryProducts([]);
        return;
      }
      try {
        setIsloading(true);
        const data = await CategoryService.getProductsByCategory(categoryId);
        setCategoryProducts(data);
        setIsloading(false);
      } catch (e) {
        console.error("Filtreleme başarısız", e);
        setIsloading(false);
      }
    };
    fetchByCat();
  }, [categoryId]);

  // content
  const productList = categoryId ? categoryProducts : allProducts;

  const filteredList = useMemo(() => {
    const q = searchString.trim().toLowerCase();
    if (q.length < 3) return productList;
    return productList.filter((p) => p.ProductName.toLowerCase().includes(q));
  }, [productList, searchString]);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="shopPage flex  justify-center flex-col items-center sm:">
          <div className="searchArea text-4xl w-60 h-20 bg-cyan-900 text-white focus:outline-none my-3">
            <form
              method="post"
              className="flex justify-center flex-col items-center"
            >
              <input
                placeholder="Search Item"
                value={searchString}
                onChange={(e) => setSearchStirng(e.target.value)}
                className="w-52 my-3"
              />
            </form>
          </div>
          <div className="listProductsShopPage grid grid-cols-1 sm:grid-cols-2 sm:gap-10 md:grid-cols-2 place-items-center lg:grid-cols-4  my-6 ">
            {filteredList.map((item) => (
              <Product props={item} key={item.Id} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Shop;
