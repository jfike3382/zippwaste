import Input from "@/uikit/input";
import Selector from "@/uikit/selector";
import LogoUploader from "@/utils/logo-uploader";
import ProfileLogo from "@/uikit/profile-logo";

import {
  useInputChangeHandler,
  useSelectorChangeHandler,
  useLogoChangeHandler,
  useGetDataToSave,
} from "../components/form-handlers";

export default function Section({ onSectionChange, data, onFormDataChange }) {
  const channels = [
    { label: "Email", value: "email" },
    { label: "Linkedin", value: "linkedin" },
    { label: "X (Twitter)", value: "x" },
    { label: "Calendly", value: "calendly" },
  ];

  const contact_info = {
    ...data?.contact_info,
    best_way_reach_out_type:
      data?.contact_info?.best_way_reach_out_type || "email",
  };
  const contact_info_logo = contact_info.logo?.url || null;
  const contact_info_name = contact_info.name || "";
  const contact_info_title = contact_info.title || "";
  const contact_info_best_way_reach_out_type =
    contact_info.best_way_reach_out_type;
  const contact_info_best_way_reach_out_link =
    contact_info.best_way_reach_out_link || "";

  const handleInputChange = useInputChangeHandler(
    "contact_info",
    contact_info,
    onFormDataChange
  );
  const handleSelectorChange = useSelectorChangeHandler(
    "contact_info",
    contact_info,
    onFormDataChange
  );
  const handleLogoChange = useLogoChangeHandler(
    "contact_info",
    contact_info,
    onFormDataChange
  );

  const getDataToSave = useGetDataToSave(
    "contact_info",
    ["name", "title", "best_way_reach_out_type", "best_way_reach_out_link"],
    contact_info,
    { sectionFillKey: "section_3_fill", sectionStep: 3 }
  );

  const bestContactPlaceholders = {
    email: "Enter your email address",
    linkedin: "Enter your Linkedin URL",
    x: "Enter your X URL",
    calendly: "Enter your Calendly URL",
  };
  const bestContactPlaceholder =
    bestContactPlaceholders[contact_info_best_way_reach_out_type] ||
    "Enter email, profile link, or username";

  return (
    <>
      <h1 className="title-l">Contact info</h1>
      <div className="flex flex-col gap-8 items-start">
        <ProfileLogo
          name={contact_info_name}
          size="xl"
          src={contact_info_logo || null}
          placeholder="👱‍♂️"
        />
        <LogoUploader
          onLogoChange={handleLogoChange}
          apiName="ContactLogo"
          text="Upload photo"
        />
      </div>
      <div className="flex flex-col gap-8">
        <Input
          type="text"
          name="contact_info_name"
          label="Name"
          value={contact_info_name}
          onChange={handleInputChange}
          placeholder="Primary contact’s name"
        />
        <Input
          type="text"
          name="title"
          label="Title"
          value={contact_info_title}
          onChange={handleInputChange}
          placeholder="e.g. Founder & CEO"
        />
        <div className="flex flex-row gap-4 items-end">
          <div className="flex-1">
            <Input
              type="text"
              name="contact_info_best_way_reach_out_link"
              label="Best way to reach out"
              value={contact_info_best_way_reach_out_link}
              onChange={handleInputChange}
              placeholder={bestContactPlaceholder}
            />
          </div>
          <div className="min-w-40 max-md:min-w-30">
            <Selector
              name="contact_info_best_way_reach_out_type"
              label=""
              value={contact_info_best_way_reach_out_type}
              onChange={(value) => {
                const selected = channels.find(
                  (c) => c.label === value || c.value === value
                );
                handleSelectorChange(
                  "contact_info_best_way_reach_out_type",
                  selected ? selected.value : value
                );
              }}
              options={channels}
              placeholder="Type"
              required
            />
          </div>
        </div>
      </div>
    </>
  );
}
