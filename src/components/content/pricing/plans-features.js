"use client";

import StartupIcon from "@/uikit/icons/startup";
import SearchIcon from "@/uikit/icons/search";
import ExtraIcon from "@/uikit/icons/extra";
import CheckSimpleIcon from "@/uikit/icons/check-simple";
import CancelIcon from "@/uikit/icons/cancel";

const iconMap = {
  startup: StartupIcon,
  search: SearchIcon,
  extra: ExtraIcon,
};

const renderFeatureSection = (features) => {
  return features.map((feature, index) => {
    const IconComponent = iconMap[feature.icon];
    const hasAnyAvailable = feature.items.some((item) => item.available);

    return (
      <div
        className={`flex flex-col gap-6 w-full ${
          !hasAnyAvailable ? "opacity-40" : ""
        }`}
        key={index}
      >
        <div className="flex flex-col gap-5 w-full">
          <div className="flex items-center gap-3">
            <IconComponent size={24} />
            <span className="font-medium">{feature.name}</span>
          </div>
          {feature.items.map((item, itemIndex) => (
            <div
              key={itemIndex}
              className={`flex items-center gap-2 ${
                hasAnyAvailable && !item.available ? "opacity-40" : ""
              }`}
            >
              {item.available ? (
                <CheckSimpleIcon size={24} />
              ) : (
                <CancelIcon size={24} />
              )}
              <span>{item.name}</span>
            </div>
          ))}
        </div>
        {index < features.length - 1 && <div className="divider"></div>}
      </div>
    );
  });
};

export default function PricingFeatures({ plans }) {
  return (
    <div className="border-standard p-4 bg-neutral-200/[.50] rounded-4xl w-fit tablet-hidden mobile-hidden">
      <div className="flex flex-row">
        <div className="flex flex-col gap-6 items-start p-6 w-[300px]">
          {renderFeatureSection(plans[0].features)}
        </div>
        <div className="flex flex-row bg-white rounded-2xl w-fit">
          {plans.slice(1).map((plan, planIndex) => (
            <div
              key={planIndex}
              className="flex flex-col gap-6 items-start p-6 w-[300px]"
            >
              {renderFeatureSection(plan.features)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
