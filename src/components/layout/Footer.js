import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footerWrapper}>
      <div className={styles.scallopedTop}></div>
      <div className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerMain}>
            
            <div className={styles.col}>
              <h4 className={styles.colTitle}>OUR HEADQUARTERS</h4>
              <ul className={styles.contactInfo}>
                <li>
                  <span className={styles.icon} style={{display: 'flex', marginTop: '4px'}}>
                    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                  </span>
                  <div className={styles.contactText}>
                    378 Main Street 00733<br/>
                    Western London
                  </div>
                </li>
                <li>
                  <span className={styles.icon} style={{display: 'flex', marginTop: '4px'}}>
                    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                  </span>
                  <div className={styles.contactText}>info@example.com</div>
                </li>
                <li>
                  <span className={styles.icon} style={{display: 'flex', marginTop: '4px'}}>
                    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  </span>
                  <div className={styles.contactText}>+(44) 123-45-78</div>
                </li>
              </ul>
              <div className={styles.footerLogo}>
                <span className={styles.bearIcon} style={{display: 'flex'}}>
                  <svg viewBox="0 0 24 24" width="36" height="36" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="13" r="8"></circle>
                    <circle cx="6" cy="7" r="3"></circle>
                    <circle cx="18" cy="7" r="3"></circle>
                    <path d="M10 12h.01M14 12h.01M12 15c-1 0-2-.5-2-1.5M14 13.5c0 1-1 1.5-2 1.5"></path>
                  </svg>
                </span>
                <span className={styles.logoText}>kids</span>
              </div>
            </div>

            <div className={styles.col}>
              <h4 className={styles.colTitle}>PRODUCT CATEGORIES</h4>
              <ul className={styles.linksList}>
                <li><Link href="/shop">ACCESSORIES</Link></li>
                <li><Link href="/shop">CLOTHES</Link></li>
                <li><Link href="/shop">GREEN PRODUCTS</Link></li>
                <li><Link href="/shop">EDUCATIONAL PRODUCTS</Link></li>
                <li><Link href="/shop">TOYS</Link></li>
                <li><Link href="/shop">MISCELLANEOUS</Link></li>
              </ul>
            </div>

            <div className={styles.col}>
              <h4 className={styles.colTitle}>QUICK LINKS</h4>
              <ul className={styles.linksList}>
                <li><Link href="/about">ABOUT US</Link></li>
                <li><Link href="/shop">PRODUCTS</Link></li>
                <li><Link href="/testimonials">TESTIMONIALS</Link></li>
                <li><Link href="/locator">SHOP LOCATOR</Link></li>
                <li><Link href="/shop">ONLINE SHOP</Link></li>
                <li><Link href="/blog">BLOG</Link></li>
              </ul>
            </div>

            <div className={styles.colNewsletter}>
              <h4 className={styles.colTitle}>SIGN UP FOR OUR NEWSLETTER NOW!</h4>
              <div className={styles.newsletterForm}>
                <input type="email" placeholder="enter email address & press enter" />
                <button aria-label="Subscribe">→</button>
              </div>

              <h4 className={styles.colTitle} style={{marginTop: '40px'}}>FIND US ELSEWHERE</h4>
              <div className={styles.socialIcons}>
                <a href="#" aria-label="Facebook">
                  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </a>
                <a href="#" aria-label="Twitter">
                  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                </a>
                <a href="#" aria-label="Instagram">
                  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className={styles.footerBottomWrapper}>
        <div className={styles.container}>
          <div className={styles.footerBottom}>
            <div className={styles.bottomLeft}>
              <p>COPYRIGHT 2026 © KIDZOO. ALL RIGHTS RESERVED</p>
              <div className={styles.policyLinks}>
                <Link href="/privacy">PRIVACY POLICY</Link>
                <Link href="/terms">TERMS & CONDITIONS</Link>
              </div>
            </div>
            <div className={styles.paymentMethods} style={{display: 'flex', gap: '5px'}}>
              <svg viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
              <svg viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
              <svg viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
