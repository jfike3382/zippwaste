"use client";

import Button from "@/uikit/button";
import { useNotification } from "@/providers/notifications";
import { ManageSubscription } from "@/api/stripe-client";
import { useActionRouter } from "@/utils/use-action-router";
import CheckSimpleIcon from "@/uikit/icons/check-simple";

import pricingData from "@/data/zippworks-media-pricing.json";

export default function Content() {
  const { plans } = pricingData;
  const { showNotification } = useNotification();
  const { handleActionRouter } = useActionRouter();

  const handleSubscription = async (planId, e) => {
    if (!handleActionRegistration(e)) return;

    const fullPlanId = `${planId}-monthly`;

    try {
      const response = await ManageSubscription({
        success_url: window.location.origin + "/payment-success",
        cancel_url: window.location.href,
        plan_id: fullPlanId,
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

  return (
    <div className="flex flex-col gap-8 items-center justify-center relative mx-auto max-xl:mx-0">
      <div className="bg-white">
        <div className="border-standard p-4 bg-neutral-200 rounded-4xl flex flex-row gap-8 max-w-7xl items-stretch">
          {plans.map((plan, planIndex) => (
            <div
              key={planIndex}
              className="flex flex-col gap-6 items-start p-6 min-w-[300px] bg-white rounded-2xl flex-1"
            >
              <div className="flex flex-col gap-8 w-full">
                <div className="flex flex-row items-center justify-between">
                  <h3 className="title-m">{plan.name}</h3>
                  {plan.badge && (
                    <p className="tag white small ">{plan.badge}</p>
                  )}
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-row gap-1 items-end">
                    <span className="text-3xl geist-mono">
                      ${plan.setup_fee_price}
                    </span>
                    <span className="text-sm text-secondary">Setup fee</span>
                  </div>
                  <p className="text-sm text-secondary">
                    then ${plan.price_monthly}/{plan.period_monthly}
                  </p>
                </div>
                <Button
                  variant="black"
                  size="m"
                  className="w-full"
                  onClick={(e) => handleSubscription(plan.id, e)}
                >
                  Get {plan.name} plan
                </Button>
              </div>
              {plan.features.find((feature) =>
                feature.startsWith("Everything in")
              ) && (
                <p className="font-semibold">
                  {plan.features.find((feature) =>
                    feature.startsWith("Everything in")
                  )}
                </p>
              )}
              <div className="flex flex-col gap-5 w-full">
                {plan.features
                  .filter((feature) => !feature.startsWith("Everything in"))
                  .map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-2">
                      <CheckSimpleIcon size={20} />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
