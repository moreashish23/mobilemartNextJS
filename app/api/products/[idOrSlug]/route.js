import {connectDB} from "@/lib/mongodb"; 
import Product from "@/models/Product";

export async function GET(req, context) {
  try {
    await connectDB();

   
    const { idOrSlug } = await context.params;

    if (!idOrSlug) {
      return Response.json({ error: "Missing product identifier" }, { status: 400 });
    }

    let product = null;

  
    if (idOrSlug.length === 24) {
      product = await Product.findById(idOrSlug);
    } else {
      product = await Product.findOne({ slug: idOrSlug });
    }

    if (!product) {
      return Response.json({ message: "Product not found" }, { status: 404 });
    }

    return Response.json(product);
  } catch (error) {
    console.error("GET /api/products/[idOrSlug] Error:", error);
    return Response.json(
      { error: "Failed to fetch product", details: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(req, context) {
  try {
    await connectDB();

    const body = await req.json();
    const { idOrSlug } = await context.params;

    if (!idOrSlug) {
      return Response.json({ error: "Missing product identifier" }, { status: 400 });
    }

    const adminKey = req.headers.get("x-admin-key");
    if (adminKey !== process.env.ADMIN_KEY) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    let updatedProduct = null;
    if (idOrSlug.length === 24) {
      updatedProduct = await Product.findByIdAndUpdate(idOrSlug, body, { new: true });
    } else {
      updatedProduct = await Product.findOneAndUpdate({ slug: idOrSlug }, body, { new: true });
    }

    if (!updatedProduct)
      return Response.json({ message: "Product not found" }, { status: 404 });

    return Response.json(updatedProduct);
  } catch (error) {
    console.error("PUT /api/products/[idOrSlug] Error:", error);
    return Response.json(
      { error: "Failed to update product", details: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req, context) {
  try {
    await connectDB();
    const { idOrSlug } = await context.params;

    if (!idOrSlug) {
      return Response.json({ error: "Missing product identifier" }, { status: 400 });
    }

    const adminKey = req.headers.get("x-admin-key");
    if (adminKey !== process.env.ADMIN_KEY) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    let deletedProduct = null;
    if (idOrSlug.length === 24) {
      deletedProduct = await Product.findByIdAndDelete(idOrSlug);
    } else {
      deletedProduct = await Product.findOneAndDelete({ slug: idOrSlug });
    }

    if (!deletedProduct) {
      return Response.json({ message: "Product not found" }, { status: 404 });
    }

    return Response.json({ message: "Product deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("DELETE /api/products/[idOrSlug] Error:", error);
    return Response.json(
      { error: "Failed to delete product", details: error.message },
      { status: 500 }
    );
  }
}
