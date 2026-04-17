import { Fredoka, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cartContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";

const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata = {
  title: "KidZoo — Where Fun Begins! 🎉 | Premium Kids Toys & Accessories",
  description:
    "Discover safe, educational & exciting toys your kids will love! KidZoo offers premium quality toys, games, and accessories for children of all ages. Free shipping on orders above ₹499.",
  keywords:
    "kids toys, children toys, educational toys, building blocks, plush toys, action figures, board games, online toy store India",
  openGraph: {
    title: "KidZoo — Where Fun Begins! 🎉",
    description:
      "Premium kids toys & accessories. Safe, educational & exciting toys your kids will love!",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${fredoka.variable} ${inter.variable}`}>
      <body suppressHydrationWarning>
        <CartProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
