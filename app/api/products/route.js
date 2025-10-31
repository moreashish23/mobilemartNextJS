import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

// Fetch all products (Public)
export async function GET() {
  try {
    await connectDB();
    const products = await Product.find();
    return Response.json(products);
  } catch (error) {
    console.error("GET /api/products Error:", error);
    return Response.json(
      { error: "Failed to fetch products", details: error.message },
      { status: 500 }
    );
  }
}

//Create a new product (Protected by admin key)
export async function POST(req) {
  try {
    const body = await req.json();
    await connectDB();

  
    const slug =
      body.slug ||
      body.name
        ?.toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");

    const newProduct = await Product.create({ ...body, slug });

    return Response.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("POST Error:", error.message);
    console.error(" Stack Trace:", error.stack);
    return Response.json(
      { error: "Failed to create product", details: error.message },
      { status: 500 }
    );
  }
}

