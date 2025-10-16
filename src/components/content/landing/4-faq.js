import FAQItem from "@/components/global-elements/faq-item";
import FAQContent from "@/data/faq.json";
import QuestionIcon from "@/uikit/icons/question";

export default function Section() {
  const filteredContent = FAQContent.filter((item) => item.landing === true);

  return (
    <>
      <div className="gradient-divider" />
      <section className="section-container max-w-[40rem]">
        <div className="tag white uppercase">
          <QuestionIcon size={16} />
          <span>Questions & Answers</span>
        </div>
        <h2 className="title-l">Frequently asked questions</h2>

        <div className="flex flex-col gap-8 w-full">
          {filteredContent.map((faq_item, index) => (
            <FAQItem key={index} faq_item={faq_item} initialOpen={false} />
          ))}
        </div>
      </section>
    </>
  );
}
