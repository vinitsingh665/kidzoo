"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Sidebar.module.css";
import { getProducts } from "@/lib/shopify";
import { products as mockProducts } from "@/lib/mockData";

export default function Sidebar() {
  const [topRated, setTopRated] = useState(mockProducts.slice(0, 3));

  useEffect(() => {
    let cancelled = false;
    async function fetchProducts() {
      try {
        const shopifyProducts = await getProducts();
        if (!cancelled && shopifyProducts && shopifyProducts.length > 0) {
          // Sort by rating and take top 3
          const sorted = [...shopifyProducts].sort((a, b) => b.rating - a.rating);
          setTopRated(sorted.slice(0, 3));
        }
      } catch (err) {
        console.error("Sidebar: Failed to fetch Shopify products:", err);
      }
    }
    fetchProducts();
    return () => { cancelled = true; };
  }, []);

  const categories = [
    "Accessories", "Clothes", "Green Products", "Educational Products", "Toys", "Food and Nutrients", "Miscellaneous"
  ];

  const colors = [
    "#FF8A8A", "#FFE66D", "#6EBCE6", "#4ECDC4", "#A29BFE",
    "#F38D33", "#FF4757", "#2D3436", "linear-gradient(135deg, #2D3436 50%, #fff 50%)"
  ];

  const tags = [
    "newborn", "baba pro", "toys", "nana-baba pro", "pampers"
  ];

  return (
    <aside className={styles.sidebar}>
      {/* Search */}
      <div className={styles.widget}>
        <div className={styles.searchBox}>
          <input type="text" placeholder="search" className={styles.searchInput} />
          <button className={styles.searchBtn} style={{display: 'flex'}}>
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className={styles.widget}>
        <h3 className={styles.widgetTitle}>CATEGORIES</h3>
        <ul className={styles.categoryList}>
          {categories.map((cat, i) => (
            <li key={i}>
              <Link href={`/shop?category=${encodeURIComponent(cat)}`}>
                <span className={styles.bullet}></span>
                {cat}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Price */}
      <div className={styles.widget}>
        <h3 className={styles.widgetTitle}>PRICE</h3>
        <div className={styles.priceSlider}>
          <div className={styles.sliderTrack}>
            <div className={styles.sliderRange}></div>
            <div className={styles.sliderThumbLocal} style={{ left: '0%' }}></div>
            <div className={styles.sliderThumbLocal} style={{ left: '100%' }}></div>
          </div>
          <div className={styles.priceLabels}>
            <span>$0</span>
            <span>$754</span>
          </div>
        </div>
      </div>

      {/* Colors */}
      <div className={styles.widget}>
        <h3 className={styles.widgetTitle}>COLORS</h3>
        <div className={styles.colorGrid}>
          {colors.map((color, i) => (
            <div 
              key={i} 
              className={styles.colorCircle} 
              style={{ background: color, border: color.includes('fff') || color.includes('#FFFFFF') ? '1px solid #ddd' : 'none' }}
            ></div>
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <div className={styles.widget}>
        <h3 className={styles.widgetTitle}>SIGN UP FOR NEWSLETTER</h3>
        <div className={styles.newsletterBox}>
          <input type="email" placeholder="your email" className={styles.newsletterInput} />
          <button className={styles.newsletterBtn} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'}}>
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            SIGN UP NOW!
          </button>
        </div>
      </div>

      {/* Top Rated */}
      <div className={styles.widget}>
        <h3 className={styles.widgetTitle}>TOP RATED PRODUCTS</h3>
        <ul className={styles.topRatedList}>
          {topRated.map((prod) => (
            <li key={prod.id} className={styles.topRatedItem}>
              <div className={styles.topRatedImgWrap}>
                <Image src={prod.image} alt={prod.name} width={50} height={50} className={styles.topRatedImg} />
              </div>
              <div className={styles.topRatedInfo}>
                <Link href={`/product/${prod.slug}`} className={styles.topRatedName}>{prod.name.toUpperCase()}</Link>
                <div className={styles.topRatedPrice}>${(prod.price / 80).toFixed(0)}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Tags */}
      <div className={styles.widget}>
        <h3 className={styles.widgetTitle}>TAGS</h3>
        <div className={styles.tagsGrid}>
          {tags.map((tag, i) => (
            <Link href={`/shop?tag=${tag}`} key={i} className={styles.tagPill}>
              {tag}
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
