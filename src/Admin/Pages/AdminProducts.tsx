import { useEffect, useState } from "react";
import type { ProductReadDTO } from "../../types/ProductTypes/PrdocutReadDTO";
import { AdminService } from "../../Services/AdminService";
import CreateProduct from "../Companents/CreateProduct";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaEdit, FaSave } from "react-icons/fa";
import Loading from "../../Components/Loading";
export default function AdminProducts() {
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState<ProductReadDTO[]>([]);
  const [page, setPage] = useState(1);
  const [TotalItems, setTotalItems] = useState(0);
  const navigate = useNavigate();

  // 🔹 Stok düzenleme durumları
  const [editingStockId, setEditingStockId] = useState<number | null>(null);
  const [newStock, setNewStock] = useState<number>(0);
  const itemsPerPage = 10;
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await AdminService.GetAllProducts(page, itemsPerPage);
        setProducts(data?.Products ?? []);

        setTotalItems(data.TotalItems);
        console.log(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [page]);

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

  // 🔹 Stok düzenleme işlemleri
  const handleStockEdit = (id: number, currentStock: number) => {
    setEditingStockId(id);
    setNewStock(currentStock);
  };

  const handleSaveStock = async (id: number) => {
    try {
      await AdminService.updateProductStock(id, newStock);
      setProducts((prev) =>
        prev.map((p) => (p.Id === id ? { ...p, Stock: newStock } : p))
      );
      setEditingStockId(null);
    } catch (err) {
      console.error("Stock update error:", err);
      alert("An error occurred while updating stock!");
    }
  };

  // 🔹 Arama
  const filteredProducts = products.filter((p) =>
    p.ProductName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 🔹 Pagination
  // const itemsPerPage = 5;
  // const { currentPage, totalPages, currentData, goToPage, nextPage, prevPage } =
  //   usePagination(filteredProducts, itemsPerPage);

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
                  Discount
                </th>
                <th className="px-4 py-2 text-left text-xl font-medium text-gray-700">
                  Final Price
                </th>
                <th className="px-4 py-2 text-left text-xl font-medium text-gray-700">
                  Stock
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
              {filteredProducts.map((p) => (
                <tr
                  key={p.Id}
                  className="bg-white hover:bg-blue-50 hover:shadow-md transition-all duration-150 rounded-lg cursor-pointer"
                  onClick={() => handleProductClick(p.Id)}
                >
                  <td className="px-4 py-3 font-medium text-gray-700">
                    {p.Id}
                  </td>
                  <td className="px-4 py-3 text-gray-800 hover:text-blue-600">
                    {p.ProductName}
                  </td>
                  <td className="px-4 py-3 text-gray-800 font-semibold">
                    ₺{p.Price}
                  </td>
                  <td className="px-4 py-3 text-xl text-gray-800">
                    {p.Discount * 100}%
                  </td>
                  <td className="px-4 py-3 text-xl text-gray-800 font-semibold">
                    ₺{p.FinalPrice}
                  </td>

                  {/* 🔹 Stok düzenleme alanı */}
                  <td className="px-4 py-3 text-gray-800">
                    {editingStockId === p.Id ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={newStock}
                          onChange={(e) => setNewStock(Number(e.target.value))}
                          className="border p-1 w-20 rounded"
                          onClick={(e) => e.stopPropagation()}
                        />
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleSaveStock(p.Id);
                          }}
                          className="flex items-center justify-center px-2 py-1 rounded-md bg-green-600 text-white hover:bg-green-700 transition"
                          title="Save Stock"
                        >
                          <FaSave />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span>{p.Stock}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStockEdit(p.Id, p.Stock);
                          }}
                          className="flex items-center justify-center px-2 py-1 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
                          title="Edit Stock"
                        >
                          <FaEdit />
                        </button>
                      </div>
                    )}
                  </td>

                  <td
                    className="px-4 py-3"
                    onClick={() => handleProductClick(p.Id)}
                  >
                    <img
                      src={p.ImgUrl}
                      alt={p.ProductName}
                      className="w-14 h-14 object-cover rounded-md border border-gray-200 shadow-sm"
                    />
                  </td>

                  <td className="px-4 py-3 text-center flex justify-center gap-2">
                    <button
                      onClick={(e) => handleDeleteProduct(e, p.Id)}
                      className="flex items-center justify-center px-2 py-1 rounded-md bg-red-600 text-white hover:bg-red-700 transition"
                      title="Delete Product"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center gap-2 mt-4">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="px-3 py-1 rounded-md border border-gray-300 bg-white hover:bg-gray-100 disabled:opacity-50 transition"
            >
              Prev
            </button>

            {[...Array(Math.ceil(TotalItems / itemsPerPage))].map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`px-3 py-1 rounded-md border border-gray-300 transition ${
                  page === i + 1
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() =>
                setPage((prev) =>
                  Math.min(prev + 1, Math.ceil(TotalItems / itemsPerPage))
                )
              }
              disabled={page === Math.ceil(TotalItems / itemsPerPage)}
              className="px-3 py-1 rounded-md border border-gray-300 bg-white hover:bg-gray-100 disabled:opacity-50 transition"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* 🔹 Create Product */}
      <div className="mt-4">
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
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
