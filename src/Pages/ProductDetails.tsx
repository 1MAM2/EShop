import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProducts } from "../Context/ProductContext";
import { useCategories } from "../Context/CategoryContext";
import Product from "../Components/Product";
import type { CartReadDTO } from "../types/CartTypes/CartReadDTO";
import { useCart } from "../Context/CartContext";
import Loading from "../Components/Loading";

const ProductDetails = () => {
  const { id } = useParams();
  const { catProducts, getProductsByCategory } = useCategories();
  const { addToCart } = useCart();
  const {
    product,
    isLoading,
    error,
    fetchSingleProduct,
    clearSingleProduct,
  } = useProducts();

  const productId = Number(id);
  const [mainImage, setMainImage] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState<string | null>();

  // ürün fetch
  useEffect(() => {
    if (Number.isNaN(productId)) return;
    fetchSingleProduct(productId);
    return () => clearSingleProduct();
  }, [productId, fetchSingleProduct]);

  // kategori ürünleri
  useEffect(() => {
    if (product?.CategoryId) {
      getProductsByCategory(product.CategoryId);
    }
  }, [product?.CategoryId]);

  // loading & error
  if (Number.isNaN(productId)) return <p>Geçersiz ürün ID'si.</p>;
  if (isLoading && !product) return <Loading/>
  if (error) return <p>Hata: {error}</p>;
  if (!product) return <p>Ürün bulunamadı.</p>;

  // küçük resim tıklama
  const handleClick = (src: string) => {
    setMainImage(src);
    setActiveImage(src);
  };

  // sepete ekleme
  function handleAddToCart(): void {
    if (!product) return;
    let addCartProduct: CartReadDTO = {
      ProductId: product.Id,
      ProductName: product.ProductName,
      Price: product.FinalPrice,
      ImgUrl: product.ImgUrl,
      Quantity: 1,
    };
    addToCart(addCartProduct);
  }

  return (
    <div className="w-full max-w-screen-xl mx-auto my-10 px-4">
      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Sol kısım - Görseller */}
        <div>
          <div className="w-full border rounded-lg p-4 flex justify-center items-center min-h-[300px]">
            <img
              className="object-contain max-h-[400px] w-full"
              src={mainImage ?? product.ImgUrl}
              alt={product.ProductName}
            />
          </div>

          <div className="grid grid-cols-4 gap-3 mt-5">
            {/* Ana görsel */}
            <div
              className={`border-2 cursor-pointer p-2 aspect-square 
                ${
                  activeImage === product.ImgUrl
                    ? "border-cyan-500"
                    : "border-gray-300"
                }`}
              onClick={() => handleClick(product.ImgUrl)}
            >
              <img
                src={product.ImgUrl}
                className="w-full h-full object-contain"
                alt={product.ProductName}
              />
            </div>

            {/* Gallery */}
            {product.GalleryImages.map((item, index) => (
              <div
                key={index}
                className={`border-2 cursor-pointer p-2 aspect-square 
                  ${
                    activeImage === item
                      ? "border-cyan-500"
                      : "border-gray-300"
                  }`}
                onClick={() => handleClick(item)}
              >
                <img
                  src={item}
                  className="w-full h-full object-contain"
                  alt={`gallery-${index}`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Sağ kısım - Bilgiler */}
        <div>
          <p className="text-2xl text-gray-500 mb-2">
            Product Diğer adı veya marka
          </p>
          <h3 className="font-bold text-3xl md:text-4xl mb-4">
            {product.ProductName} - ÖRNEK: 256Gb 16Gb RAM
          </h3>

          {/* Fiyat */}
          {product.Discount > 0 ? (
            <div className="flex items-center gap-4 mb-6">
              <span className="text-gray-400 line-through text-2xl">
                {product.Price} $
              </span>
              <span className="bg-red-500 text-white rounded-xl text-3xl px-5 py-2">
                {product.FinalPrice} $
              </span>
            </div>
          ) : (
            <span className="text-3xl text-blue-700 mb-6 block">
              {product.Price} $
            </span>
          )}

          {/* Açıklama */}
          <p className="text-lg md:text-xl mb-6 tracking-wide leading-relaxed">
            {product.Description}
          </p>

          {/* Sepete ekle butonu */}
          <button
            onClick={handleAddToCart}
            className="w-44 p-3 text-xl bg-cyan-500 hover:bg-cyan-700 transition-all rounded-xl text-white"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Benzer ürünler */}
      <div className="mt-16">
        {catProducts.length > 1 ? (
          <>
            <h2 className="underline text-indigo-700 text-3xl md:text-5xl font-bold text-center mb-10">
              Check these out too
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center">
              {catProducts
                .filter((item) => item.Id !== productId)
                .map((item, index) => (
                  <Product props={item} key={index} />
                ))}
            </div>
          </>
        ) : (
          <p className="underline text-indigo-700 text-2xl font-bold text-center">
            Stay tuned! More products from this category are on the way
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
