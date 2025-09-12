import Button from "@/uikit/button";
import LogoUploader from "@/utils/logo-uploader";
import ProfileLogo from "@/uikit/profile-logo";
import ListingFields from "./listing-fields";
import { useState } from "react";
import { ListingApi } from "@/api/actions-client";
import { useNotification } from "@/providers/notifications";
import {
  useInputChangeHandler,
  useLogoChangeHandler,
  useSelectorChangeHandler,
} from "./form-handlers";

export default function Section({ data, onFormDataChange }) {
  const name = data?.name || "";
  const logo = data?.logo || null;

  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const { showNotification } = useNotification();

  const handleInputChange = useInputChangeHandler(null, data, onFormDataChange);
  const handleLogoChange = useLogoChangeHandler(null, data, onFormDataChange);
  const handleSelectorChange = useSelectorChangeHandler(
    null,
    data,
    onFormDataChange
  );

  const removeAppliedDebrisType = (debrisType) => {
    const updatedDebrisTypes = (data?.debris_type || []).filter(
      (i) => i !== debrisType
    );
    onFormDataChange({ debris_type: updatedDebrisTypes });
  };

  const removeAppliedType = (serviceType) => {
    const updatedTypes = (data?.type || []).filter((i) => i !== serviceType);
    onFormDataChange({ type: updatedTypes });
  };

  const removeAppliedDumpsterSize = (size) => {
    const updatedSizes = (data?.dumpster_size || []).filter((i) => i !== size);
    onFormDataChange({ dumpster_size: updatedSizes });
  };

  const removeAppliedProjectSize = (size) => {
    const updatedSizes = (data?.project_size || []).filter((i) => i !== size);
    onFormDataChange({ project_size: updatedSizes });
  };

  const removeAppliedDuration = (dur) => {
    const updatedDurations = (data?.duration || []).filter((i) => i !== dur);
    onFormDataChange({ duration: updatedDurations });
  };

  const handleSaveForLater = async () => {
    setSaving(true);
    try {
      const response = await ListingApi.editCompanyInfo(data);
      if (!response.error) {
        showNotification("success", response.success_message);
      } else {
        showNotification("error", response.error);
      }
    } catch (error) {
      showNotification("error", error.message);
    } finally {
      setSaving(false);
    }
  };

  const handlePublish = async () => {
    setPublishing(true);
    try {
      // First save the data without notification
      const saveResponse = await ListingApi.editCompanyInfo(data);
      if (saveResponse.error) {
        showNotification("error", saveResponse.error);
        return;
      }

      // Then publish
      const publishResponse = await ListingApi.publishCompany();
      if (!publishResponse.error) {
        showNotification(
          "success",
          publishResponse.success_message || "Company published successfully!"
        );
      } else {
        showNotification("error", publishResponse.error);
      }
    } catch (error) {
      showNotification("error", error.message);
    } finally {
      setPublishing(false);
    }
  };

  return (
    <>
      <section className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h1 className="title-m">Claim your business</h1>
          <div className="w-36 max-md:hidden">
            <Button
              variant="secondary"
              size="m"
              onClick={handleSaveForLater}
              loading={saving}
              fullWidth
            >
              Save for later
            </Button>
          </div>
        </div>
        <p> Share the core information about your company</p>
      </section>
      <div className="divider" />
      <div className="flex flex-col gap-8 items-start">
        <ProfileLogo name={name} size="l" src={logo || null} placeholder="🖼" />
        <LogoUploader
          onLogoChange={handleLogoChange}
          apiName="CompanyLogo"
          text="Upload company logo"
        />
      </div>
      <ListingFields
        data={data}
        handleInputChange={handleInputChange}
        handleSelectorChange={handleSelectorChange}
        removeAppliedType={removeAppliedType}
        removeAppliedDumpsterSize={removeAppliedDumpsterSize}
        removeAppliedProjectSize={removeAppliedProjectSize}
        removeAppliedDebrisType={removeAppliedDebrisType}
        removeAppliedDuration={removeAppliedDuration}
      />
      <div className="flex justify-end">
        <Button
          variant="primary"
          size="m"
          onClick={handlePublish}
          loading={publishing}
          fullWidth
        >
          Publish
        </Button>
      </div>
    </>
  );
}
