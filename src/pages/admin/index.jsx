import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../_api";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "admin") {
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      try {
        const response = await API.get("/admin/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setDashboardData(response.data);
      } catch {
        setError("Gagal mengambil data dashboard!");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  const {
    total_users,
    users_per_role,
    total_classes,
    total_payments,
    paid_payments,
    best_selling_class,
  } = dashboardData || {};

  return (
    <div className="container mx-auto py-6 px-4">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <InfoCard title="Total Users" value={total_users} color="blue" />
        <InfoCard title="Total Classes" value={total_classes} color="green" />
        <InfoCard
          title="Total Payments"
          value={total_payments}
          color="purple"
          subLabel="Paid"
          subValue={paid_payments}
        />
        <InfoCard
          title="Best Selling Class"
          value={best_selling_class?.class_name || "Tidak ada data"}
          color="yellow"
          subLabel="Buyers"
          subValue={best_selling_class?.total_buyer || 0}
        />
      </div>

      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4">Users per Role</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {users_per_role?.map((role) => (
            <div
              key={role.id}
              className="border border-gray-300 rounded-lg p-4 shadow-sm hover:shadow-md transition"
            >
              <h4 className="text-lg font-medium capitalize">
                {role.name_role}
              </h4>
              <p className="text-gray-700 mt-2">
                Total:{" "}
                <span className="font-semibold">{role.users_count}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function InfoCard({ title, value, color, subLabel, subValue }) {
  const bgColor = {
    blue: "bg-blue-600",
    green: "bg-green-600",
    purple: "bg-purple-600",
    yellow: "bg-yellow-500",
  }[color];

  return (
    <div className={`${bgColor} text-white rounded-lg p-6 shadow-md`}>
      <h2 className="text-2xl font-semibold">{value}</h2>
      <p className="mt-1">{title}</p>
      {subLabel && (
        <p className="text-sm mt-2">
          {subLabel}: <span className="font-semibold">{subValue}</span>
        </p>
      )}
    </div>
  );
}
