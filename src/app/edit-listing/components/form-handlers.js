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

export function useGetDataToSave(sectionKey, fields, data, options = {}) {
  // options: { logoField, logoTransform, sectionFillKey, customTransform, customValidation }
  return useCallback(() => {
    let sectionData = sectionKey ? data : { ...data };
    // If sectionKey, wrap data
    if (sectionKey) {
      sectionData = { ...data };
    }
    // Handle logo transformation if needed
    if (options.logoField && options.logoTransform) {
      sectionData[options.logoField] = options.logoTransform(
        sectionData[options.logoField]
      );
    }

    // Apply custom transformation if provided
    if (options.customTransform) {
      sectionData = options.customTransform({
        [sectionKey || "data"]: sectionData,
      });
    }

    // Use custom validation if provided, otherwise default validation
    let filled;
    if (options.customValidation) {
      filled = options.customValidation();
    } else {
      // Check if all required fields are filled (non-empty string or non-null)
      filled = fields.every(
        (field) =>
          sectionData[field] !== undefined &&
          sectionData[field] !== null &&
          (typeof sectionData[field] === "string"
            ? sectionData[field].trim() !== ""
            : sectionData[field] !== "")
      );
    }

    // Compose result
    if (sectionKey && !options.customTransform) {
      return {
        [sectionKey]: sectionData,
        [options.sectionFillKey || `section_${options.sectionStep}_fill`]:
          filled,
      };
    } else {
      return {
        ...sectionData,
        [options.sectionFillKey || `section_${options.sectionStep}_fill`]:
          filled,
      };
    }
  }, [sectionKey, fields, data, options]);
}
