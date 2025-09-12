import Input from "@/uikit/input";

import LogoUploader from "@/utils/logo-uploader";
import ProfileLogo from "@/uikit/profile-logo";
import Selector from "@/uikit/selector";
import filtersData from "@/data/filters.json";
import Image from "next/image";
import { useState } from "react";
import {
  useInputChangeHandler,
  useLogoChangeHandler,
  useSelectorChangeHandler,
  useGetDataToSave,
} from "../components/form-handlers";

export default function Section({ onSectionChange, data, onFormDataChange }) {
  const name = data?.name || "";
  const logo = data?.logo || null;
  const tagline = data?.tagline || "";
  const description = data?.description || "";
  const debris_type = data?.debris_type || [];
  const website = data?.website || "";
  const x_account = data?.x_account || "";

  const handleInputChange = useInputChangeHandler(null, data, onFormDataChange);
  const handleLogoChange = useLogoChangeHandler(null, data, onFormDataChange);
  const handleSelectorChange = useSelectorChangeHandler(
    null,
    data,
    onFormDataChange
  );

  const getDataToSave = useGetDataToSave(
    null,
    ["name", "logo", "tagline", "description", "debris_type", "website"],
    data,
    { sectionFillKey: "section_1_fill", sectionStep: 1 }
  );

  const removeAppliedDebrisType = (debrisType) => {
    const updatedDebrisTypes = debris_type.filter((i) => i !== debrisType);
    onFormDataChange({ debris_type: updatedDebrisTypes });
  };

  const debrisTypeOptions = filtersData.debris_type.map(
    (industry) => industry.name
  );

  const [taglineValue, setTaglineValue] = useState(tagline);

  const handleTaglineChange = (e) => {
    const value = e.target.value.slice(0, 100);
    setTaglineValue(value);
    handleInputChange({
      target: {
        name: "tagline",
        value,
      },
    });
  };

  return (
    <>
      <div className="flex flex-col gap-4 items-start">
        <h1 className="title-l">Main info</h1>
        <p className="paragraph-l">
          Share the core information about your project
        </p>
      </div>
      <div className="flex flex-col gap-8 items-start">
        <ProfileLogo name={name} size="xl" src={logo || null} placeholder="🖼" />
        <LogoUploader
          onLogoChange={handleLogoChange}
          apiName="StartupLogo"
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
        <div className="relative">
          <Input
            name="tagline"
            label="Tagline"
            value={taglineValue}
            onChange={handleTaglineChange}
            placeholder="Concise and descriptive tagline"
            required
          />
          <div className="absolute bg-white pl-2 right-3 mt-4.5 top-1/2 -translate-y-1/2 text-sm font-semibold text-right">
            {taglineValue.length}/100
          </div>
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
