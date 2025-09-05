import FAQItem from "@/components/global-elements/faq-item";
import FAQContent from "@/data/faq.json";

export default function FAQ({
  category,
  initialOpen = false,
  isFeaturedPricing = false,
  isFeaturedMain = false,
}) {
  const filteredContent = FAQContent.filter((item) => {
    if (isFeaturedPricing) return item.featured_pricing === true;
    if (isFeaturedMain) return item.featured_main === true;
    if (category) return item.category === category;
    return true;
  });

  return (
    <div className="flex flex-col gap-8 w-full">
      {filteredContent.map((faq_item, index) => (
        <FAQItem key={index} faq_item={faq_item} initialOpen={initialOpen} />
      ))}
    </div>
  );
}
