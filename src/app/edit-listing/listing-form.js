import Input from "@/uikit/input";
import Button from "@/uikit/button";

import LogoUploader from "@/utils/logo-uploader";
import ProfileLogo from "@/uikit/profile-logo";
import Selector from "@/uikit/selector";
import filtersData from "@/data/filters.json";
import Image from "next/image";
import { useState } from "react";
import { ListingApi } from "@/api/actions-client";
import { useNotification } from "@/providers/notifications";
import {
  useInputChangeHandler,
  useLogoChangeHandler,
  useSelectorChangeHandler,
} from "./form-handlers";

export default function Section({ onSectionChange, data, onFormDataChange }) {
  const name = data?.name || "";
  const logo = data?.logo || null;
  const description = data?.description || "";
  const address = data?.address || "";
  const city = data?.city || "";
  const state = data?.state || "";
  const debris_type = data?.debris_type || [];
  const website = data?.website || "";
  const x_account = data?.x_account || "";

  const [saving, setSaving] = useState(false);
  const { showNotification } = useNotification();

  const handleInputChange = useInputChangeHandler(null, data, onFormDataChange);
  const handleLogoChange = useLogoChangeHandler(null, data, onFormDataChange);
  const handleSelectorChange = useSelectorChangeHandler(
    null,
    data,
    onFormDataChange
  );

  const removeAppliedDebrisType = (debrisType) => {
    const updatedDebrisTypes = debris_type.filter((i) => i !== debrisType);
    onFormDataChange({ debris_type: updatedDebrisTypes });
  };

  const debrisTypeOptions = filtersData.debris_type.map(
    (industry) => industry.name
  );

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

  return (
    <>
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="title-m">Claim your business</h1>
          <div className="w-36">
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
        <p className="paragraph-l">
          {" "}
          Share the core information about your company
        </p>
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
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <Input
            name="name"
            label="Company name"
            value={name}
            onChange={handleInputChange}
            placeholder="Enter your company name"
            required
          />
        </div>
        <Input
          type="textarea"
          name="description"
          label="Description"
          value={description}
          onChange={handleInputChange}
          placeholder="What's your company about?"
          required
        />
        <Input
          name="address"
          label="Full address"
          value={address}
          onChange={handleInputChange}
          placeholder="Enter your full address"
          required
        />
        <Input
          name="city"
          label="City"
          value={city}
          onChange={handleInputChange}
          placeholder="Enter your city"
          required
        />
        <Input
          name="state"
          label="State"
          value={state}
          onChange={handleInputChange}
          placeholder="Enter your state"
          required
        />
        <div className="flex flex-col gap-4">
          <Selector
            name="debris_type"
            label="Debris Type"
            value={debris_type}
            onChange={(value) => handleSelectorChange("debris_type", value)}
            options={debrisTypeOptions}
            placeholder="Select your debris types"
            required
            multiSelect={true}
            maxSelections={3}
          />
          {/* Applied Debris Types Tags */}
          <div className="flex flex-row gap-3 flex-wrap ">
            {debris_type.map((debrisType, idx) => (
              <div className="tag white icon-right" key={idx}>
                {debrisType}
                <span
                  className="inline-block h-full border-l border-[#222] ml-1"
                  aria-hidden="true"
                />
                <Image
                  src="/assets/icons/cancel.svg"
                  alt="Remove"
                  width={20}
                  height={20}
                  className="cursor-pointer"
                  onClick={() => removeAppliedDebrisType(debrisType)}
                />
              </div>
            ))}
          </div>
        </div>
        <Input
          name="website"
          label="Website"
          value={website}
          onChange={handleInputChange}
          placeholder="Company URL"
        />
        <Input
          name="x_account"
          label="X account"
          value={x_account}
          onChange={handleInputChange}
          placeholder="X account"
          optional
        />
      </div>
    </>
  );
}
