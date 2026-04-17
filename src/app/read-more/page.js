import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Read More - School Bus XXL | KidZoo",
  description: "Learn more about our exclusive School Bus XXL promotion.",
};

export default function ReadMorePage() {
  return (
    <div className="container" style={{ padding: "80px 15px", minHeight: "60vh" }}>
      <div style={{
        display: "flex",
        flexDirection: "row",
        gap: "50px",
        background: "white",
        padding: "40px",
        borderRadius: "20px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
        flexWrap: "wrap",
        alignItems: "center"
      }}>
        <div style={{ flex: "1 1 400px", display: "flex", justifyContent: "center" }}>
          {/* We use a large SVG icon as placeholder for the bus, similar to the hero if no image exists */}
          <svg viewBox="0 0 24 24" width="200" height="200" stroke="var(--color-primary)" strokeWidth="1" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/>
            <circle cx="7" cy="17" r="2"/>
            <path d="M9 17h6"/>
            <circle cx="17" cy="17" r="2"/>
          </svg>
        </div>
        
        <div style={{ flex: "2 1 400px" }}>
          <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "2.5rem", color: "var(--color-dark)", marginBottom: "10px" }}>
            The Ultimate School Bus XXL
          </h1>
          <h2 style={{ fontSize: "1.5rem", color: "var(--color-orange)", marginBottom: "20px" }}>
            Now Only $59!
          </h2>
          
          <p style={{ color: "var(--color-dark-light)", fontSize: "1.1rem", lineHeight: "1.6", marginBottom: "20px" }}>
            Give your child the joy of the Ultimate School Bus XXL. Made from high-quality, durable materials, this toy is designed to withstand the most adventurous playtime sessions. 
            It features working wheels, a sturdy frame, and plenty of space inside for all their favorite action figures.
          </p>
          
          <ul style={{ color: "var(--color-dark-light)", fontSize: "1rem", lineHeight: "1.8", marginBottom: "30px", paddingLeft: "20px" }}>
            <li>Handmade with child-safe paints and materials</li>
            <li>Extra Large size for maximum fun</li>
            <li>Helps develop motor skills and imaginative play</li>
            <li>Limited time offer - get it while stocks last!</li>
          </ul>
          
          <div style={{ display: "flex", gap: "20px" }}>
            <button className="btn btn-primary" style={{ padding: "12px 30px", fontSize: "1.1rem" }}>
              Add to Cart 🛒
            </button>
            <Link href="/" className="btn btn-secondary" style={{ padding: "12px 30px", fontSize: "1.1rem", textDecoration: "none", color: "var(--color-dark)", border: "2px solid #ddd", borderRadius: "50px" }}>
              Back to Store
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
