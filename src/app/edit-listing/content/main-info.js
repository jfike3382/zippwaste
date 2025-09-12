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
  const industries = data?.industries || [];
  const stage = data?.stage || "";
  const company_size = data?.company_size || "";
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
    [
      "name",
      "logo",
      "tagline",
      "description",
      "industries",
      "stage",
      "company_size",
      "website",
    ],
    data,
    { sectionFillKey: "section_1_fill", sectionStep: 1 }
  );

  const removeAppliedIndustry = (industry) => {
    const updatedIndustries = industries.filter((i) => i !== industry);
    onFormDataChange({ industries: updatedIndustries });
  };

  const industriesOptions = filtersData.industries.map(
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
            name="industries"
            label="Industries"
            value={industries}
            onChange={(value) => handleSelectorChange("industries", value)}
            options={industriesOptions}
            placeholder="Select your main industries"
            required
            multiSelect={true}
            maxSelections={3}
          />
          {/* Applied Industries Tags */}
          <div className="flex flex-row gap-3 flex-wrap ">
            {industries.map((industry, idx) => (
              <div className="tag white icon-right" key={idx}>
                {industry}
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
                  onClick={() => removeAppliedIndustry(industry)}
                />
              </div>
            ))}
          </div>
        </div>
        <Selector
          name="stage"
          label="Current stage"
          value={stage}
          onChange={(value) => handleSelectorChange("stage", value)}
          options={[
            "Idea stage",
            "MVP",
            "First customers",
            "Early revenue",
            "PMF / Growth stage",
          ]}
          placeholder="Select your current stage"
          required
        />
        <Selector
          name="company_size"
          label="Company size"
          value={company_size}
          onChange={(value) => handleSelectorChange("company_size", value)}
          options={["1-10", "11-50", "51-100", "101-500", "501-1000", "1,000+"]}
          placeholder="Select your company size"
          required
        />
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
