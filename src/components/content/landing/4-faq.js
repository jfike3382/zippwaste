import FAQItem from "@/components/global-elements/faq-item";
import FAQContent from "@/data/faq.json";

export default function Section() {
  const filteredContent = FAQContent.filter((item) => item.landing === true);

  return (
    <section className="w-full max-w-[40rem] mx-auto items-center flex flex-col gap-12 justify-center">
      <h2 className="title-m">Frequently Asked Questions</h2>
      <div className="flex flex-col gap-8 w-full">
        {filteredContent.map((faq_item, index) => (
          <FAQItem key={index} faq_item={faq_item} initialOpen={false} />
        ))}
      </div>
    </section>
  );
}
