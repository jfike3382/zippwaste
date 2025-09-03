"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { getCookie, setCookie } from "@/utils/cookies";
import { AuthApi } from "@/api/auth-client";

const UserStateContext = createContext();

export const useUserState = () => useContext(UserStateContext);
export const UserStateProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isVisitor, setIsVisitor] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [isCustomer, setIsCustomer] = useState(false);
  const [startupPage, setStartupPage] = useState(null);
  const [pricingPlan, setPricingPlan] = useState(
    getCookie("user_pricing_package")
  );
  const [isRefreshed, setIsRefreshed] = useState(false);

  const updateUserState = () => {
    const authToken = getCookie("auth_token");
    const pricingPlanCookie = getCookie("user_pricing_package");
    const startupPageCookie = getCookie("user_startup");

    setPricingPlan(pricingPlanCookie);
    setIsVisitor(!authToken);
    setIsUser(authToken && pricingPlanCookie === "Starter");
    setIsCustomer(authToken && pricingPlanCookie !== "Starter");
    setStartupPage(startupPageCookie ? JSON.parse(startupPageCookie) : null);
  };

  useEffect(() => {
    updateUserState();
    setIsLoading(false);

    if (!getCookie("auth_token")) {
      return;
    }

    const authMe = async () => {
      const response = await AuthApi.getMe();
      if (!response.error && response.user) {
        const oldPricingPlan = getCookie("user_pricing_package");

        setCookie("user_pricing_package", response.user.pricing_package);
        setPricingPlan(response.user.pricing_package);
        setCookie("user_export_credits", response.user.export_credits);
        setCookie("user_ai_credits", response.user.ai_credits);
        if (response.user.startup) {
          setCookie("user_startup", JSON.stringify(response.user.startup));
        }

        if (oldPricingPlan !== response.user.pricing_package) {
          updateUserState();
        }
      }
      setIsRefreshed(true);
    };

    authMe();
  }, []);

  if (isLoading) return null;

  return (
    <UserStateContext.Provider
      value={{
        isVisitor,
        isUser,
        isCustomer,
        startupPage,
        pricingPlan,
        isRefreshed,
      }}
    >
      {children}
    </UserStateContext.Provider>
  );
};
