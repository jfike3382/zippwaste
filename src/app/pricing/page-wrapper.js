import Pricing from "./content/hero-section";
import FAQ from "./content/faq";
import Footer from "@/components/global-elements/footer";

export default function PageWrapper() {
  return (
    <>
      <div className="flex flex-col gap-32 py-20 px-5 items-center justify-center max-md:py-16 max-md:gap-16">
        <Pricing />
        <FAQ />
      </div>
      <Footer />
    </>
  );
}
