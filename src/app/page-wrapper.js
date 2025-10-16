import Footer from "@/components/global-elements/footer";
import Section1 from "@/components/content/landing/1-hero-section";
import Section2 from "@/components/content/landing/2-how-it-works";

import Section4 from "@/components/content/landing/4-faq";
import Section5 from "@/components/content/landing/5-pre-footer";
export default function PageWrapper() {
  return (
    <>
      <div className="main-data-container">
        <Section1 />
        <Section2 />

        <Section4 />
        <Section5 />
      </div>
      <Footer />
    </>
  );
}
