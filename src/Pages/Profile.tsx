import { useState, useEffect } from "react";
import { useUser } from "../Context/UserContext";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Profile = () => {
  const { user, fetchUserData, updateUserAsync } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const{logout} = useAuth();
  const navigate = useNavigate();

  // Form state
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    fetchUserData();
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

  const handleLogout = async () =>
  {
     await logout();
     localStorage.removeItem(ACCESS_TOKEN_KEY);
     localStorage.removeItem(REFRESH_TOKEN_KEY);
     toast.warning("Logout is success");
     navigate("/"); 
  }

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
        <div className="flex space-x-4">
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
            className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
      <div className="max-w-3xl mx-auto mt-10">
        <h2 className="text-xl font-semibold mb-4">Your Orders</h2>
        <div className="space-y-4">
          <div className="p-4 bg-white shadow rounded-lg flex justify-between items-center">
            <div>
              <p className="font-medium">Order #12345</p>
              <p className="text-gray-500 text-sm">Placed on 01 Oct 2025</p>
            </div>
            <p className="font-semibold">$59.99</p>
          </div>
          <div className="p-4 bg-white shadow rounded-lg flex justify-between items-center">
            <div>
              <p className="font-medium">Order #12346</p>
              <p className="text-gray-500 text-sm">Placed on 25 Sep 2025</p>
            </div>
            <p className="font-semibold">$120.00</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
