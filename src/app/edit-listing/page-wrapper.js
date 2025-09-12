"use client";
import { useState, useEffect, useCallback } from "react";
import GlobalLoader from "@/components/global-elements/global-loader";
import { ListingApi } from "@/api/actions-client";

import ListingForm from "./listing-form";

export default function PageWrapper() {
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await ListingApi.getCompanyInfo();
      if (!response.error) {
        const info = {
          ...response.data,
          logo: response.data?.logo?.url || null,
          zip_codes_limit: response.zip_codes_limit || 5,
        };
        setFormData(info);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleFormDataChange = useCallback((changedFields) => {
    setFormData((prev) => ({ ...prev, ...changedFields }));
  }, []);

  return (
    <>
      <GlobalLoader show={loading} />
      <div className="min-h-screen">
        {!loading && (
          <div className="main-data-container">
            <div className="card-container flex flex-col gap-8 p-8 max-md:px-4">
              <ListingForm
                data={formData}
                onFormDataChange={handleFormDataChange}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
