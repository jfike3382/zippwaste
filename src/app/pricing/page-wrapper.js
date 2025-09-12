import Pricing from "./content/hero-section";
import FAQ from "./content/faq";
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
