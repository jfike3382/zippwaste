import FAQItem from "@/components/global-elements/faq-item";
import FAQContent from "@/data/faq.json";
import Button from "@/uikit/button";

export default function Section() {
  const filteredContent = FAQContent.filter(
    (item) => item.category === "Plans and Payments"
  );

  return (
    <section className="main-landing-section">
      <div className="landing-container max-w-[40rem]">
        <h2 className="title-l">Your questions, answered</h2>
        <div className="flex flex-col gap-8 w-full">
          {filteredContent.map((faq_item, index) => (
            <FAQItem key={index} faq_item={faq_item} initialOpen={false} />
          ))}
        </div>
      </div>
    </section>
  );
}
