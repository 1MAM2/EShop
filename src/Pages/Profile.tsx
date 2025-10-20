import { useState, useEffect } from "react";
import { useUser } from "../Context/UserContext";
import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  useAuth,
} from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { OrderService } from "../Services/OrderService";
import type { OrderReadDTO } from "../types/OrderTypes/OrderReadDTO";
import Loading from "../Components/Loading";
import api from "../Services/api";

const Profile = () => {
  const { user, fetchUserData, updateUserAsync } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();
  //ORDERS
  const [orders, setOrders] = useState<OrderReadDTO[]>([]);
  const [loading, setLoading] = useState(true);

  const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);

  const toggleOrder = (orderId: number) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  // Form stateler
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem(ACCESS_TOKEN_KEY);
      if (!token) return;

      try {
        // Örn: basit istek at, 401 dönerse refresh token devreye girsin
        await api.get("/api/auth/protectedRoute");
      } catch (err) {
        console.error("Token expired, interceptor devreye girecek");
      }
    };

    checkToken();
  }, []);

  useEffect(() => {
    fetchUserData();
    const fetchOrders = async () => {
      try {
        const data = await OrderService.userGetAllOrder();
        console.log(data);

        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);
  useEffect(() => {
    if (user) {
      setUserName(user.UserName);
      setEmail(user.Email);
      setAddress(user.Address);
    }
  }, [user]);

  const handleSave = async () => {
    await updateUserAsync({
      UserName: userName,
      Email: email,
      Address: address,
    });
    setIsEditing(false);
    fetchUserData(); // Güncel veriyi çek
  };

  const handleLogout = async () => {
    await logout();
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    navigate("/");
    toast.warning("Logout is success");
  };
  if (loading)
    return (
      <div>
        <Loading />
      </div>
    );

  return (
    <div className="px-6 md:px-20 py-10 bg-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8 transition-all duration-300">
        {/* Profile Header */}
        <div className="flex items-center space-x-6 mb-6">
          <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-3xl font-bold text-gray-700">
            {user?.UserName?.[0]}
          </div>
          <div className="flex-1">
            {isEditing ? (
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
            ) : (
              <h1 className="text-2xl font-bold">{user?.UserName}</h1>
            )}
            {isEditing ? (
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-2 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
            ) : (
              <p className="text-gray-500">{user?.Email}</p>
            )}
          </div>
        </div>

        {/* Address */}
        <div className="mb-6">
          {isEditing ? (
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          ) : (
            <p className="text-gray-700">
              {user?.Address || "No address provided"}
            </p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex space-x-4 gap-4 justify-around">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-500 transition"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Edit Profile
            </button>
          )}
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition w-[80px]"
          >
            Logout
          </button>
        </div>
      </div>
      <div className="max-w-3xl mx-auto mt-10">
        <h1 className="text-2xl font-bold mb-6">My Orders</h1>

        {orders.length === 0 && (
          <p className="text-gray-500">You haven't placed any orders yet.</p>
        )}

        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.OrderId}
              className="p-4 bg-white shadow rounded-lg flex justify-between items-center"
              onClick={() => toggleOrder(order.OrderId)}
            >
              <div>
                <p className="font-medium">
                  Order #{order.UserId}-{order.CreatedAt}
                </p>
                <p className="text-gray-500 text-sm">
                  Placed on{" "}
                  {order.CreatedAt
                    ? new Date(order.CreatedAt).toLocaleDateString("en-US", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })
                    : "Unknown"}{" "}
                  {/* createdAt yoksa gösterilecek */}
                </p>
                <p className="text-gray-500 text-sm">Status: {order.Status}</p>
              </div>
              <p className="font-semibold">${order.TotalPrice.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
