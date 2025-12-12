import React, { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";
import LoadingSpinner from "../../../../Components/Spinner/LoadingSpinner";
motion;
const rowVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.03, duration: 0.18 },
  }),
};

const ManageUser = () => {

  useEffect(()=>{
    document.title = "Style Decor | Manage User"
  },[])
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const [searchInput, setSearchInput] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["admin-users-all"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleChangeRole = async (u, newRole) => {
    if (u.role === newRole) return;

    const actionLabel = newRole === "admin" ? "Make Admin" : "Make User";

    const result = await Swal.fire({
      title: "Are you sure?",
      html: `<strong>${u.name || u.displayName || u.email}</strong><br/>${actionLabel}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: newRole === "admin" ? "#16a34a" : "#0f766e",
      cancelButtonColor: "#6b7280",
      confirmButtonText: `Yes, ${actionLabel.toLowerCase()}`,
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });

    if (!result.isConfirmed) {
      await Swal.fire({
        icon: "info",
        title: "Cancelled",
        text: "No changes were made.",
        timer: 1100,
        showConfirmButton: false,
      });
      return;
    }

    try {
      setUpdatingId(u._id);
      await axiosSecure.patch(`/users/${u._id}/role`, { role: newRole });
      await Swal.fire({
        icon: "success",
        title: "Updated",
        text: `Role updated to ${newRole}`,
        timer: 1400,
        showConfirmButton: false,
      });
      queryClient.invalidateQueries(["admin-users-all"]);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to update role", "error");
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredUsers = users.filter((u) => {
    const q = searchInput.trim().toLowerCase();
    if (!q) return true;

    const name = (u.name || u.displayName || "").toLowerCase();
    const email = (u.email || "").toLowerCase();

    return name.includes(q) || email.includes(q);
  });

  if (isLoading) {
     return (
      <LoadingSpinner/>
    );
  }

  return (
    <motion.div
      className="px-3 sm:px-6 lg:px-8 py-6 sm:py-8"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <motion.div
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05, duration: 0.2 }}
      >
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900">
            Manage Users
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            View all users and promote them to admin or revert to user.
          </p>
        </div>

        <div className="w-full md:w-auto">
          <input
            type="text"
            placeholder="Search by name or email"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="input input-sm sm:input-md input-bordered w-full md:w-64 bg-white"
          />
        </div>
      </motion.div>

      <motion.div
        className="overflow-x-auto bg-white rounded-xl sm:rounded-2xl shadow border border-slate-100"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08, duration: 0.22 }}
      >
        <table className="table table-xs sm:table-sm md:table-md text-xs sm:text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="hidden sm:table-cell">#</th>
              <th>User</th>
              <th className="hidden md:table-cell">Email</th>
              <th>Role</th>
              <th className="text-right pr-3 sm:pr-6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((u, idx) => (
              <motion.tr
                key={u._id}
                custom={idx}
                variants={rowVariants}
                initial="hidden"
                animate="visible"
              >
                <td className="hidden sm:table-cell">{idx + 1}</td>
                <td>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="avatar">
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full ring ring-offset-1 ring-[#ff6a4a]/40">
                        <img
                          src={
                            u.photoURL ||
                            "https://i.ibb.co/4pDNDk1/avatar-placeholder.png"
                          }
                          alt={u.name || u.displayName || u.email}
                        />
                      </div>
                    </div>
                    <div className="min-w-0">
                      <div className="font-semibold text-slate-900 truncate max-w-[120px] sm:max-w-[180px]">
                        {u.name || u.displayName || "Unnamed user"}
                      </div>
                      <div className="md:hidden text-[10px] text-slate-500 truncate max-w-40">
                        {u.email}
                      </div>
                      <div className="hidden sm:block text-[10px] text-slate-500">
                        Joined{" "}
                        {u.createdAt
                          ? new Date(u.createdAt).toLocaleDateString()
                          : "N/A"}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="hidden md:table-cell whitespace-nowrap">
                  {u.email}
                </td>
                <td>
                  <span
                    className={`badge badge-xs sm:badge-sm ${
                      u.role === "admin"
                        ? "badge-primary"
                        : u.role === "decorator"
                        ? "badge-secondary"
                        : "badge-accent"
                    }`}
                  >
                    {u.role || "user"}
                  </span>
                </td>
                <td>
                  <div className="flex justify-end gap-1 sm:gap-2 pr-1 sm:pr-2">
                    <button
                      disabled={updatingId === u._id || u.role === "admin"}
                      onClick={() => handleChangeRole(u, "admin")}
                      className="btn px-3 text-xs btn-[10px]  bg-emerald-500 hover:bg-emerald-600 text-white disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      Admin
                    </button>
                    <button
                      disabled={updatingId === u._id || u.role === "user"}
                      onClick={() => handleChangeRole(u, "user")}
                      className="btn px-3 text-xs btn-outline disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      User
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-6 text-slate-500">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </motion.div>
    </motion.div>
  );
};

export default ManageUser;
