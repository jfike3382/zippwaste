"use client";

import { useState } from "react";
import { useNotification } from "@/providers/notifications";
import Button from "@/uikit/button";
import ProfileSection from "@/components/company-page/profile-wrapper";
import { PublishStartup } from "@/api/actions-client";
import { setCookie } from "@/utils/cookies";

export default function Section({ data }) {
  const [loading, setLoading] = useState(false);
  const { showNotification } = useNotification();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await PublishStartup();
      if (response.error) {
        showNotification("error", response.error);
      } else if (response.data) {
        if (response.data) {
          setCookie("user_startup", JSON.stringify(response.data));
        }
        if (response.data.slug) {
          window.location.href = `/startup/${response.data.slug}`;
          return;
        }
      }
    } catch (e) {
      showNotification("error", "Unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="title-l">Submission</h1>
      <ProfileSection item={data} actions={false} />
      <div className="flex items-start">
        <Button
          variant="black"
          size="m"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit →"}
        </Button>
      </div>
    </>
  );
}
