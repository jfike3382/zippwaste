"use client";

import Button from "@/uikit/button";
import StartupIcon from "@/uikit/icons/startup";
import SearchIcon from "@/uikit/icons/search";
import RaizerIcon from "@/uikit/icons/raizer-icon";
import ExtraIcon from "@/uikit/icons/extra";

import { useNotification } from "@/providers/notifications";
import { ManageSubscription } from "@/api/stripe-client";
import { useActionRouter } from "@/utils/use-action-router";

const iconMap = {
  startup: StartupIcon,
  search: SearchIcon,
  "raizer-icon": RaizerIcon,
  extra: ExtraIcon,
};

const getSectionLabel = (featureName, plan) => {
  if (featureName === "Investor Search" && plan.exports) {
    return `${featureName}: ${plan.exports} exports`;
  }
  if (featureName === "AI Features" && plan.aiCredits) {
    return `${featureName}: ${plan.aiCredits} credits`;
  }
  return featureName;
};

const renderFeatureSection = (features, plan) => {
  return features.map((feature, index) => {
    const IconComponent = iconMap[feature.icon];
    const hasAnyAvailable = feature.items.some((item) => item.available);

    return hasAnyAvailable ? (
      <div
        key={index}
        className={`flex items-center gap-3 ${
          feature.name === "AI Features" && hasAnyAvailable
            ? "text-brand-violet-500"
            : ""
        }`}
      >
        <IconComponent size={24} />
        <span
          className={`font-medium text-sm ${
            feature.name === "AI Features" ? "violet-gradient-text" : ""
          }`}
        >
          {getSectionLabel(feature.name, plan)}
        </span>
      </div>
    ) : null;
  });
};

export default function PricingContainerHeader({ plans, isCollapsed }) {
  const { showNotification } = useNotification();
  const { handleActionRegistration } = useActionRouter();

  const handleSubscription = async (planId, e) => {
    if (!handleActionRegistration(e)) return;

    try {
      const response = await ManageSubscription({
        success_url: window.location.origin + "/payment-success",
        cancel_url: window.location.href,
        plan_id: planId,
      });
      if (response.error) {
        showNotification("error", response.error);
      } else {
        window.location.href = response;
      }
    } catch (error) {
      console.error("Subscription error:", error);
    }
  };

  const handleFreeButtonClick = (e) => {
    e.stopPropagation();
    if (!handleActionRegistration(e)) return;
  };

  return (
    <div className="bg-white pt-10 relative">
      <div className="border-standard p-4 bg-brand-gray-200 rounded-4xl">
        <div className="flex flex-row max-xl:flex-col max-xl:gap-4">
          <div className="flex flex-col gap-6 items-start p-6 min-w-[300px]">
            <div className="flex flex-col gap-8">
              <h3 className="title-m">{plans[0].name}</h3>
              <div className="flex flex-col gap-3">
                <span className="text-3xl geist-mono">{plans[0].price}</span>
                <span className="text-brand-gray-800">
                  {plans[0].accessDuration}
                </span>
              </div>
            </div>
            <Button
              variant="secondary"
              size="m"
              onClick={handleFreeButtonClick}
            >
              Get Started
            </Button>
            <div
              className={`flex flex-col gap-4 transition-all duration-300 overflow-hidden ${
                isCollapsed ? "max-h-0 opacity-0 -mb-6" : "max-h-96 opacity-100"
              }`}
            >
              {renderFeatureSection(plans[0].features, plans[0])}
            </div>
          </div>
          <div className="flex flex-row bg-white rounded-2xl w-fit max-xl:bg-transparent max-xl:flex-col max-xl:gap-4 max-xl:w-full">
            {plans.slice(1).map((plan, planIndex) => (
              <div
                key={planIndex}
                className="flex flex-col gap-6 items-start p-6 min-w-[300px] max-xl:bg-white max-xl:rounded-2xl"
              >
                <div className="flex flex-col gap-8 w-full">
                  <div className="flex flex-row  items-center justify-between">
                    <h3 className="title-m">{plan.name}</h3>
                    <p className="tag white small">{plan.tag}</p>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-row gap-1 items-baseline">
                      <span className="text-3xl geist-mono">{plan.price}</span>
                    </div>
                    <span className="text-brand-gray-800">
                      {plan.accessDuration}
                    </span>
                  </div>
                </div>
                <Button
                  variant="black"
                  size="m"
                  onClick={(e) => handleSubscription(plan.id, e)}
                >
                  Get Started
                </Button>
                <div
                  className={`flex flex-col gap-4 transition-all duration-300 overflow-hidden ${
                    isCollapsed
                      ? "max-h-0 opacity-0 -mb-6"
                      : "max-h-96 opacity-100"
                  }`}
                >
                  {renderFeatureSection(plan.features, plan)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="h-10 w-full bg-gradient-to-b from-[#fff] to-[rgba(255,255,255,0)] absolute left-0 -bottom-10" />
    </div>
  );
}
