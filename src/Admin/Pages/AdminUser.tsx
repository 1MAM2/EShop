import { useEffect, useState } from "react";
import Loading from "../../Components/Loading";
import { AdminService } from "../../Services/AdminService";
import type { UserReadDTO } from "../../types/UserTypes/UserReadDTO";

const UserList = () => {
  const [users, setUsers] = useState<UserReadDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newRole, setNewRole] = useState<string>("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await AdminService.getAllUsers();
      setUsers(res);
    } catch (err) {
      console.error("Kullanıcılar alınamadı:", err);
    } finally {
      setLoading(false);
    }
  };

  // const updateUserRole = async (userId: number, role: string) => {
  //   try {
  //     await AdminService.updateUserRole(userId, role);
  //     setUsers((prev) =>
  //       prev.map((u) =>
  //         u.UserId === userId ? { ...u, Role: role } : u
  //       )
  //     );
  //     setEditingId(null);
  //     setNewRole("");
  //   } catch (err) {
  //     console.error("Rol güncellenemedi:", err);
  //   }
  // };

  const deleteUser = async (userId: number) => {
    if (!confirm("Bu kullanıcıyı silmek istediğine emin misin?")) return;
    try {
      await AdminService.deleteAccount();
      setUsers((prev) => prev.filter((u) => u.Id !== userId));
    } catch (err) {
      console.error("An error caught:", err);
    }
  };
console.log(users);

  if (loading) return <Loading />;

  function updateUserRole(Id: number, arg1: string) {
   console.log(Id,arg1);
   
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6">👥 Kullanıcılar</h1>

      <table className="min-w-full bg-white rounded-xl shadow-sm overflow-hidden">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="py-3 px-4">User ID</th>
            <th className="py-3 px-4">Name</th>
            <th className="py-3 px-4">Email</th>
            <th className="py-3 px-4">Role</th>
            <th className="py-3 px-4">Status</th>
            <th className="py-3 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.Id} className="border-b hover:bg-gray-50 transition-colors">
              <td className="py-3 px-4">{user.Id}</td>
              <td className="py-3 px-4">{user.UserName}</td>
              <td className="py-3 px-4">{user.Email}</td>
              <td className="py-3 px-4">
                {editingId === user.Id ? (
                  <select
                    value={newRole || user.Role}
                    onChange={(e) => setNewRole(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                    className="border rounded-md p-1 text-sm"
                  >
                    <option value="User">User</option>
                    <option value="Admin">Admin</option>
                    <option value="Guest">Guest</option>
                  </select>
                ) : (
                  <span>{user.Role}</span>
                )}
              </td>
             
              <td className="py-3 px-4 flex gap-2">
                {editingId === user.Id ? (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        updateUserRole(user.Id, newRole || user.Role);
                      }}
                      className="bg-green-600 text-white px-3 py-1 text-sm rounded-md hover:bg-green-700 transition"
                    >
                      Save
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingId(null);
                        setNewRole("");
                      }}
                      className="bg-gray-300 px-3 py-1 text-sm rounded-md hover:bg-gray-400 transition"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingId(user.Id);
                        setNewRole(user.Role);
                      }}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteUser(user.Id);
                      }}
                      className="text-red-600 hover:underline text-sm"
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
