"use client";
import { useState } from "react";
import styles from "./Newsletter.module.css";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <span className={styles.emoji}>🎁</span>
        <h2 className={styles.title}>Get 10% Off Your First Order!</h2>
        <p className={styles.subtitle}>
          Subscribe for exclusive deals, new toy arrivals, and parenting tips
          delivered to your inbox.
        </p>
        {submitted ? (
          <p style={{ color: "white", fontSize: "1.2rem", fontWeight: 600 }}>
            🎉 Welcome to the KidZoo family! Check your inbox for your discount code.
          </p>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              type="email"
              className={styles.input}
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className={styles.btn}>
              Subscribe
            </button>
          </form>
        )}
        <p className={styles.note}>No spam, ever. Unsubscribe anytime.</p>
      </div>
    </section>
  );
}
