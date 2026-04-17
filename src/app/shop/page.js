"use client";
import { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getProducts } from "@/lib/shopify";
import { products as mockProducts, categories } from "@/lib/mockData";
import { useCart } from "@/lib/cartContext";
import styles from "./shop.module.css";

function StarRating({ rating }) {
  const full = Math.floor(rating);
  return (
    <span style={{ color: "var(--color-accent-dark)", fontSize: "0.85rem" }}>
      {"★".repeat(full)}{"☆".repeat(5 - full)}
    </span>
  );
}

function ProductCard({ product, priority }) {
  const { addToCart } = useCart();
  const badgeClass =
    product.badge === "new" ? "badge badge-new" :
    product.badge === "sale" ? "badge badge-sale" :
    product.badge === "hot" ? "badge badge-hot" : "";

  return (
    <div style={{
      background: "var(--color-white)",
      borderRadius: "var(--radius-lg)",
      overflow: "hidden",
      transition: "all 0.3s ease",
      border: "1px solid var(--color-gray-light)",
      cursor: "pointer",
      position: "relative",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = "translateY(-6px)";
      e.currentTarget.style.boxShadow = "var(--shadow-lg)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.boxShadow = "none";
    }}
    >
      <Link href={`/product/${product.slug}`} style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 1 }} aria-label={`View ${product.name}`} />
      <div style={{ position: "relative", aspectRatio: "1", overflow: "hidden", background: "var(--color-bg)" }}>
        <Image src={product.image} alt={product.name} fill sizes="(max-width: 768px) 50vw, 33vw" style={{ objectFit: "cover" }} priority={priority} />
        {product.badge && (
          <span className={badgeClass} style={{ position: "absolute", top: 12, left: 12, zIndex: 2 }}>
            {product.badge}
          </span>
        )}
      </div>
      <div style={{ padding: "var(--space-md)" }}>
        <div style={{ fontSize: "0.75rem", color: "var(--color-secondary)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 4 }}>
          {product.category}
        </div>
        <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.05rem", fontWeight: 500, marginBottom: 8, lineHeight: 1.3, position: "relative", zIndex: 2 }}>
          <Link href={`/product/${product.slug}`} style={{ transition: "color 0.15s" }}>{product.name}</Link>
        </h3>
        <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 8 }}>
          <StarRating rating={product.rating} />
          <span style={{ fontSize: "0.8rem", color: "var(--color-dark-light)" }}>({product.reviews})</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <span className="price">₹{product.price.toLocaleString("en-IN")}</span>
            {product.originalPrice && (
              <span className="price-original">₹{product.originalPrice.toLocaleString("en-IN")}</span>
            )}
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToCart(product);
            }}
            style={{
              width: 38, height: 38, borderRadius: "50%",
              background: "var(--gradient-primary)", color: "white",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "1.2rem", border: "none", cursor: "pointer",
              transition: "all 0.3s ease", flexShrink: 0,
              position: "relative", zIndex: 2,
            }}
            aria-label={`Add ${product.name} to cart`}
          >+</button>
        </div>
      </div>
    </div>
  );
}

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "";
  const initialSearch = searchParams.get("search") || "";

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState("featured");
  const [priceRange, setPriceRange] = useState("");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
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

  useEffect(() => {
    setSelectedCategory(searchParams.get("category") || "");
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    let items = [...allProducts];

    if (selectedCategory) {
      items = items.filter((p) => p.category === selectedCategory);
    }

    if (initialSearch) {
      const q = initialSearch.toLowerCase();
      items = items.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    if (priceRange) {
      const [min, max] = priceRange.split("-").map(Number);
      items = items.filter((p) => p.price >= min && (max ? p.price <= max : true));
    }

    switch (sortBy) {
      case "price-asc": items.sort((a, b) => a.price - b.price); break;
      case "price-desc": items.sort((a, b) => b.price - a.price); break;
      case "rating": items.sort((a, b) => b.rating - a.rating); break;
      case "newest": items.sort((a, b) => b.id - a.id); break;
    }

    return items;
  }, [allProducts, selectedCategory, sortBy, priceRange, initialSearch]);

  const Sidebar = () => (
    <>
      <div className={styles.filterGroup}>
        <h3 className={styles.filterTitle}>Category</h3>
        <label className={`${styles.filterOption} ${!selectedCategory ? styles.active : ""}`}>
          <input type="radio" name="category" checked={!selectedCategory} onChange={() => setSelectedCategory("")} />
          All Categories
        </label>
        {categories.map((cat) => (
          <label key={cat.id} className={`${styles.filterOption} ${selectedCategory === cat.name ? styles.active : ""}`}>
            <input type="radio" name="category" checked={selectedCategory === cat.name} onChange={() => setSelectedCategory(cat.name)} />
            {cat.icon} {cat.name}
          </label>
        ))}
      </div>
      <div className={styles.filterGroup}>
        <h3 className={styles.filterTitle}>Price Range</h3>
        {[
          { label: "All Prices", value: "" },
          { label: "Under ₹500", value: "0-500" },
          { label: "₹500 - ₹1,000", value: "500-1000" },
          { label: "₹1,000 - ₹2,000", value: "1000-2000" },
          { label: "Above ₹2,000", value: "2000-99999" },
        ].map((range) => (
          <label key={range.value} className={`${styles.filterOption} ${priceRange === range.value ? styles.active : ""}`}>
            <input type="radio" name="price" checked={priceRange === range.value} onChange={() => setPriceRange(range.value)} />
            {range.label}
          </label>
        ))}
      </div>
      {(selectedCategory || priceRange) && (
        <button className={styles.clearBtn} onClick={() => { setSelectedCategory(""); setPriceRange(""); }}>
          ✕ Clear All Filters
        </button>
      )}
    </>
  );

  return (
    <div className={styles.shopPage}>
      <div className={styles.shopHeader}>
        <h1 className={styles.shopTitle}>
          {selectedCategory || (initialSearch ? `Search: "${initialSearch}"` : "All Toys")} 🧸
        </h1>
        <p className={styles.shopSubtitle}>
          Discover the perfect toy for your little one from our curated collection.
        </p>
      </div>

      <div className={styles.shopLayout}>
        <aside className={`${styles.sidebar} ${mobileFiltersOpen ? styles.mobileOpen : ""}`}>
          <Sidebar />
        </aside>

        <div className={styles.mainContent}>
          <div className={styles.toolbar}>
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-md)" }}>
              <button className={styles.mobileFilterBtn} onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}>
                🔽 Filters
              </button>
              <span className={styles.resultCount}>
                {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""} found
              </span>
            </div>
            <select className={styles.sortSelect} value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="featured">Sort: Featured</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
              <option value="rating">Top Rated</option>
              <option value="newest">Newest</option>
            </select>
          </div>

          <div className={styles.productGrid}>
            {loading ? (
              <div className={styles.noResults}>
                <h3>Loading products...</h3>
              </div>
            ) : filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} priority={index < 4} />
              ))
            ) : (
              <div className={styles.noResults}>
                <h3>No toys found 😢</h3>
                <p>Try changing your filters or search term.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div style={{ padding: '100px', textAlign: 'center' }}>Loading...</div>}>
      <ShopContent />
    </Suspense>
  );
}
