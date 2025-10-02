"use client";

import { useState } from "react";
import Button from "@/uikit/button";
import Switcher from "@/uikit/switcher";
import { ToggleSwitcher } from "@/uikit/toggle-switcher";
import Tooltip from "@/uikit/tooltip";
import { useNotification } from "@/providers/notifications";
import { ManageSubscription } from "@/api/stripe-client";
import { useActionRouter } from "@/utils/use-action-router";
import { formatNumber } from "@/utils/format-data/number";

const billingOptions = [
  { label: "Monthly", value: "monthly" },
  { label: "Yearly", value: "yearly", tag: "16% off" },
];

export default function PricingContainerHeader({ plans, isCollapsed }) {
  const [billingInterval, setBillingInterval] = useState("monthly");
  const [boostStates, setBoostStates] = useState({});
  const { showNotification } = useNotification();
  const { handleActionRegistration } = useActionRouter();

  const handleSubscription = async (planId, e) => {
    if (!handleActionRegistration(e)) return;

    const fullPlanId = `${planId}-${billingInterval}`;

    try {
      const response = await ManageSubscription({
        success_url: window.location.origin + "/payment-success",
        cancel_url: window.location.href,
        plan_id: fullPlanId,
        boosted: boostStates[planId] || false,
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

  const getCurrentPrice = (plan, planIndex) => {
    const basePrice = parseInt(
      billingInterval === "monthly" ? plan.price_monthly : plan.price_yearly
    );

    // Only add boost price for paid plans (not free plan)
    if (boostStates[plan.id] && planIndex > 0) {
      const boostPrice = billingInterval === "monthly" ? 99 : 999;
      return basePrice + boostPrice;
    }

    return basePrice;
  };

  const getCurrentPeriod = (plan) => {
    return billingInterval === "monthly"
      ? plan.period_monthly
      : plan.period_yearly;
  };

  const toggleBoost = (planId) => {
    setBoostStates((prev) => ({
      ...prev,
      [planId]: !prev[planId],
    }));
  };

  return (
    <div className="flex flex-col gap-8 pt-10 relative bg-white">
      <div className="flex justify-center">
        <Switcher
          options={billingOptions}
          value={billingInterval}
          onChange={setBillingInterval}
        />
      </div>
      <div className="bg-white">
        <div className="border-standard p-4 bg-neutral-200/[.50] rounded-4xl">
          <div className="flex flex-row max-xl:flex-col max-xl:gap-4">
            <div className="flex flex-col gap-6 items-start p-6 min-w-[300px]">
              <div className="flex flex-col gap-8">
                <h3 className="title-m">{plans[0].name}</h3>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-row gap-1 items-end">
                    <span className="text-3xl geist-mono">
                      ${formatNumber(getCurrentPrice(plans[0], 0))}
                    </span>
                    <div className="flex items-center">
                      <span className="text-sm text-secondary">/</span>
                      <span className="text-sm text-secondary">
                        {getCurrentPeriod(plans[0])}
                      </span>
                    </div>
                  </div>
                  <span className="text-sm text-secondary">
                    {plans[0].price_description}
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
            </div>
            <div className="flex flex-row bg-white rounded-2xl w-fit max-xl:bg-transparent max-xl:flex-col max-xl:gap-4 max-xl:w-full">
              {plans.slice(1).map((plan, planIndex) => (
                <div
                  key={planIndex}
                  className="flex flex-col gap-6 items-start p-6 min-w-[300px] max-xl:bg-white max-xl:rounded-2xl"
                >
                  <div className="flex flex-col gap-8 w-full">
                    <div className="flex flex-row items-center justify-between">
                      <h3 className="title-m">{plan.name}</h3>
                      {plan.badge && (
                        <p className="tag white small ">{plan.badge}</p>
                      )}
                    </div>
                    <div className="flex flex-row gap-4 items-center w-full">
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-medium">
                          Boost add-on
                        </span>
                        <Tooltip
                          text="Your listing appears at the very top of search results — above all other plans in your service ZIPs."
                          orientation="top"
                        />
                      </div>
                      <ToggleSwitcher
                        checked={boostStates[plan.id] || false}
                        onChange={() => toggleBoost(plan.id)}
                      />
                    </div>
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-row gap-1 items-end">
                        <span className="text-3xl geist-mono">
                          ${formatNumber(getCurrentPrice(plan, planIndex + 1))}
                        </span>
                        <div className="flex items-center">
                          <span className="text-sm text-secondary">/</span>
                          <span className="text-sm text-secondary">
                            {getCurrentPeriod(plan)}
                          </span>
                        </div>
                      </div>
                      <span className="text-sm text-secondary">
                        {plan.price_description}
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
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="h-10 w-full bg-gradient-to-b from-[#fff] to-[rgba(255,255,255,0)] absolute left-0 -bottom-10" />
      </div>
    </div>
  );
}
