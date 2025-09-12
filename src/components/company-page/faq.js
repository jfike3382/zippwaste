import { formatNumber } from "@/utils/format-data/number";
import formatLocation from "@/utils/format-data/location";

export default function ProfileFAQ({ item }) {
  const getFAQItems = () => {
    return [
      {
        question: `What types of waste disposal services does ${item.name} offer?`,
        answer: `${item.name} provides comprehensive waste management solutions including dumpster rentals, junk removal services, and debris disposal. We handle residential, commercial, and construction waste with various container sizes to meet your specific project needs.`,
      },
      {
        question: `What areas does ${item.name} serve for waste collection?`,
        answer: `${item.name} serves ${formatLocation(
          item,
          false
        )} and surrounding areas. We provide reliable waste pickup and disposal services throughout our service region with flexible scheduling options.`,
      },
      {
        question: `How much does dumpster rental cost with ${item.name}?`,
        answer: `Dumpster rental prices with ${item.name} vary based on container size, rental duration, and location. Contact us directly for a customized quote that fits your project budget and timeline. We offer competitive rates and transparent pricing.`,
      },
      {
        question: `How do I schedule waste pickup services with ${item.name}?`,
        answer: `Scheduling waste pickup with ${item.name} is easy. You can contact us through our website, phone, or email to arrange your service. We offer flexible pickup times and can accommodate both one-time and recurring waste collection needs.`,
      },
    ];
  };

  const faqItems = getFAQItems();

  return (
    <div className="flex flex-col gap-12">
      <h3 className="title-m">Frequently asked questions</h3>
      <div className="flex flex-col gap-8">
        {faqItems.map((item, index) => (
          <div className="flex flex-col gap-8" key={index}>
            <div className="flex flex-col gap-4">
              <p className="title-s">{item.question}</p>
              <p>{item.answer}</p>
            </div>
            {index < faqItems.length - 1 && <div className="divider" />}
          </div>
        ))}
      </div>
    </div>
  );
}
