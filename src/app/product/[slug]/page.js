"use client";
import { useState, useEffect, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { getProduct, getProducts } from "@/lib/shopify";
import { products as mockProducts } from "@/lib/mockData";
import { useCart } from "@/lib/cartContext";
import styles from "./product.module.css";

export default function ProductPage({ params }) {
  const { slug } = use(params);
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    let cancelled = false;
    async function fetchProduct() {
      try {
        // Try Shopify first
        const shopifyProduct = await getProduct(slug);
        if (!cancelled && shopifyProduct) {
          setProduct(shopifyProduct);
          // Fetch related products
          const allProducts = await getProducts();
          if (!cancelled && allProducts) {
            setRelatedProducts(
              allProducts
                .filter((p) => p.category === shopifyProduct.category && p.slug !== shopifyProduct.slug)
                .slice(0, 4)
            );
          }
        } else if (!cancelled) {
          // Fallback to mock data
          const mockProduct = mockProducts.find((p) => p.slug === slug);
          setProduct(mockProduct || null);
          if (mockProduct) {
            setRelatedProducts(
              mockProducts
                .filter((p) => p.category === mockProduct.category && p.id !== mockProduct.id)
                .slice(0, 4)
            );
          }
        }
      } catch (err) {
        console.error("Failed to fetch from Shopify, using mock data:", err);
        if (!cancelled) {
          const mockProduct = mockProducts.find((p) => p.slug === slug);
          setProduct(mockProduct || null);
          if (mockProduct) {
            setRelatedProducts(
              mockProducts
                .filter((p) => p.category === mockProduct.category && p.id !== mockProduct.id)
                .slice(0, 4)
            );
          }
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchProduct();
    return () => { cancelled = true; };
  }, [slug]);

  if (loading) {
    return (
      <div className={styles.productPage} style={{ textAlign: "center", padding: "100px 20px" }}>
        <h2>Loading product...</h2>
      </div>
    );
  }

  if (!product) {
    return (
      <div className={styles.productPage} style={{ textAlign: "center", padding: "100px 20px" }}>
        <h1>Product Not Found 😢</h1>
        <p style={{ color: "var(--color-dark-light)", margin: "16px 0" }}>
          The toy you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link href="/shop" className="btn btn-primary">Back to Shop</Link>
      </div>
    );
  }

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  // Ensure images array exists
  const productImages = product.images && product.images.length > 0 ? product.images : [product.image];

  return (
    <div className={styles.productPage}>
      {/* Breadcrumb */}
      <div className={styles.breadcrumb}>
        <Link href="/">Home</Link>
        <span>/</span>
        <Link href="/shop">Shop</Link>
        <span>/</span>
        <Link href={`/shop?category=${encodeURIComponent(product.category)}`}>
          {product.category}
        </Link>
        <span>/</span>
        <span style={{ color: "var(--color-dark)" }}>{product.name}</span>
      </div>

      <div className={styles.productGrid}>
        {/* Image Gallery */}
        <div className={styles.gallery}>
          <div className={styles.mainImage}>
            <Image
              src={productImages[selectedImage]}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
          {productImages.length > 1 && (
            <div className={styles.thumbnails}>
              {productImages.map((img, i) => (
                <div
                  key={i}
                  className={`${styles.thumbnail} ${selectedImage === i ? styles.active : ""}`}
                  onClick={() => setSelectedImage(i)}
                >
                  <Image src={img} alt={`${product.name} view ${i + 1}`} fill sizes="80px" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className={styles.productInfo}>
          <span className={styles.productCategory}>{product.category}</span>
          <h1 className={styles.productName}>{product.name}</h1>

          <div className={styles.ratingRow}>
            <span className={styles.stars}>
              {"★".repeat(Math.floor(product.rating))}
              {"☆".repeat(5 - Math.floor(product.rating))}
            </span>
            <span className={styles.reviewCount}>
              {product.rating} ({product.reviews} reviews)
            </span>
          </div>

          <div className={styles.priceSection}>
            <span className={styles.currentPrice}>
              ₹{product.price.toLocaleString("en-IN")}
            </span>
            {product.originalPrice && (
              <>
                <span className={styles.originalPrice}>
                  ₹{product.originalPrice.toLocaleString("en-IN")}
                </span>
                <span className={styles.discount}>{discountPercent}% OFF</span>
              </>
            )}
          </div>

          <p className={styles.description}>{product.description}</p>

          {product.ageRange && (
            <div className={styles.ageBadge}>
              👶 Recommended Age: {product.ageRange}
            </div>
          )}

          {product.features && product.features.length > 0 && (
            <div className={styles.features}>
              {product.features.map((feature, i) => (
                <div key={i} className={styles.feature}>{feature}</div>
              ))}
            </div>
          )}

          <div className={styles.quantityRow}>
            <div className={styles.quantityControl}>
              <button
                className={styles.qtyBtn}
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                −
              </button>
              <div className={styles.qtyValue}>{quantity}</div>
              <button
                className={styles.qtyBtn}
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
            <button
              className={styles.addToCartBtn}
              onClick={() => addToCart(product, quantity)}
            >
              🛒 Add to Cart
            </button>
          </div>

          <div className={`${styles.stockStatus} ${styles.inStock}`}>
            ✅ In Stock — Ships within 2-3 business days
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className={styles.relatedSection}>
          <h2 className="section-title" style={{ textAlign: "left" }}>
            You May Also Like 💝
          </h2>
          <div className={styles.relatedGrid}>
            {relatedProducts.map((rp) => (
              <Link
                key={rp.id}
                href={`/product/${rp.slug}`}
                style={{
                  background: "var(--color-white)",
                  borderRadius: "var(--radius-lg)",
                  overflow: "hidden",
                  border: "1px solid var(--color-gray-light)",
                  transition: "all 0.3s ease",
                  display: "block",
                }}
              >
                <div style={{ position: "relative", aspectRatio: "1", overflow: "hidden" }}>
                  <Image src={rp.image} alt={rp.name} fill sizes="25vw" style={{ objectFit: "cover" }} />
                </div>
                <div style={{ padding: "var(--space-md)" }}>
                  <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "0.95rem", fontWeight: 500, marginBottom: 4 }}>
                    {rp.name}
                  </h3>
                  <span className="price">₹{rp.price.toLocaleString("en-IN")}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
