"use client";

import { useNotification } from "@/providers/notifications";
import { ManageSubscription } from "@/api/stripe-client";
import { formatDate } from "@/utils/format-data/date";
import SettingsItem from "@/app/settings/content/settings-item";

export default function Billing({ userInfo, setLoading }) {
  const { showNotification } = useNotification();

  const handleSubscription = async () => {
    if (userInfo.pricing_package === "Starter") {
      window.location.href = "/pricing";
      return;
    }

    try {
      setLoading(true);
      const response = await ManageSubscription({
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
      <h2 className="title-m">Billing</h2>
      <div className="flex flex-col gap-8">
        <SettingsItem
          title={userInfo.pricing_package}
          subtitle={
            <>
              You are on <span>{userInfo.pricing_package}</span> plan now
            </>
          }
          buttonText="Manage subscription"
          onClick={() => handleSubscription()}
        />
      </div>

      {userInfo.pricing_package !== "Starter" && (
        <p className="text-lg mt-8">
          {userInfo.end_date ? (
            <>
              Your plan expires on{" "}
              <span className="font-semibold">
                {formatDate(userInfo.end_date)}
              </span>
              .
            </>
          ) : (
            <>
              Plan limits will renew by{" "}
              <span className="font-semibold">
                {formatDate(userInfo.next_charge)}
              </span>
              .
            </>
          )}
        </p>
      )}
    </div>
  );
}
