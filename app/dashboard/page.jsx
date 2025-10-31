export const dynamic = "force-dynamic";

import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

export default async function DashboardPage() {
  try {
    await connectDB();
    const products = await Product.find().lean();

    const totalProducts = products.length;
    const lowStock = products.filter((p) => p.inventory < 5);
    const sortedProducts = products.sort((a, b) => a.inventory - b.inventory);

    return (
      <div className="w-full px-4 sm:px-6 lg:px-12 py-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
        <h1 className="text-4xl font-extrabold mb-10 text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500 drop-shadow-sm">
          Inventory Dashboard
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10 w-full">
          <div className="bg-gradient-to-br from-blue-100 to-indigo-100 p-6 rounded-2xl shadow hover:shadow-lg transition-all duration-300 w-full text-center border border-indigo-200">
            <h2 className="text-lg font-semibold text-gray-700 mb-1">Total Products</h2>
            <p className="text-3xl font-bold text-indigo-700">{totalProducts}</p>
          </div>

          <div className="bg-gradient-to-br from-amber-100 to-yellow-100 p-6 rounded-2xl shadow hover:shadow-lg transition-all duration-300 w-full text-center border border-yellow-200">
            <h2 className="text-lg font-semibold text-gray-700 mb-1">Low Stock</h2>
            <p className="text-3xl font-bold text-amber-700">{lowStock.length}</p>
          </div>

          <div className="bg-gradient-to-br from-green-100 to-emerald-100 p-6 rounded-2xl shadow hover:shadow-lg transition-all duration-300 w-full text-center border border-green-200">
            <h2 className="text-lg font-semibold text-gray-700 mb-1">In Stock</h2>
            <p className="text-3xl font-bold text-emerald-700">{totalProducts - lowStock.length}</p>
          </div>
        </div>

        {/* Product Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden w-full border border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-gray-800 text-center">
              <thead className="bg-gradient-to-r from-indigo-50 to-blue-50 text-gray-700 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 font-semibold">Name</th>
                  <th className="px-4 py-3 font-semibold">Inventory</th>
                  <th className="px-4 py-3 font-semibold">Last Updated</th>
                </tr>
              </thead>
              <tbody>
                {sortedProducts.map((p) => (
                  <tr
                    key={p._id}
                    className={`border-t ${
                      p.inventory < 5
                        ? "bg-red-50 text-red-700"
                        : "hover:bg-indigo-50"
                    } transition-colors duration-200`}
                  >
                    <td className="px-4 py-3 break-words max-w-[240px] font-medium">
                      {p.name}
                    </td>
                    <td className="px-4 py-3">{p.inventory}</td>
                    <td className="px-4 py-3 text-gray-600">
                      {p.lastUpdated
                        ? new Date(p.lastUpdated).toLocaleString()
                        : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error loading dashboard:", error);
    return (
      <div className="p-6 text-center text-red-600">
        <h1 className="text-2xl font-bold">Error Loading Dashboard</h1>
        <p>Database connection error.</p>
      </div>
    );
  }
}
