"use client";
import { useState, useEffect, useCallback } from "react";
import GlobalLoader from "@/components/global-elements/global-loader";
import { ListingApi } from "@/api/actions-client";

import MainInfo from "./content/main-info";

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
      <section className="main-container">
        <GlobalLoader show={loading} />
        {!loading && (
          <div className="main-container-data-block">
            <MainInfo data={formData} onFormDataChange={handleFormDataChange} />
          </div>
        )}
      </section>
    </>
  );
}
