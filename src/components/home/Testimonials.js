import Image from "next/image";
import { testimonials } from "@/lib/mockData";
import styles from "./Testimonials.module.css";

export default function Testimonials() {
  return (
    <section className={styles.section}>
      <h2 className="section-title">What Parents Say 💬</h2>
      <p className="section-subtitle">
        Join 10,000+ happy families who trust KidZoo for their children&apos;s joy.
      </p>
      <div className={styles.grid}>
        {testimonials.map((t) => (
          <div key={t.id} className={styles.card}>
            <span className={styles.stars}>{"★".repeat(t.rating)}{"☆".repeat(5 - t.rating)}</span>
            <p className={styles.text}>{t.text}</p>
            <div className={styles.author}>
              <Image
                src={t.avatar}
                alt={t.name}
                width={48}
                height={48}
                className={styles.avatar}
              />
              <div>
                <div className={styles.authorName}>{t.name}</div>
                <div className={styles.authorProduct}>Bought: {t.product}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
