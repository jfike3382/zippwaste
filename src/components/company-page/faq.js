import { formatNumber } from "@/utils/format-data/number";
import formatLocation from "@/utils/format-data/location";

export default function ProfileFAQ({ item }) {
  const getFAQItems = () => {
    // Default company FAQ
    return [
      {
        question: `Question 1`,
        answer: `Answer 1`,
      },
      {
        question: `Question 2`,
        answer: `Answer 2`,
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
