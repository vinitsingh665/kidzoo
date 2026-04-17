"use client";
import { useState } from "react";
import styles from "./contact.module.css";

const faqs = [
  {
    q: "How long does shipping take?",
    a: "Standard shipping takes 3-5 business days. Express shipping (1-2 days) is available for an additional ₹99. All orders above ₹499 qualify for free standard shipping!",
  },
  {
    q: "Are your toys safe for babies?",
    a: "Absolutely! All our toys are BPA-free, non-toxic, and meet international safety standards (ASTM, EN71, CPSIA). Age recommendations are clearly listed on every product page to help you choose the right toy.",
  },
  {
    q: "What is your return policy?",
    a: "We offer a hassle-free 30-day return policy. If you're not satisfied with your purchase, simply contact us and we'll arrange a return or exchange at no extra cost.",
  },
  {
    q: "Do you ship internationally?",
    a: "Currently, we ship across India. International shipping will be available soon! Sign up for our newsletter to be the first to know.",
  },
  {
    q: "Can I gift wrap my order?",
    a: "Yes! We offer premium gift wrapping for just ₹49. You can add a personalized message card too. Select the gift wrap option at checkout.",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "", email: "", subject: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles.contactPage}>
      <div className={styles.heroSection}>
        <h1 className={styles.heroTitle}>Get in Touch 💌</h1>
        <p className={styles.heroSubtitle}>
          Have a question or need help? We&apos;d love to hear from you! Our team
          typically responds within 24 hours.
        </p>
      </div>

      <div className={styles.layout}>
        {/* Form */}
        <div className={styles.formSection}>
          {submitted ? (
            <div className={styles.successMsg}>
              <span className={styles.successEmoji}>🎉</span>
              <h3 className={styles.successTitle}>Message Sent!</h3>
              <p className={styles.successText}>
                Thank you for reaching out. We&apos;ll get back to you within 24 hours!
              </p>
            </div>
          ) : (
            <>
              <h2 className={styles.formTitle}>Send Us a Message</h2>
              <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label htmlFor="name">Your Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="email">Email Address</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="subject">Subject</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a topic</option>
                    <option value="order">Order Inquiry</option>
                    <option value="product">Product Question</option>
                    <option value="return">Returns & Refunds</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="message">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Tell us how we can help..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className={styles.submitBtn}>
                  Send Message ✉️
                </button>
              </form>
            </>
          )}
        </div>

        {/* Info Cards */}
        <div className={styles.infoSection}>
          <div className={styles.infoCard}>
            <span className={styles.infoIcon}>📧</span>
            <h3 className={styles.infoTitle}>Email Us</h3>
            <p className={styles.infoText}>
              For any queries, reach out at{" "}
              <a href="mailto:hello@kidzoo.in" className={styles.infoLink}>
                hello@kidzoo.in
              </a>
            </p>
          </div>
          <div className={styles.infoCard}>
            <span className={styles.infoIcon}>📞</span>
            <h3 className={styles.infoTitle}>Call Us</h3>
            <p className={styles.infoText}>
              Mon–Sat, 9AM – 7PM IST<br />
              <a href="tel:+911234567890" className={styles.infoLink}>
                +91 12345 67890
              </a>
            </p>
          </div>
          <div className={styles.infoCard}>
            <span className={styles.infoIcon}>📍</span>
            <h3 className={styles.infoTitle}>Visit Us</h3>
            <p className={styles.infoText}>
              KidZoo HQ<br />
              123 Toy Street, Koramangala<br />
              Bangalore, Karnataka 560034
            </p>
          </div>
          <div className={styles.infoCard}>
            <span className={styles.infoIcon}>💬</span>
            <h3 className={styles.infoTitle}>Live Chat</h3>
            <p className={styles.infoText}>
              Chat with our team in real-time! Available Mon–Fri, 10AM – 6PM IST.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className={styles.faqSection}>
        <h2 className="section-title">Frequently Asked Questions ❓</h2>
        <p className="section-subtitle">
          Quick answers to questions you might have.
        </p>
        {faqs.map((faq, i) => (
          <div key={i} className={styles.faqItem}>
            <button
              className={styles.faqQuestion}
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
            >
              {faq.q}
              <span className={`${styles.faqArrow} ${openFaq === i ? styles.open : ""}`}>
                ▼
              </span>
            </button>
            {openFaq === i && <div className={styles.faqAnswer}>{faq.a}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
