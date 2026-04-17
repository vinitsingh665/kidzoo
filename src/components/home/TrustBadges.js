import styles from "./TrustBadges.module.css";

export default function TrustBadges() {
  const badges = [
    {
      id: 1,
      title: "SAFE AND HANDMADE",
      description: "Toys we sell are provided by the best manufacturers on the market, safe, handmade & certified.",
      icon: <svg viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>,
      colorClass: styles.pinkBadge
    },
    {
      id: 2,
      title: "FAST DELIVERY",
      description: "We have a dedicated packaging and delivery team that will make everything for fast shipment.",
      icon: <svg viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>,
      colorClass: styles.orangeBadge
    },
    {
      id: 3,
      title: "FREE RETURNS",
      description: "You can return all purchases for up to 30 days after transaction. No strings attached.",
      icon: <svg viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>,
      colorClass: styles.grayBadge
    }
  ];

  return (
    <section className={styles.trustSection}>
      <div className={styles.container}>
        <div className={styles.badgeGrid}>
          {badges.map((badge) => (
            <div key={badge.id} className={`${styles.badgeCard} ${badge.colorClass}`}>
              <div className={styles.badgeIcon}>{badge.icon}</div>
              <div className={styles.badgeContent}>
                <h3>{badge.title}</h3>
                <p>{badge.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
