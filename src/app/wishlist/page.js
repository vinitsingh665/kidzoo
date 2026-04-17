"use client";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/lib/cartContext";

export default function WishlistPage() {
  const { wishlistItems, addToCart, addToWishlist } = useCart();

  return (
    <div className="container" style={{ padding: "80px 15px", minHeight: "60vh" }}>
      <h1 className="section-title">Your Wishlist</h1>
      
      {!wishlistItems || wishlistItems.length === 0 ? (
        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <p style={{ fontSize: "1.2rem", color: "var(--color-dark-light)" }}>Your wishlist is currently empty.</p>
          <Link href="/" className="btn btn-primary" style={{ marginTop: "20px", display: "inline-block" }}>
            Return to Shop
          </Link>
        </div>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "30px",
          marginTop: "40px"
        }}>
          {wishlistItems.map((product) => (
            <div key={product.id} style={{
              background: "white", 
              borderRadius: "15px", 
              padding: "20px", 
              boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
              display: "flex",
              flexDirection: "column",
              position: "relative"
            }}>
              <div style={{
                position: "relative",
                backgroundColor: "var(--color-bg-alt)",
                borderRadius: "10px",
                height: "220px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "15px",
                padding: "20px",
                overflow: "hidden"
              }}>
                <Image src={product.image} alt={product.name} fill style={{objectFit: "contain", padding: "10px"}} sizes="(max-width: 768px) 100vw, 300px" />
                <button 
                  onClick={() => addToWishlist(product)}
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    background: "white",
                    border: "none",
                    borderRadius: "50%",
                    width: "35px",
                    height: "35px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--color-danger)",
                    cursor: "pointer",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                    zIndex: 2
                  }}
                  title="Remove from wishlist"
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                </button>
              </div>
              <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.2rem", marginBottom: "5px", color: "var(--color-dark)", textAlign: "center" }}>
                <Link href={`/product/${product.slug}`} style={{textDecoration: "none", color: "inherit"}}>
                  {product.name.toUpperCase()}
                </Link>
              </h3>
              <div style={{ color: "var(--color-primary)", fontWeight: "bold", fontSize: "1.1rem", textAlign: "center", marginBottom: "20px" }}>
                ${(product.price / 80).toFixed(0)}
              </div>
              
              <button 
                onClick={() => addToCart(product)}
                style={{ 
                  width: "100%", 
                  padding: "12px", 
                  marginTop: "auto", 
                  display: "flex", 
                  justifyContent: "center", 
                  gap: "10px", 
                  alignItems: "center",
                  background: "var(--color-orange)",
                  color: "white",
                  border: "none",
                  borderRadius: "50px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  transition: "background 0.2s"
                }}
                onMouseOver={(e) => e.currentTarget.style.background = "var(--color-primary-dark)"}
                onMouseOut={(e) => e.currentTarget.style.background = "var(--color-orange)"}
              >
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                ADD TO CART
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
