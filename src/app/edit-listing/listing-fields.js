import Input from "@/uikit/input";
import Button from "@/uikit/button";
import Selector from "@/uikit/selector";
import Cancel from "@/uikit/icons/cancel";
import filtersData from "@/data/filters.json";
import { useState } from "react";
import {
  useZipCodeChangeHandler,
  useRemoveZipCodeHandler,
} from "./form-handlers";

export default function ListingFields({
  data,
  handleInputChange,
  handleSelectorChange,
  removeAppliedType,
  removeAppliedDumpsterSize,
  removeAppliedProjectSize,
  removeAppliedDebrisType,
  removeAppliedDuration,
}) {
  const name = data?.name || "";
  const description = data?.description || "";
  const address = data?.address || "";
  const city = data?.city || "";
  const state = data?.state || "";
  const type = data?.type || [];
  const dumpster_size = data?.dumpster_size || [];
  const project_size = data?.project_size || [];
  const debris_type = data?.debris_type || [];
  const duration = data?.duration || [];
  const website = data?.website || "";
  const phone = data?.phone || "";
  const email = data?.email || "";
  const zip_codes = data?.zip_codes || [];

  const [zipCodeInput, setZipCodeInput] = useState("");

  const handleZipCodeKeyDown = useZipCodeChangeHandler();
  const removeZipCode = useRemoveZipCodeHandler();

  const handleZipCodeKeyDownEvent = handleZipCodeKeyDown(
    zipCodeInput,
    zip_codes,
    handleSelectorChange,
    setZipCodeInput,
    data?.zip_codes_limit
  );
  const removeZipCodeHandler = removeZipCode(handleSelectorChange);

  const stateOptions = filtersData.us_state.map((state) => state.name);
  const typeOptions = filtersData.type.map((type) => type.name);
  const dumpsterSizeOptions = filtersData.dumpster_size.map(
    (size) => size.name
  );
  const projectSizeOptions = filtersData.project_size.map((size) => size.name);
  const debrisTypeOptions = filtersData.debris_type.map((type) => type.name);
  const durationOptions = filtersData.duration.map((duration) => duration.name);

  return (
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
        name="city"
        label="City"
        value={city}
        onChange={handleInputChange}
        placeholder="Enter your city"
        required
      />
      <Selector
        name="state"
        label="State"
        value={state}
        onChange={(value) => handleSelectorChange("state", value)}
        options={stateOptions}
        placeholder="Select your state"
        required
        multiSelect={false}
      />
      <Input
        name="address"
        label="Full address"
        value={address}
        onChange={handleInputChange}
        placeholder="Enter your full address"
        required
      />
      <div className="flex flex-col gap-4">
        <Input
          name="zip_codes"
          label="Zip codes"
          value={zipCodeInput}
          onChange={(e) => setZipCodeInput(e.target.value)}
          onKeyDown={handleZipCodeKeyDownEvent}
          placeholder="Enter zip codes (press space to add)"
          type="number"
          max={data?.zip_codes_limit}
          maxUsed={zip_codes.length}
        />
        <div className="flex flex-row gap-3 flex-wrap">
          {zip_codes.map((zipCode, idx) => (
            <div className="tag white icon-right" key={idx}>
              {zipCode}
              <span
                className="inline-block h-full border-l border-[#222] ml-1"
                aria-hidden="true"
              />
              <Cancel
                size={20}
                className="cursor-pointer"
                onClick={() => removeZipCodeHandler(zipCode, zip_codes)}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="divider" />
      <div className="flex flex-col gap-4">
        <Selector
          name="type"
          label="Service type"
          value={type}
          onChange={(value) => handleSelectorChange("type", value)}
          options={typeOptions}
          placeholder="Select service types"
          required
          multiSelect={true}
        />
        <div className="flex flex-row gap-3 flex-wrap">
          {type.map((serviceType, idx) => (
            <div className="tag white icon-right" key={idx}>
              {serviceType}
              <span
                className="inline-block h-full border-l border-[#222] ml-1"
                aria-hidden="true"
              />
              <Cancel
                size={20}
                className="cursor-pointer"
                onClick={() => removeAppliedType(serviceType)}
              />
            </div>
          ))}
        </div>
      </div>
      {type.includes("Dumpster rental") && (
        <div className="flex flex-col gap-4">
          <Selector
            name="dumpster_size"
            label="Dumpster size"
            value={dumpster_size}
            onChange={(value) => handleSelectorChange("dumpster_size", value)}
            options={dumpsterSizeOptions}
            placeholder="Select dumpster sizes"
            multiSelect={true}
          />
          <div className="flex flex-row gap-3 flex-wrap">
            {dumpster_size.map((size, idx) => (
              <div className="tag white icon-right" key={idx}>
                {size}
                <span
                  className="inline-block h-full border-l border-[#222] ml-1"
                  aria-hidden="true"
                />
                <Cancel
                  size={20}
                  className="cursor-pointer"
                  onClick={() => removeAppliedDumpsterSize(size)}
                />
              </div>
            ))}
          </div>
        </div>
      )}
      {type.includes("Junk removal") && (
        <div className="flex flex-col gap-4">
          <Selector
            name="project_size"
            label="Project size"
            value={project_size}
            onChange={(value) => handleSelectorChange("project_size", value)}
            options={projectSizeOptions}
            placeholder="Select project sizes"
            multiSelect={true}
          />
          <div className="flex flex-row gap-3 flex-wrap">
            {project_size.map((size, idx) => (
              <div className="tag white icon-right" key={idx}>
                {size}
                <span
                  className="inline-block h-full border-l border-[#222] ml-1"
                  aria-hidden="true"
                />
                <Cancel
                  size={20}
                  className="cursor-pointer"
                  onClick={() => removeAppliedProjectSize(size)}
                />
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="flex flex-col gap-4">
        <Selector
          name="debris_type"
          label="Debris type"
          value={debris_type}
          onChange={(value) => handleSelectorChange("debris_type", value)}
          options={debrisTypeOptions}
          placeholder="Select debris types"
          multiSelect={true}
        />
        <div className="flex flex-row gap-3 flex-wrap">
          {debris_type.map((type, idx) => (
            <div className="tag white icon-right" key={idx}>
              {type}
              <span
                className="inline-block h-full border-l border-[#222] ml-1"
                aria-hidden="true"
              />
              <Cancel
                size={20}
                className="cursor-pointer"
                onClick={() => removeAppliedDebrisType(type)}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <Selector
          name="duration"
          label="Duration"
          value={duration}
          onChange={(value) => handleSelectorChange("duration", value)}
          options={durationOptions}
          placeholder="Select duration options"
          multiSelect={true}
        />
        <div className="flex flex-row gap-3 flex-wrap">
          {duration.map((dur, idx) => (
            <div className="tag white icon-right" key={idx}>
              {dur}
              <span
                className="inline-block h-full border-l border-[#222] ml-1"
                aria-hidden="true"
              />
              <Cancel
                size={20}
                className="cursor-pointer"
                onClick={() => removeAppliedDuration(dur)}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="divider" />
      <Input
        name="website"
        label="Website"
        value={website}
        onChange={handleInputChange}
        placeholder="Company URL"
      />
      <Input
        name="phone"
        label="Phone"
        value={phone}
        onChange={handleInputChange}
        placeholder="Phone number"
        required
      />
      <Input
        name="email"
        label="Email address"
        value={email}
        onChange={handleInputChange}
        placeholder="Email address"
        required
      />
    </div>
  );
}
