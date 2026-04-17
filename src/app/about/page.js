import Image from "next/image";
import Link from "next/link";
import styles from "./about.module.css";

export const metadata = {
  title: "About Us — KidZoo | Premium Kids Toys & Accessories",
  description:
    "Learn about KidZoo's mission to make childhood magical with safe, educational, and exciting toys. Trusted by 10,000+ parents across India.",
};

export default function AboutPage() {
  const values = [
    { icon: "🛡️", title: "Safety First", desc: "Every toy is BPA-free, non-toxic, and tested to meet the highest international safety standards." },
    { icon: "🌟", title: "Premium Quality", desc: "We source only the finest materials and partner with trusted manufacturers worldwide." },
    { icon: "🎓", title: "Learn & Play", desc: "Our toys combine fun with education, developing creativity, motor skills, and cognitive abilities." },
    { icon: "💚", title: "Eco-Friendly", desc: "We're committed to sustainable packaging and eco-conscious toy manufacturing." },
  ];

  return (
    <div className={styles.aboutPage}>
      <div className={styles.heroSection}>
        <span className={styles.heroEmoji}>🦁</span>
        <h1 className={styles.heroTitle}>
          About <span className={styles.highlight}>KidZoo</span>
        </h1>
        <p className={styles.heroSubtitle}>
          We believe every child deserves a world of wonder. KidZoo was built by parents,
          for parents — to make finding the perfect, safe, and exciting toy as easy as possible.
        </p>
      </div>

      <div className={styles.storySection}>
        <Image
          src="https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=500&h=600&fit=crop&q=80"
          alt="Happy children playing together"
          width={500}
          height={400}
          className={styles.storyImage}
        />
        <div className={styles.storyContent}>
          <h2>Our Story 📖</h2>
          <p>
            KidZoo was born from a simple frustration — finding safe, quality toys online
            shouldn&apos;t be so hard. As parents ourselves, we spent hours researching every toy
            before buying. We wanted something better.
          </p>
          <p>
            So in 2024, we created KidZoo — a curated toy store where every product is
            hand-picked, safety-tested, and parent-approved. No guesswork, no compromises,
            just pure joy for your little ones.
          </p>
          <p>
            Today, we&apos;re proud to serve over <strong>10,000 happy families</strong> across
            India, and we&apos;re just getting started! 🚀
          </p>
        </div>
      </div>

      <div className={styles.valuesSection}>
        <h2 className="section-title">Our Values 💎</h2>
        <p className="section-subtitle">
          Everything we do is guided by these four core principles.
        </p>
        <div className={styles.valuesGrid}>
          {values.map((v, i) => (
            <div key={i} className={styles.valueCard}>
              <span className={styles.valueIcon}>{v.icon}</span>
              <h3 className={styles.valueTitle}>{v.title}</h3>
              <p className={styles.valueDesc}>{v.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.ctaSection}>
        <h2 className={styles.ctaTitle}>Ready to Make Your Kids Smile? 😊</h2>
        <p className={styles.ctaText}>
          Browse our collection of 500+ premium toys and find the perfect gift.
        </p>
        <Link href="/shop" className={styles.ctaBtn}>
          Shop Now 🛍️
        </Link>
      </div>
    </div>
  );
}
