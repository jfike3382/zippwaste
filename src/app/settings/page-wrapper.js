"use client";

import { useEffect, useState } from "react";
import GlobalLoader from "@/components/global-elements/global-loader";
import { SettingsApi } from "@/api/actions-client";
import UserSettings from "@/app/settings/content/user-settings";
import Billing from "@/app/settings/content/billing";

export default function PageWrapper() {
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const response = await SettingsApi.getUserInfo();
      if (!response.error) {
        setUserInfo(response.user || []);
      }
      setLoading(false);
    };

    fetchUserInfo();
  }, []);

  return (
    <>
      <GlobalLoader show={loading} />
      <section className="main-data-container max-w-4xl">
        <h1 className="title-l text-center">Settings</h1>
        {userInfo && Object.keys(userInfo).length > 0 && (
          <div className="flex flex-col gap-12">
            <UserSettings userInfo={userInfo} setUserInfo={setUserInfo} />
            <div className="divider" />
            <Billing userInfo={userInfo} setLoading={setLoading} />
          </div>
        )}
      </section>
    </>
  );
}
