"use client";

import * as React from "react";
import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Button from "@/uikit/button";
import TableRow from "@/components/table/uikit/table-row";
import BubbleFilter from "@/components/filters/uikit/bubble-filter";
import { TableApi } from "@/api/data-client";
import filtersData from "@/data/filters.json";

function ExploreCompanies() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [serviceType, setServiceType] = useState("Dumpster rental");
  const router = useRouter();

  const fetchCompanies = async (type = "Dumpster rental") => {
    setLoading(true);
    try {
      const response = await TableApi.companies({ per_page: 6, type });
      const companiesData = response.main_data?.items || [];
      setCompanies(companiesData);
    } catch (error) {
      console.error("Failed to fetch companies:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies(serviceType);
  }, [serviceType]);

  const memoizedCompanies = useMemo(() => companies.slice(0, 6), [companies]);

  const handleTypeChange = (selectedType) => {
    setServiceType(selectedType);
  };

  const handleViewAll = () => {
    router.push("/companies");
  };

  return (
    <>
      <div className="gradient-divider" />
      <section className="section-container max-w-[70rem]">
        <h2 className="title-xl">Explore 15,500+ companies</h2>
        <BubbleFilter
          options={filtersData.type}
          selectedValue={serviceType}
          onChange={handleTypeChange}
        />

        <div
          className={`w-full grid grid-cols-2 max-xl:grid-cols-1 gap-6 transition-opacity duration-300 ${
            loading ? "opacity-50" : "opacity-100"
          }`}
        >
          {companies.length > 0
            ? memoizedCompanies.map((company) => (
                <TableRow key={company.slug} item={company} />
              ))
            : [...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="h-32 bg-gray-100 animate-pulse rounded-lg"
                />
              ))}
        </div>

        <div className="flex flex-col gap-8">
          <Button onClick={handleViewAll} variant="black" size="l">
            Explore all companies
          </Button>
        </div>
      </section>
    </>
  );
}

export default React.memo(ExploreCompanies);
