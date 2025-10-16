"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

import Button from "@/uikit/button";

import Switcher from "@/uikit/switcher";
import MenuItem from "@/uikit/menu-item";
import { getIndustryData } from "@/utils/lists-data";

export default function ExploreVC() {
  const [selectedStage, setSelectedStage] = useState("Pre-seed");

  const stageOptions = [
    { value: "Pre-seed", label: "Pre-seed" },
    { value: "Seed", label: "Seed" },
    { value: "Series A", label: "Series A" },
    { value: "Series B", label: "Series B" },
  ];

  const industryData = useMemo(
    () => getIndustryData(selectedStage),
    [selectedStage]
  );

  return (
    <section className="main-landing-section">
      <div className="landing-container max-w-[62.5rem]">
        <h2 className="title-l"> Explore 149,314 investors</h2>
        <Switcher
          options={stageOptions}
          value={selectedStage}
          onChange={setSelectedStage}
        />
        <div className="grid grid-cols-4 gap-y-2 gap-x-8 w-full max-lg:grid-cols-2 max-md:grid-cols-1">
          {industryData.map((industry, index) => (
            <Link key={index} href={`/investors?pre-selected=${industry.slug}`}>
              <MenuItem
                label={
                  industry.industry === "All"
                    ? `All ${selectedStage}`
                    : industry.industry
                }
                icon={industry.icon}
                lineClamp={true}
                count={industry.count_investors}
              />
            </Link>
          ))}
        </div>
        <div className="flex flex-col gap-8">
          <Button
            href="/investors"
            hrefType="internal"
            variant="black"
            size="l"
          >
            Show all investors
          </Button>
        </div>
      </div>
    </section>
  );
}
