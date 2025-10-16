import Pricing from "../../components/content/pricing/hero-section";
import FAQ from "../../components/content/pricing/faq";
import Footer from "@/components/global-elements/footer";

export default function PageWrapper() {
  return (
    <>
      <div className="main-data-container">
        <Pricing />
        <FAQ />
      </div>
      <Footer />
    </>
  );
}
