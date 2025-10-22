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
  const [products, setProducts] = useState<ProductReadDTO[]>([]);
  const [categoryProducts, setCategoryProducts] = useState<ProductReadDTO[]>(
    []
  );
  //Kategori ile filtreleme
  const [searchParams] = useSearchParams();
  const categoryIdParam = searchParams.get("cat");
  const categoryId = categoryIdParam ? Number(categoryIdParam) : undefined;
  const [loading, setLoading] = useState(true);
  const [Page, setPage] = useState(1);
  const [TotalItems, setTotalItems] = useState(0);
  const itemsPerPage = 10;
  const [searchString, setSearchString] = useState("");

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        const data = await ProductService.getAll(Page, itemsPerPage);
        setProducts(data?.Products ?? []);
        setTotalItems(data?.TotalItems ?? 0);
      } catch (err) {
        console.error(err);
        setProducts([]);
        setTotalItems(0);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, [Page]);

  //Kategori varsa Fetch
  useEffect(() => {
    const fetchByCat = async () => {
      if (!categoryId) {
        setCategoryProducts([]);
        return;
      }
      try {
        setLoading(true);
        const data = await CategoryService.getProductsByCategory(categoryId);
        setCategoryProducts(data);
        setLoading(false);
      } catch (e) {
        console.error("Filtreleme başarısız", e);
        setLoading(false);
      }
    };
    fetchByCat();
  }, [categoryId]);
  const maxPage = Math.ceil(TotalItems / itemsPerPage);
  // content
  const productList = categoryId ? categoryProducts : products;

  const filteredList = useMemo(() => {
    const q = searchString.trim().toLowerCase();
    if (q.length < 3) return productList;
    return productList.filter((p) => p.ProductName.toLowerCase().includes(q));
  }, [productList, searchString]);
  return (
    <>
      {loading ? (
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
            {filteredList.map((item) => (
              <Product props={item} key={item.Id} />
            ))}
          </div>
          <div className="flex justify-center gap-2 mt-4">
            <button
              onClick={() => setPage(Page - 1)}
              disabled={Page === 1}
              className="px-3 py-1 rounded-md border border-gray-300 bg-white hover:bg-gray-100 disabled:opacity-50 transition"
            >
              Prev
            </button>

            {[...Array(maxPage)].map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`px-3 py-1 rounded-md border border-gray-300 transition ${
                  Page === i + 1
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => setPage(Page + 1)}
              disabled={Page === maxPage}
              className="px-3 py-1 rounded-md border border-gray-300 bg-white hover:bg-gray-100 disabled:opacity-50 transition"
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
