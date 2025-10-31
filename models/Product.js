import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: false, unique: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  inventory: { type: Number, required: true },
  lastUpdated: { type: Date, default: Date.now },
  images: {
    type: [String], 
    required: true,
  },
});

export default mongoose.models.Product || mongoose.model("Product", productSchema);
