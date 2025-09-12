import { useCallback } from "react";

// Generic input change handler
export function useInputChangeHandler(onFormDataChange) {
  return useCallback(
    (e) => {
      const { name, value } = e.target;
      onFormDataChange({ [name]: value });
    },
    [onFormDataChange]
  );
}

// Generic logo change handler
export function useLogoChangeHandler(onFormDataChange) {
  return useCallback(
    (logoUrl) => {
      onFormDataChange({ logo: logoUrl });
    },
    [onFormDataChange]
  );
}

// Generic selector change handler
export function useSelectorChangeHandler(onFormDataChange) {
  return useCallback(
    (name, value) => {
      onFormDataChange({ [name]: value });
    },
    [onFormDataChange]
  );
}

// Zipcode change handler
export function useZipCodeChangeHandler() {
  return useCallback(
    (
      zipCodeInput,
      zip_codes,
      handleSelectorChange,
      setZipCodeInput,
      zip_code_limit
    ) => {
      return (e) => {
        if ((e.key === " " || e.keyCode === 32) && zipCodeInput.trim()) {
          e.preventDefault();
          const newZipCode = zipCodeInput.trim();
          if (
            !zip_codes.includes(newZipCode) &&
            zip_codes.length < zip_code_limit
          ) {
            handleSelectorChange("zip_codes", [...zip_codes, newZipCode]);
          }
          setZipCodeInput("");
        }
      };
    },
    []
  );
}

// Remove zipcode handler
export function useRemoveZipCodeHandler() {
  return useCallback((handleSelectorChange) => {
    return (zipCode, zip_codes) => {
      const updatedZipCodes = zip_codes.filter((code) => code !== zipCode);
      handleSelectorChange("zip_codes", updatedZipCodes);
    };
  }, []);
}
