import Link from "next/link";

export default function HelpdeskBanner() {
  return (
    <div style={{
      background: "#6EBCE6",
      borderRadius: "15px",
      padding: "20px 40px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: "40px",
      color: "white"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <div style={{ display: "flex" }}>
          <svg viewBox="0 0 24 24" width="48" height="48" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
        </div>
        <h3 style={{ 
          fontFamily: "var(--font-heading)", 
          fontSize: "1.4rem", 
          fontWeight: 700,
          margin: 0,
          letterSpacing: "0.5px"
        }}>
          OUR HELPDESK IS<br />ALWAYS READY TO HELP!
        </h3>
      </div>
      <Link href="/contact" style={{
        background: "white",
        color: "var(--color-dark)",
        padding: "10px 25px",
        borderRadius: "50px",
        textDecoration: "none",
        fontWeight: 700,
        fontSize: "0.9oz",
        display: "flex",
        alignItems: "center",
        gap: "10px"
      }}>
        START CHAT 
        <span style={{ 
          background: "var(--color-orange)", 
          color: "white", 
          width: "20px", 
          height: "20px", 
          borderRadius: "50%", 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center", 
          fontSize: "0.8rem" 
        }}>+</span>
      </Link>
    </div>
  );
}
