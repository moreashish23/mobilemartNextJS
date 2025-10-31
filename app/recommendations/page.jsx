import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import AddToWishlist from "./AddToWishlist";

export const dynamic = "force-dynamic";

export default async function RecommendationsPage() {
  await connectDB();
  const products = await Product.find().limit(4);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Recommended Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <div
            key={p._id}
            className="border rounded-xl shadow-sm hover:shadow-md transition bg-white p-4"
          >
            <img
              src={p.image}
              alt={p.name}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <h2 className="text-lg font-semibold">{p.name}</h2>
            <p className="text-gray-500 text-sm">{p.category}</p>
            <p className="text-blue-600 font-bold mt-2">₹{p.price}</p>

            {/*  Pass full product object */}
            <AddToWishlist product={JSON.parse(JSON.stringify(p))} />
          </div>
        ))}
      </div>
    </div>
  );
}
