"use client";
import { useState, useEffect, useCallback } from "react";
import GlobalLoader from "@/components/global-elements/global-loader";
import { ListingApi } from "@/api/actions-client";

import MainInfo from "./main-info";

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
      <GlobalLoader show={loading} />
      <div className="min-h-screen">
          {!loading && (
            <div className="main-data-container">
              <div className="card-container flex flex-col gap-8 p-8 max-md:px-4">
                <section className="flex flex-col gap-4">
                  <h1 className="title-m">Claim your business</h1>
                  <p className="paragraph-l">
                    {" "}
                    Share the core information about your company
                  </p>
                </section>
                <div className="divider" />
                <MainInfo
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
