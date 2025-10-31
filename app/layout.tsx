import "./globals.css";  
import Navbar from "@/components/Navbar";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";

export const metadata = {
  title: "Mobile E-commerce",
  description: "Buy premium mobiles online",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900">
        <CartProvider>
          <WishlistProvider>
            <Navbar />
            <main className="min-h-screen">{children}</main>
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
