import HeroSection from "../../components/content/zippworks-media/hero-section";
import FAQ from "../../components/content/zippworks-media/faq";
import Footer from "@/components/global-elements/footer";

export default function PageWrapper() {
  return (
    <>
      <div className="main-data-container">
        <HeroSection />
        <FAQ />
      </div>
      <Footer />
    </>
  );
}
