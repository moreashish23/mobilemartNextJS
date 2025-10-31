"use client";

import { useEffect, useState } from "react";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminName, setAdminName] = useState("");
  const [adminKey, setAdminKey] = useState("");
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingProduct, setDeletingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    image: "",
    inventory: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  //  Fetch products
  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      setError("Failed to load products");
      console.error(err);
    }
  };

  useEffect(() => {
    if (isAuthenticated) fetchProducts();
  }, [isAuthenticated]);

  //  Admin login check
  const handleLogin = (e) => {
    e.preventDefault();
    const validName = "admin";
    const validKey = process.env.NEXT_PUBLIC_ADMIN_KEY;

    if (adminName === validName && adminKey === validKey) {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Invalid admin credentials");
    }
  };

  //  Input Handlers
  const handleNewProductChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingProduct((prev) => ({ ...prev, [name]: value }));
  };

  //  Add new product
  const handleAddProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": process.env.NEXT_PUBLIC_ADMIN_KEY,
        },
        body: JSON.stringify(newProduct),
      });

      if (!res.ok) throw new Error("Failed to add product");

      await fetchProducts();
      setNewProduct({
        name: "",
        price: "",
        category: "",
        description: "",
        image: "",
        inventory: "",
      });
      alert("Product added successfully!");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  //Update product
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editingProduct) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/products/${editingProduct._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": process.env.NEXT_PUBLIC_ADMIN_KEY,
        },
        body: JSON.stringify(editingProduct),
      });

      if (!res.ok) throw new Error("Update failed");

      setEditingProduct(null);
      await fetchProducts();
      alert("Product updated successfully!");
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete product
  const handleDelete = async () => {
    if (!deletingProduct) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/products/${deletingProduct._id}`, {
        method: "DELETE",
        headers: { "x-admin-key": process.env.NEXT_PUBLIC_ADMIN_KEY },
      });

      if (!res.ok) throw new Error("Failed to delete product");

      await fetchProducts();
      setDeletingProduct(null);
      alert("🗑️ Product deleted successfully!");
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Login Page
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-indigo-100 via-white to-blue-100 px-4">
        <div className="bg-white/90 backdrop-blur p-8 rounded-2xl shadow-lg border border-indigo-200 w-full max-w-md">
          <h1 className="text-3xl font-extrabold mb-6 text-center bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
            Admin Login
          </h1>

          {error && (
            <p className="text-red-600 text-center bg-red-50 p-2 rounded mb-4">
              {error}
            </p>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="text"
              placeholder="Admin Name"
              value={adminName}
              onChange={(e) => setAdminName(e.target.value)}
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
              required
            />
            <input
              type="password"
              placeholder="Admin Key / Password"
              value={adminKey}
              onChange={(e) => setAdminKey(e.target.value)}
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
              required
            />
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-2 rounded-lg font-semibold hover:opacity-90 transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  //  Admin Panel
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50 p-6">
      <div className="max-w-6xl mx-auto bg-white/90 rounded-2xl shadow-md p-6 border border-gray-100">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-gray-800">Admin Panel</h1>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition font-semibold"
          >
            Logout
          </button>
        </div>

        {error && (
          <p className="text-red-600 text-center bg-red-50 p-3 rounded-lg mb-4">
            {error}
          </p>
        )}

        {/* Add Product */}
        <div className="bg-white p-6 rounded-xl shadow-sm mb-8 border border-gray-100">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Add New Product
          </h2>
          <form
            onSubmit={handleAddProduct}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <input name="name" value={newProduct.name} onChange={handleNewProductChange} placeholder="Product Name" className="border p-2 rounded" required />
            <input name="price" value={newProduct.price} onChange={handleNewProductChange} placeholder="Price" type="number" className="border p-2 rounded" required />
            <input name="category" value={newProduct.category} onChange={handleNewProductChange} placeholder="Category" className="border p-2 rounded" />
            <input name="image" value={newProduct.image} onChange={handleNewProductChange} placeholder="Image URL" className="border p-2 rounded" />
            <input name="inventory" value={newProduct.inventory} onChange={handleNewProductChange} placeholder="Inventory" type="number" className="border p-2 rounded" />
            <textarea name="description" value={newProduct.description} onChange={handleNewProductChange} placeholder="Description" className="border p-2 rounded md:col-span-2" />
            <button type="submit" disabled={loading} className="bg-green-600 text-white py-2 rounded hover:bg-green-700 md:col-span-2 font-semibold transition">
              {loading ? "Adding..." : "Add Product"}
            </button>
          </form>
        </div>

        {/* Product Table */}
        <div className="overflow-x-auto border rounded-xl shadow-sm">
          <table className="w-full border-collapse text-sm">
            <thead className="bg-gradient-to-r from-indigo-100 to-blue-100 text-gray-700">
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Category</th>
                <th className="px-4 py-2 text-left">Price</th>
                <th className="px-4 py-2 text-left">Inventory</th>
                <th className="px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id} className="hover:bg-indigo-50 transition">
                  <td className="px-4 py-2">{p.name}</td>
                  <td className="px-4 py-2">{p.category}</td>
                  <td className="px-4 py-2 font-semibold text-gray-800">₹{p.price}</td>
                  <td className="px-4 py-2">{p.inventory}</td>
                  <td className="px-4 py-2 text-center space-x-2">
                    <button onClick={() => setEditingProduct(p)} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition">Edit</button>
                    <button onClick={() => setDeletingProduct(p)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      {editingProduct && (
        <EditModal product={editingProduct} onCancel={() => setEditingProduct(null)} onSave={handleUpdate} handleEditChange={handleEditChange} loading={loading} />
      )}

      {deletingProduct && (
        <DeleteModal product={deletingProduct} onCancel={() => setDeletingProduct(null)} onConfirm={handleDelete} loading={loading} />
      )}
    </div>
  );
}

//  Reusable Edit Modal
function EditModal({ product, onCancel, onSave, handleEditChange, loading }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 px-4">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Edit Product</h2>
        <form onSubmit={onSave} className="space-y-3">
          {["name", "price", "category", "image", "inventory", "description"].map((field) => (
            <input
              key={field}
              name={field}
              value={product[field]}
              onChange={handleEditChange}
              className="w-full border p-2 rounded"
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            />
          ))}
          <div className="flex justify-end gap-3">
            <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
              {loading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Reusable Delete Modal
function DeleteModal({ product, onCancel, onConfirm, loading }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 px-4">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-sm text-center">
        <h2 className="text-xl font-semibold mb-4">Confirm Delete</h2>
        <p className="text-gray-600 mb-6">{product.name}</p>
        <div className="flex justify-center gap-4">
          <button onClick={onCancel} className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300">
            Cancel
          </button>
          <button onClick={onConfirm} disabled={loading} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
