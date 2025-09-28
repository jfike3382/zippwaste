"use client";

import { useNotification } from "@/providers/notifications";
import { ZippWorksMediaSubscription } from "@/api/stripe-client";
import { formatDate } from "@/utils/format-data/date";
import SettingsItem from "@/app/settings/content/settings-item";

export default function WebsitePlan({ userInfo, setLoading }) {
  const { showNotification } = useNotification();

  const handleSubscription = async () => {
    if (!userInfo.website_plan || !userInfo.website_plan.plan) {
      window.location.href = "/zippworks-media";
      return;
    }

    try {
      setLoading(true);
      const response = await ZippWorksMediaSubscription({
        cancel_url: window.location.href,
      });
      if (response.error) {
        showNotification("error", response.error);
      } else {
        window.location.href = response;
      }
    } catch (error) {
      console.error("Subscription error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <h2 className="title-m">Website plan</h2>
      <div className="flex flex-col gap-8">
        <SettingsItem
          title={userInfo.website_plan?.plan || "No Website Plan"}
          subtitle={
            userInfo.website_plan?.plan ? (
              <>
                You are on <span>{userInfo.website_plan.plan}</span> plan now
              </>
            ) : (
              <>Get a professional website for your business</>
            )
          }
          buttonText={
            userInfo.website_plan?.plan ? "Manage subscription" : "View Plans"
          }
          onClick={() => handleSubscription()}
        />
      </div>

      {userInfo.website_plan?.plan && (
        <p>
          {userInfo.website_plan.end_date ? (
            <>
              Your plan expires on{" "}
              <span className="font-semibold">
                {formatDate(userInfo.website_plan.end_date)}
              </span>
              .
            </>
          ) : userInfo.website_plan.next_charge ? (
            <>
              Plan limits will renew by{" "}
              <span className="font-semibold">
                {formatDate(userInfo.website_plan.next_charge)}
              </span>
              .
            </>
          ) : null}
        </p>
      )}
    </div>
  );
}
