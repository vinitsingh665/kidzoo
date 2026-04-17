import Link from "next/link";

export const metadata = {
  title: "Our Services | KidZoo",
  description: "Learn about the premium services we offer at KidZoo, including fast delivery, free returns, and safe & handmade toys.",
};

export default function ServicesPage() {
  return (
    <div className="container" style={{ padding: "80px 15px", minHeight: "60vh" }}>
      <h1 className="section-title">Our Services</h1>
      <p className="section-subtitle">
        At KidZoo, we go beyond just selling toys. We provide exceptional services to make your shopping experience magical.
      </p>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "30px",
        marginTop: "40px"
      }}>
        <div style={{ background: "white", padding: "40px 30px", borderRadius: "15px", boxShadow: "0 4px 15px rgba(0,0,0,0.05)", textAlign: "center" }}>
          <div style={{ fontSize: "3rem", color: "var(--color-primary)", marginBottom: "20px" }}>🚚</div>
          <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.2rem", marginBottom: "15px" }}>Fast & Reliable Delivery</h3>
          <p style={{ color: "var(--color-dark-light)", fontSize: "0.95rem" }}>
            We have a dedicated packaging and delivery team that ensures all orders are shipped quickly and arrive in pristine condition right to your doorstep.
          </p>
        </div>
        
        <div style={{ background: "white", padding: "40px 30px", borderRadius: "15px", boxShadow: "0 4px 15px rgba(0,0,0,0.05)", textAlign: "center" }}>
          <div style={{ fontSize: "3rem", color: "var(--color-secondary)", marginBottom: "20px" }}>🧸</div>
          <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.2rem", marginBottom: "15px" }}>Safe & Handmade Products</h3>
          <p style={{ color: "var(--color-dark-light)", fontSize: "0.95rem" }}>
            The toys we sell are provided by the best manufacturers on the market. They are certified safe, non-toxic, and often beautifully handmade.
          </p>
        </div>

        <div style={{ background: "white", padding: "40px 30px", borderRadius: "15px", boxShadow: "0 4px 15px rgba(0,0,0,0.05)", textAlign: "center" }}>
          <div style={{ fontSize: "3rem", color: "var(--color-pink)", marginBottom: "20px" }}>🔄</div>
          <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.2rem", marginBottom: "15px" }}>Hassle-Free Returns</h3>
          <p style={{ color: "var(--color-dark-light)", fontSize: "0.95rem" }}>
            Not completely satisfied? You can return all purchases for up to 30 days after the transaction. No questions asked, no strings attached.
          </p>
        </div>
      </div>

      <div style={{ textAlign: "center", marginTop: "60px" }}>
        <Link href="/contact" className="btn btn-primary btn-large">
          Contact Support 💬
        </Link>
      </div>
    </div>
  );
}
