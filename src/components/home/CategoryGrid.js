import Image from "next/image";
import Link from "next/link";
import { categories } from "@/lib/mockData";
import styles from "./CategoryGrid.module.css";

export default function CategoryGrid() {
  return (
    <section className={styles.section}>
      <h2 className="section-title">Shop by Category 🎯</h2>
      <p className="section-subtitle">
        Find the perfect toy for your little explorer. Browse our curated categories.
      </p>
      <div className={styles.grid}>
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/shop?category=${encodeURIComponent(cat.name)}`}
            className={styles.card}
          >
            <Image
              src={cat.image}
              alt={cat.name}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className={styles.cardImage}
            />
            <div className={styles.cardOverlay}>
              <div className={styles.cardIcon}>{cat.icon}</div>
              <div className={styles.cardName}>{cat.name}</div>
              <div className={styles.cardCount}>{cat.count} products</div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
