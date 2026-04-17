import Hero from "@/components/home/Hero";
import TrustBadges from "@/components/home/TrustBadges";
import Sidebar from "@/components/home/Sidebar";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBadges />
      <div className={styles.homeLayout}>
        <div className={styles.sidebarWrap}>
          <Sidebar />
        </div>
        <div className={styles.mainWrap}>
          <FeaturedProducts />
        </div>
      </div>
    </>
  );
}
