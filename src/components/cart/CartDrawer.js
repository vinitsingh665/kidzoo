"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/cartContext";
import { createCheckout } from "@/lib/shopify";
import styles from "./CartDrawer.module.css";

export default function CartDrawer() {
  const {
    cartItems,
    cartCount,
    cartTotal,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
  } = useCart();

  if (!isCartOpen) return null;

  const shipping = cartTotal >= 499 ? 0 : 49;
  const grandTotal = cartTotal + shipping;

  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    try {
      const checkoutUrl = await createCheckout(cartItems);
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      }
    } catch (error) {
      console.error(error);
      alert("There was an error connecting to checkout. Please try again.");
      setIsCheckingOut(false);
    }
  };

  return (
    <>
      <div className={styles.overlay} onClick={() => setIsCartOpen(false)} />
      <div className={styles.drawer}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>
            🛒 Your Cart
            {cartCount > 0 && <span className={styles.itemCount}>{cartCount}</span>}
          </h2>
          <button className={styles.closeBtn} onClick={() => setIsCartOpen(false)}>
            ✕
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className={styles.emptyCart}>
            <div className={styles.emptyEmoji}>🧸</div>
            <h3 className={styles.emptyTitle}>Your cart is empty!</h3>
            <p className={styles.emptyText}>
              Looks like you haven&apos;t added any toys yet. Start shopping to fill it up!
            </p>
            <Link
              href="/shop"
              className="btn btn-primary"
              onClick={() => setIsCartOpen(false)}
            >
              Start Shopping →
            </Link>
          </div>
        ) : (
          <>
            {/* Items */}
            <div className={styles.items}>
              {cartItems.map((item) => (
                <div key={item.id} className={styles.item}>
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={72}
                    height={72}
                    className={styles.itemImage}
                  />
                  <div className={styles.itemDetails}>
                    <div className={styles.itemName}>{item.name}</div>
                    <div className={styles.itemPrice}>
                      ₹{item.price.toLocaleString("en-IN")}
                    </div>
                    <div className={styles.itemActions}>
                      <div className={styles.qtyControl}>
                        <button
                          className={styles.qtyBtn}
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          −
                        </button>
                        <div className={styles.qtyNum}>{item.quantity}</div>
                        <button
                          className={styles.qtyBtn}
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                      <button
                        className={styles.removeBtn}
                        onClick={() => removeFromCart(item.id)}
                        aria-label="Remove item"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className={styles.footer}>
              <div className={styles.subtotalRow}>
                <span>Subtotal</span>
                <span>₹{cartTotal.toLocaleString("en-IN")}</span>
              </div>
              <div className={styles.subtotalRow}>
                <span>Shipping</span>
                <span>{shipping === 0 ? "FREE 🎉" : `₹${shipping}`}</span>
              </div>
              {shipping > 0 && (
                <p style={{ fontSize: "0.8rem", color: "var(--color-secondary)", marginBottom: 8 }}>
                  Add ₹{(499 - cartTotal).toLocaleString("en-IN")} more for free shipping!
                </p>
              )}
              <div className={styles.totalRow}>
                <span>Total</span>
                <span>₹{grandTotal.toLocaleString("en-IN")}</span>
              </div>
              <button 
                className={styles.checkoutBtn} 
                onClick={handleCheckout} 
                disabled={isCheckingOut}
                style={{ opacity: isCheckingOut ? 0.7 : 1 }}
              >
                {isCheckingOut ? "Processing..." : "Proceed to Checkout 🔒"}
              </button>
              <button
                className={styles.continueShopping}
                onClick={() => setIsCartOpen(false)}
              >
                ← Continue Shopping
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
