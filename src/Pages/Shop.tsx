import { useEffect, useMemo, useState } from "react";
// import { product } from "../Components/NewArrivals";
import Product from "../Components/Product";
import { useSearchParams } from "react-router-dom";
import { CategoryService } from "../Services/CategoryService";
import type { ProductReadDTO } from "../types/ProductTypes/PrdocutReadDTO";
import { ProductService } from "../Services/ProductService";
import Loading from "../Components/Loading";
import { usePagination } from "../Custom Hooks/usePagination";
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

  const [searchString, setSearchString] = useState("");
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
  const itemsPerPage = 2;
  const { currentPage, totalPages, currentData, goToPage, nextPage, prevPage } =
    usePagination(filteredList, itemsPerPage);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="shopPage flex  justify-center flex-col items-center sm:">
          <div className="w-full sticky top-0 bg-gray-50 py-3 px-6 shadow-md z-50">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="w-full max-w-md mx-auto"
            >
              <input
                type="text"
                placeholder="Search items..."
                value={searchString}
                onChange={(e) => setSearchString(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 text-gray-800 placeholder-gray-400"
              />
            </form>
          </div>

          <div className="listProductsShopPage grid grid-cols-1 sm:grid-cols-2 sm:gap-10 md:grid-cols-2 place-items-center lg:grid-cols-4  my-6 ">
            {currentData().map((item) => (
              <Product props={item} key={item.Id} />
            ))}
          </div>
          <div className="flex justify-center items-center gap-2 mt-6">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className={`px-3 py-1.5 rounded-lg border text-xl font-medium transition-all duration-200
      ${
        currentPage === 1
          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
          : "bg-white hover:bg-blue-50 border-gray-300 text-gray-700 hover:text-blue-600"
      }`}
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => goToPage(i + 1)}
                className={`px-3 py-1.5 rounded-lg border text-xl font-medium transition-all duration-200
        ${
          currentPage === i + 1
            ? "bg-blue-600 text-white border-blue-600 shadow-sm"
            : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50 hover:text-blue-600"
        }`}
              >
                {i + 1}
              </button>
            ))}

            {/* Next Button */}
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className={`px-3 py-1.5 rounded-lg border text-xl font-medium transition-all duration-200
      ${
        currentPage === totalPages
          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
          : "bg-white hover:bg-blue-50 border-gray-300 text-gray-700 hover:text-blue-600"
      }`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Shop;
