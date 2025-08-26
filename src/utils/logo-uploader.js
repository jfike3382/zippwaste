"use client";
import { useState, useCallback } from "react";
import { useNotification } from "@/providers/notifications";
import * as FileUploadClient from "@/api/file-upload-client";
import Button from "@/components/uikit/button";

export default function LogoUploader({
  onLogoChange,
  apiName,
  text = "Upload company logo",
}) {
  const { showNotification } = useNotification();
  const [loading, setLoading] = useState(false);

  const [logoInput] = useState(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    return input;
  });

  const handleLogoChange = useCallback(
    async (event) => {
      const file = event.target.files?.[0];
      if (!file) return;

      setLoading(true);
      const uploadData = { logo: file };

      try {
        const uploadApi = FileUploadClient[apiName];
        if (typeof uploadApi !== "function") {
          throw new Error("Invalid upload API");
        }
        const response = await uploadApi(uploadData);
        if (response.error) {
          showNotification("error", response.error);
        } else {
          const blobUrl = URL.createObjectURL(file);
          onLogoChange(blobUrl, response);
          showNotification("success", response.success_message);
        }
      } catch (error) {
        showNotification("error", error.message);
      } finally {
        setLoading(false);
      }
    },
    [showNotification, onLogoChange, apiName]
  );

  const handleLogoClick = useCallback(() => {
    logoInput.onchange = handleLogoChange;
    logoInput.click();
  }, [logoInput, handleLogoChange]);

  return (
    <Button
      variant="secondary"
      size="s"
      onClick={handleLogoClick}
      disabled={loading}
    >
      {text}
    </Button>
  );
}
