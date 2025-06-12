import React, { useState, useEffect } from "react";
import API from "../../_api"; // Import API instance

export default function AdminDashboard() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token || role !== "admin") {
    navigate("/login"); // Redirect ke login kalau bukan admin
  }

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token"); // Ambil token dari localStorage

        const response = await API.get("/admin/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`, // Kirim token ke backend
          },
        });

        setDashboardData(response.data);
      } catch (err) {
        setError("Gagal mengambil data dashboard!");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  const {
    total_users,
    users_per_role,
    total_classes,
    total_payments,
    paid_payments,
    best_selling_class,
  } = dashboardData;

  console.log(dashboardData);

  return (
    <div className="container mx-auto py-6 px-4">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Users */}
        <div className="bg-blue-600 text-white rounded-lg p-6 shadow-md">
          <h2 className="text-2xl font-semibold">{total_users}</h2>
          <p className="mt-1">Total Users</p>
        </div>

        {/* Total Classes */}
        <div className="bg-green-600 text-white rounded-lg p-6 shadow-md">
          <h2 className="text-2xl font-semibold">{total_classes}</h2>
          <p className="mt-1">Total Classes</p>
        </div>

        {/* Total Payments */}
        <div className="bg-purple-600 text-white rounded-lg p-6 shadow-md">
          <h2 className="text-2xl font-semibold">{total_payments}</h2>
          <p className="mt-1">Total Payments</p>
          <p className="text-sm mt-2">
            Paid: <span className="font-semibold">{paid_payments}</span>
          </p>
        </div>

        {/* Best Selling Class */}
        <div className="bg-yellow-500 text-white rounded-lg p-6 shadow-md">
          <h2 className="text-2xl font-semibold">
            {best_selling_class?.class_name || "Tidak ada data"}
          </h2>
          <p className="mt-1">Best Selling Class</p>
          <p className="text-sm mt-2">
            Buyers:{" "}
            <span className="font-semibold">
              {best_selling_class?.total_buyer || 0}
            </span>
          </p>
        </div>
      </div>

      {/* Users per Role */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4">Users per Role</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {users_per_role.map((role) => (
            <div
              key={role.id}
              className="border border-gray-300 rounded-lg p-4 shadow-sm hover:shadow-md transition"
            >
              <h4 className="text-lg font-medium capitalize">
                {role.name_role}
              </h4>
              <p className="text-gray-700 mt-2">
                Total: <span className="font-semibold">{role.users_count}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// src/pages/admin/Dashboard.jsx
// import React from "react";

// const dummyData = {
//   total_users: 4,
//   users_per_role: [
//     { id: 1, name_role: "siswa", users_count: 2 },
//     { id: 2, name_role: "pengajar", users_count: 1 },
//     { id: 3, name_role: "admin", users_count: 1 },
//   ],
//   total_classes: 1,
//   total_payments: 1,
//   paid_payments: 1,
//   best_selling_class: {
//     class_name: "Kelas 3",
//     total_buyer: 1,
//   },
// };

// export default function AdminDashboard() {
//   const {
//     total_users,
//     users_per_role,
//     total_classes,
//     total_payments,
//     paid_payments,
//     best_selling_class,
//   } = dummyData;

//   return (
//     <div className="container mx-auto py-6 px-4">
//       <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         {/* Total Users */}
//         <div className="bg-blue-600 text-white rounded-lg p-6 shadow-md">
//           <h2 className="text-2xl font-semibold">{total_users}</h2>
//           <p className="mt-1">Total Users</p>
//         </div>

//         {/* Total Classes */}
//         <div className="bg-green-600 text-white rounded-lg p-6 shadow-md">
//           <h2 className="text-2xl font-semibold">{total_classes}</h2>
//           <p className="mt-1">Total Classes</p>
//         </div>

//         {/* Total Payments */}
//         <div className="bg-purple-600 text-white rounded-lg p-6 shadow-md">
//           <h2 className="text-2xl font-semibold">{total_payments}</h2>
//           <p className="mt-1">Total Payments</p>
//           <p className="text-sm mt-2">
//             Paid: <span className="font-semibold">{paid_payments}</span>
//           </p>
//         </div>

//         {/* Best Selling Class */}
//         <div className="bg-yellow-500 text-white rounded-lg p-6 shadow-md">
//           <h2 className="text-2xl font-semibold">
//             {best_selling_class.class_name}
//           </h2>
//           <p className="mt-1">Best Selling Class</p>
//           <p className="text-sm mt-2">
//             Buyers:{" "}
//             <span className="font-semibold">
//               {best_selling_class.total_buyer}
//             </span>
//           </p>
//         </div>
//       </div>

//       {/* Users per Role */}
//       <div className="mt-10">
//         <h3 className="text-xl font-semibold mb-4">Users per Role</h3>
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//           {users_per_role.map((role) => (
//             <div
//               key={role.id}
//               className="border border-gray-300 rounded-lg p-4 shadow-sm hover:shadow-md transition"
//             >
//               <h4 className="text-lg font-medium capitalize">
//                 {role.name_role}
//               </h4>
//               <p className="text-gray-700 mt-2">
//                 Total: <span className="font-semibold">{role.users_count}</span>
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
