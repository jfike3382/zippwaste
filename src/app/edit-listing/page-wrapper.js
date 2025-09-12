"use client";
import { useState, useEffect, useCallback } from "react";
import GlobalLoader from "@/components/global-elements/global-loader";
import { GetStartupInfo } from "@/api/actions-client";

import MainInfo from "./content/main-info";
import ContactInfo from "./content/contact-info";
import Submission from "./content/submission";

export default function PageWrapper() {
  const [activeSection, setActiveSection] = useState("Main info");
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);

  const sectionComponents = {
    "Main info": MainInfo,
    "Contact info": ContactInfo,
    Submission: Submission,
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await GetStartupInfo();
      if (!response.error) {
        const info = {
          ...response.data,
          logo: response.data?.logo?.url || null,
          contact_logo: response.data?.contact_info?.logo?.url || null,
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

  const handleSectionChange = useCallback((section, getDataToSave) => {
    setFormData((prev) => {
      if (typeof getDataToSave === "function") {
        return { ...prev, ...getDataToSave() };
      }
      return prev;
    });
    setActiveSection(section);
  }, []);

  const renderActiveSection = () => {
    const Component = sectionComponents[activeSection] || MainInfo;
    return (
      <Component
        onSectionChange={handleSectionChange}
        data={formData}
        onFormDataChange={handleFormDataChange}
      />
    );
  };

  return (
    <>
      <section className="main-container" key={activeSection}>
        <GlobalLoader show={loading} />
        {!loading && (
          <div className="main-container-data-block">
            {renderActiveSection()}
          </div>
        )}
      </section>
    </>
  );
}
