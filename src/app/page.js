import Hero from "@/components/home/Hero";
import TrustBadges from "@/components/home/TrustBadges";
import Sidebar from "@/components/home/Sidebar";
import FeaturedProducts from "@/components/home/FeaturedProducts";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBadges />
      <div 
        style={{ 
          maxWidth: "1200px", 
          margin: "0 auto", 
          padding: "0 15px", 
          display: "flex", 
          gap: "30px",
          marginTop: "20px"
        }}
      >
        <div style={{ width: "280px", flexShrink: 0 }}>
          <Sidebar />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <FeaturedProducts />
        </div>
      </div>
    </>
  );
}
