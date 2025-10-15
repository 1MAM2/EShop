import { useEffect, useState } from "react";
import type { ProductReadDTO } from "../../types/ProductTypes/PrdocutReadDTO";
import { AdminService } from "../../Services/AdminService";
import CreateProduct from "../Companents/CreateProduct";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import Loading from "../../Components/Loading";
import { usePagination } from "../../Custom Hooks/usePagination";

export default function AdminProducts() {
  const [products, setProducts] = useState<ProductReadDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // 🟢 Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await AdminService.GetAllProducts();
        setProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleProductClick = (id: number) => {
    navigate(`/admin-panel/adminProducts/${id}`);
  };

  const handleCreatedProduct = (newProduct: ProductReadDTO) => {
    setProducts((prev) => [...prev, newProduct]);
    return products;
  };

  const handleDeleteProduct = async (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmDelete) return;

    try {
      await AdminService.DeleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.Id !== id));
    } catch (err) {
      console.error("Delete error:", err);
      alert("An error occurred while deleting the product!");
    }
  };

  // 🔹 Arama
  const filteredProducts = products.filter((p) =>
    p.ProductName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 🔹 Pagination
  const itemsPerPage = 5;
  const { currentPage, totalPages, currentData, goToPage, nextPage, prevPage } =
    usePagination(filteredProducts, itemsPerPage);

  // const saveEdit = async (id: number, field: "ProductName" | "Price") => {
  //   try {
  //     const updatedProduct = { ...products.find((p) => p.Id === id)! };
  //     if (field === "ProductName") updatedProduct.ProductName = editingValue;
  //     else updatedProduct.Price = parseFloat(editingValue);

  //     await AdminService.UpdateProduct(id, updatedProduct); // backend update fonksiyonu
  //     setProducts((prev) =>
  //       prev.map((p) => (p.Id === id ? updatedProduct : p))
  //     );
  //     setEditingId(null);
  //   } catch (err) {
  //     console.error("Update error:", err);
  //     alert("An error occurred while updating!");
  //   }
  // };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
        <h2 className="text-2xl font-semibold">Products</h2>
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {loading ? (
        <Loading />
      ) : (
        <div className="overflow-x-auto border rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xl font-medium text-gray-700">
                  ID
                </th>
                <th className="px-4 py-2 text-left text-xl font-medium text-gray-700">
                  Product Name
                </th>
                <th className="px-4 py-2 text-left text-xl font-medium text-gray-700">
                  Price
                </th>
                <th className="px-4 py-2 text-left text-xl font-medium text-gray-700">
                  Image
                </th>
                <th className="px-4 py-2 text-center text-xl font-medium text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="text-xl">
              {currentData().map((p) => (
                <tr
                  key={p.Id}
                  className="bg-white hover:bg-blue-50 hover:shadow-md transition-all duration-150 rounded-lg cursor-pointer"
                  onClick={() => handleProductClick(p.Id)}
                >
                  <td className="px-4 py-3 text-xl font-medium text-gray-700">
                    {p.Id}
                  </td>
                  <td className="px-4 py-3 text-xl text-gray-800">
                    <span className="hover:text-blue-600">{p.ProductName}</span>
                  </td>

                  {/* Inline edit Price */}
                  <td className="px-4 py-3 text-xl text-gray-800">
                    <span className="hover:text-blue-600 font-semibold">
                      ₺{p.Price}
                    </span>
                  </td>

                  <td
                    className="px-4 py-3 text-xl"
                    onClick={() => handleProductClick(p.Id)}
                  >
                    <img
                      src={p.ImgUrl}
                      alt={p.ProductName}
                      className="w-14 h-14 object-cover rounded-md border border-gray-200 shadow-sm"
                    />
                  </td>

                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={(e) => handleDeleteProduct(e, p.Id)}
                      className="text-white bg-red-600 hover:bg-red-700 px-2 py-1 rounded-md transition-colors"
                      title="Delete Product"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 🔹 Pagination */}
      <div className="flex justify-center gap-2 mt-4">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="px-2 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => goToPage(i + 1)}
            className={`px-2 py-1 border rounded ${
              currentPage === i + 1 ? "bg-blue-500 text-white" : ""
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className="px-2 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      <div className="mt-4">
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          Create Product
        </button>
      </div>

      {showCreateModal && (
        <CreateProduct
          onClose={() => setShowCreateModal(false)}
          onCreated={handleCreatedProduct}
        />
      )}
    </div>
  );
}
