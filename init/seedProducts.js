import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../models/Product.js"; // make sure the path is correct

// Load environment variables from .env.local
dotenv.config({ path: "../.env.local" });

// Use correct env variable name
const MONGO_URI = process.env.MONGODB_URI;

if (!MONGO_URI) {
  console.error("MONGODB_URI not found in .env.local");
  process.exit(1);
}

// Sample data matching your schema
const sampleProducts = [
  {
    name: "Samsung Galaxy S24",
    slug: "samsung-galaxy-s24",
    description: "Samsung Galaxy S24 features a dynamic AMOLED display and top-tier performance.",
    price: 79999,
    category: "Smartphones",
    inventory: 20,
    images: [
      "https://www.myg.in/images/detailed/91/tv1-removebg-preview.png",
      "https://sell.gameloot.in/wp-content/uploads/sites/4/2024/02/Samsung-Galaxy-S24-Ultra-5G.jpg",
      "https://i.ytimg.com/vi/GHZwRPskGc4/sddefault.jpg",
    ],
  },
  {
    name: "iPhone 15 Pro",
    slug: "iphone-15-pro",
    description: "Apple’s latest flagship with A17 Bionic chip, ProMotion display, and titanium design.",
    price: 129999,
    category: "Smartphones",
    inventory: 10,
    images: [
      "https://api.ovantica.com/prisma/ovanticainventory/images/iphone-15-pro-max-128-removebg-preview.png",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCSuhL9DN_lEXK-IoYrVfAfZBnBQ-XrGuLxQ&s",
      "https://i.guim.co.uk/img/media/18badfc0b64b09f917fd14bbe47d73fd92feeb27/189_335_5080_3048/master/5080.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=1562112c7a64da36ae0a5e75075a0d12",
    ],
  },
  {
    name: "OnePlus 12",
    slug: "oneplus-12",
    description: "OnePlus 12 delivers smooth OxygenOS experience and Snapdragon performance.",
    price: 69999,
    category: "Smartphones",
    inventory: 25,
    images: [
      "https://oasis.opstatics.com/content/dam/oasis/page/2023/cn/12/12-black.png",
      "https://i.guim.co.uk/img/media/57828dad13e775fd65c7880d8e3be52c0414236d/54_344_5310_3187/master/5310.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=c720e0c8779a1ef3ad2d16aa95dc3a06",
    ],
  },
  {
    name: "Google Pixel 8 Pro",
    slug: "google-pixel-8-pro",
    description: "Pixel 8 Pro brings powerful AI features and a top-tier camera system.",
    price: 104999,
    category: "Smartphones",
    inventory: 15,
    images: [
      "https://m.media-amazon.com/images/I/71r0349s3cL.jpg",
      "https://virtual2web.com/12161-superlarge_default/google-pixel-8-pro-5g-12gb-128gb-blanco-porcelain-dual-sim-ga04798.jpg",
    ],
  },
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    // Clear existing data
    await Product.deleteMany({});
    console.log("Old products removed");

    // Insert new data
    await Product.insertMany(sampleProducts);
    console.log(" Sample products inserted successfully");

    // Close the connection
    await mongoose.connection.close();
    console.log("Connection closed. Seeding complete!");
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

// seedDatabase();
