"use client";

import { useNotification } from "@/providers/notifications";
import { ZippWorksMediaSubscription } from "@/api/stripe-client";
import { formatDate } from "@/utils/format-data/date";
import SettingsItem from "@/app/settings/content/settings-item";

export default function WebsitePlan({ userInfo, setLoading }) {
  const { showNotification } = useNotification();

  const handleSubscription = async () => {
    if (
      !userInfo.zippworks_media_price ||
      !userInfo.zippworks_media_price.plan
    ) {
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
          title={userInfo.zippworks_media_price?.plan || "No Website Plan"}
          subtitle={
            userInfo.zippworks_media_price?.plan ? (
              <>
                You are on <span>{userInfo.zippworks_media_price.plan}</span>{" "}
                plan now
              </>
            ) : (
              <>Get a professional website for your business</>
            )
          }
          buttonText={
            userInfo.zippworks_media_price?.plan
              ? "Manage subscription"
              : "View Plans"
          }
          onClick={() => handleSubscription()}
        />
      </div>

      {userInfo.zippworks_media_price?.plan && (
        <p>
          {userInfo.zippworks_media_price.end_date ? (
            <>
              Your plan expires on{" "}
              <span className="font-semibold">
                {formatDate(userInfo.zippworks_media_price.end_date)}
              </span>
              .
            </>
          ) : userInfo.zippworks_media_price.next_charge ? (
            <>
              Plan limits will renew by{" "}
              <span className="font-semibold">
                {formatDate(userInfo.zippworks_media_price.next_charge)}
              </span>
              .
            </>
          ) : null}
        </p>
      )}
    </div>
  );
}
