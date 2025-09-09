import { formatNumber } from "@/utils/format-data/number";
import formatLocation from "@/utils/format-data/location";

export default function ProfileFAQ({ item }) {
  const getFAQItems = () => {
    const companyName = item.firm_data?.name || item.name || "Company";
    const name = item.name || "Company";

    const totalInvestments = item.filters.number_investments || 0;
    const leadInvestments = item.filters.number_lead_investments || 0;
    const leadPercentage =
      totalInvestments > 0 ? (leadInvestments / totalInvestments) * 100 : 0;
    const isLeadInvestor = leadPercentage > 12;

    if (item.firm_data) {
      return [
        {
          question: `Do ${name} and ${companyName} lead rounds?`,
          answer: isLeadInvestor
            ? `Yes, ${companyName} leadsp rounds. They have led at least ${formatNumber(
                item.filters.number_lead_investments
              )} investment rounds.`
            : `No, ${companyName} typically doesn't lead rounds and prefer to made follow-on investments.`,
        },
        {
          question: `Where ${name} is based?`,
          answer: `${name} is located in ${
            formatLocation(item, false) || "location not specified"
          }.`,
        },
      ];
    }

    // If type is Angel investor
    if (item.type === "Angel investor") {
      return [
        {
          question: `How many investments ${name} made?`,
          answer: `${name} have made at least ${formatNumber(
            item.filters.number_investments
          )} investments and ${formatNumber(item.filters.number_exits)} exits.`,
        },
        {
          question: `Do ${name} lead rounds?`,
          answer: isLeadInvestor
            ? `Yes, ${name} leads rounds. They have led at least ${formatNumber(
                item.filters.number_lead_investments
              )} investment rounds.`
            : `No, ${name} typically doesn't lead rounds and prefer to made follow-on investments.`,
        },
        {
          question: `Do ${name} invest in diversity founders?`,
          answer: item.filters.diversity_investments
            ? `Yes, ${name} invest in diversity founders. They made at least ${formatNumber(
                item.filters.diversity_investments
              )} investments in diversity founders.`
            : `We don't have any information about ${name} diversity investments.`,
        },
        {
          question: `What regions ${name} invest?`,
          answer: `${name} invest in ${
            item.filters.geography?.join(", ") || "various regions"
          }.`,
        },
        {
          question: `Where ${name} is based?`,
          answer: `${name} is located in ${
            formatLocation(item, false) || "location not specified"
          }.`,
        },
      ];
    }

    // Default company FAQ
    return [
      {
        question: `How many investments ${companyName} made?`,
        answer: `${companyName} have made at least ${formatNumber(
          item.filters.number_investments
        )} investments and ${formatNumber(item.filters.number_exits)} exits.`,
      },
      {
        question: `Do ${companyName} lead rounds?`,
        answer: isLeadInvestor
          ? `Yes, ${companyName} lead rounds. They made at least ${formatNumber(
              item.filters.number_lead_investments
            )} investment leading round.`
          : `No, ${companyName} typically doesn't lead rounds and prefer to made following investments.`,
      },
      {
        question: `Do ${companyName} invest in diversity founders?`,
        answer: item.filters.diversity_investments
          ? `Yes, ${companyName} invest in diversity founders. They made at least ${formatNumber(
              item.filters.diversity_investments
            )} investments in diversity founders.`
          : `We don't have any information about ${companyName} diversity investments.`,
      },
      {
        question: `What regions ${companyName} invest?`,
        answer: `${companyName} invest in ${
          item.filters.geography?.join(", ") || "various regions"
        }.`,
      },
      {
        question: `Where is ${companyName}'s headquarters?`,
        answer: `${companyName} is located in ${
          formatLocation(item, false) || "location not specified"
        }.`,
      },
      {
        question: `When ${companyName} has been founded?`,
        answer: `${companyName} has been founded in ${
          item.founded_year || "year not specified"
        }.`,
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
