import { useCallback } from "react";

// Generic input change handler
export function useInputChangeHandler(
  sectionKey,
  sectionData,
  onFormDataChange
) {
  return useCallback(
    (e) => {
      const { name, value } = e.target;
      if (sectionKey) {
        onFormDataChange({
          [sectionKey]: {
            ...sectionData,
            [name.replace(`${sectionKey}_`, "")]: value,
          },
        });
      } else {
        onFormDataChange({
          ...sectionData,
          [name]: value,
        });
      }
    },
    [onFormDataChange, sectionData, sectionKey]
  );
}

// Generic logo change handler
export function useLogoChangeHandler(
  sectionKey,
  sectionData,
  onFormDataChange
) {
  return useCallback(
    (logoUrl) => {
      if (sectionKey) {
        onFormDataChange({
          [sectionKey]: {
            ...sectionData,
            logo: { url: logoUrl },
          },
        });
      } else {
        onFormDataChange({
          ...sectionData,
          logo: logoUrl,
        });
      }
    },
    [onFormDataChange, sectionData, sectionKey]
  );
}

// Generic selector change handler
export function useSelectorChangeHandler(
  sectionKey,
  sectionData,
  onFormDataChange
) {
  return useCallback(
    (name, value) => {
      if (sectionKey) {
        onFormDataChange({
          [sectionKey]: {
            ...sectionData,
            [name.replace(`${sectionKey}_`, "")]: value,
          },
        });
      } else {
        onFormDataChange({
          ...sectionData,
          [name]: value,
        });
      }
    },
    [onFormDataChange, sectionData, sectionKey]
  );
}
