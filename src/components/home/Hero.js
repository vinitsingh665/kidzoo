import Image from "next/image";
import Link from "next/link";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.heroWrapper}>
      <div className={styles.hero}>
        <div className={styles.heroContainer}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              SCHOOL BUS XXL<br />
              NOW ONLY $59
            </h1>
            
            <div className={styles.scribble}>
              <svg width="100" height="20" viewBox="0 0 100 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 10.5C10 5.5 15 15.5 25 10.5C35 5.5 40 15.5 50 10.5C60 5.5 65 15.5 75 10.5C85 5.5 90 15.5 98 10.5" stroke="white" strokeWidth="3" strokeLinecap="round"/>
              </svg>
            </div>

            <div className={styles.heroActions}>
              <button className={styles.btnAddToCart}>
                ADD TO CART
                <span className={styles.btnIcon} style={{display: 'flex'}}>
                  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </span>
              </button>
              <Link href="/read-more" className={styles.btnReadMore}>
                READ MORE <span className={styles.btnIconOutline} style={{display: 'flex'}}>
                  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </span>
              </Link>
            </div>
            
            {/* Carousel navigation dots */}
            <div className={styles.carouselDots}>
              <span className={`${styles.dot} ${styles.activeDot}`}></span>
              <span className={styles.dot}></span>
              <span className={styles.dot}></span>
              <span className={styles.dot}></span>
              <span className={styles.dot}></span>
            </div>
          </div>
          
          <div className={styles.heroImageWrapper}>
            {/* Left/Right Carousel Arrows */}
            <button className={`${styles.carouselArrow} ${styles.arrowLeft}`} style={{display: 'flex'}}>
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            </button>
            
            <div className={styles.busPlaceholder} style={{display: 'flex', fill: '#F2D024'}}>
              <svg viewBox="0 0 24 24" width="200" height="200" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg>
            </div>
            <Image
              src="/images/hero.png"
              alt="School Bus XXL"
              width={600}
              height={400}
              className={styles.heroImage}
              style={{ opacity: 0, position: 'absolute' }}
              priority
            />
            
            <button className={`${styles.carouselArrow} ${styles.arrowRight}`} style={{display: 'flex'}}>
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Scalloped Bottom Edge */}
      <div className={styles.scallopedBottom}></div>
    </section>
  );
}
