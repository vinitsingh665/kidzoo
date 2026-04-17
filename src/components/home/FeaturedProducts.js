"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { getProducts } from "@/lib/shopify";
import { products as mockProducts } from "@/lib/mockData";
import { useCart } from "@/lib/cartContext";
import styles from "./FeaturedProducts.module.css";
import HelpdeskBanner from "./HelpdeskBanner";

function StarRating({ rating }) {
  const full = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  return (
    <div className={styles.stars}>
      {"★".repeat(full)}
      {hasHalf ? "★" : ""}
      {"☆".repeat(5 - full - (hasHalf ? 1 : 0))}
    </div>
  );
}

function ProductCard({ product, priority }) {
  const { addToCart, addToWishlist, wishlistItems } = useCart();
  const isWishlisted = wishlistItems?.some(item => item.id === product.id);

  const badgeClass =
    product.badge === "new"
      ? styles.badgeNew
      : product.badge === "sale"
      ? styles.badgeSale
      : product.badge === "hot"
      ? styles.badgeHot
      : "";

  return (
    <div className={styles.card} style={{ position: "relative" }}>
      <Link href={`/product/${product.slug}`} style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 1 }} aria-label={`View ${product.name}`} />

      <div className={styles.imageWrapper}>
        <div className={styles.imageBox}>
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className={styles.productImage}
            priority={priority}
          />
        </div>
        {product.badge && (
          <span className={`${styles.badge} ${badgeClass}`}>
            {product.badge}
          </span>
        )}
        
        {/* Hover Overlay */}
        <div className={styles.overlay}>
          <button 
            className={styles.overlayBtn} 
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); addToCart(product); }}
            aria-label="Add to cart"
            style={{display: 'flex'}}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
          </button>
          <button 
            className={styles.overlayBtn} 
            aria-label="Add to wishlist" 
            style={{display: 'flex', color: isWishlisted ? 'var(--color-danger)' : 'white'}}
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); addToWishlist(product); }}
          >
            {isWishlisted ? (
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            ) : (
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            )}
          </button>
        </div>
      </div>
      <div className={styles.cardBody}>
        <h3 className={styles.cardTitle}>
          <Link href={`/product/${product.slug}`} style={{ position: 'relative', zIndex: 2, textDecoration: 'none', color: 'inherit' }} onClick={(e) => e.stopPropagation()}>
            {product.name.toUpperCase()}
          </Link>
        </h3>
        <div className={styles.priceRow}>
          {product.originalPrice && (
            <span className={styles.priceOriginal}>
              ₹{product.originalPrice.toLocaleString("en-IN")}
            </span>
          )}
          <span className={styles.price}>
            ₹{product.price.toLocaleString("en-IN")}
          </span>
        </div>
        <StarRating rating={product.rating} />
      </div>
    </div>
  );
}

export default function FeaturedProducts() {
  const [allProducts, setAllProducts] = useState(mockProducts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function fetchProducts() {
      try {
        const shopifyProducts = await getProducts();
        if (!cancelled && shopifyProducts && shopifyProducts.length > 0) {
          setAllProducts(shopifyProducts);
        }
      } catch (err) {
        console.error("Failed to fetch Shopify products, using mock data:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchProducts();
    return () => { cancelled = true; };
  }, []);

  const newProducts = allProducts.slice(0, 3);
  const bestSellers = allProducts.slice(3, 9);

  return (
    <div className={styles.mainContent}>
      {/* New Products Section */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.title}>NEW PRODUCTS</h2>
          <select className={styles.sortSelect}>
            <option>default sorting</option>
            <option>price: low to high</option>
            <option>price: high to low</option>
          </select>
        </div>
        <div className={styles.grid}>
          {newProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} priority={index < 3} />
          ))}
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.title}>BEST SELLERS</h2>
          <select className={styles.sortSelect}>
            <option>default sorting</option>
            <option>price: low to high</option>
            <option>price: high to low</option>
          </select>
        </div>
        <div className={styles.grid}>
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Helpdesk Banner */}
      <HelpdeskBanner />
    </div>
  );
}
