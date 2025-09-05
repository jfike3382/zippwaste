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
  const [compayPage, setcompayPage] = useState(null);
  const [pricingPlan, setPricingPlan] = useState(
    getCookie("user_pricing_package")
  );
  const [isRefreshed, setIsRefreshed] = useState(false);

  const updateUserState = () => {
    const authToken = getCookie("auth_token");
    const pricingPlanCookie = getCookie("user_pricing_package");
    const compayPageCookie = getCookie("user_company");

    setPricingPlan(pricingPlanCookie);
    setIsVisitor(!authToken);
    setIsUser(authToken && pricingPlanCookie === "Starter");
    setIsCustomer(authToken && pricingPlanCookie !== "Starter");
    setcompayPage(compayPageCookie ? JSON.parse(compayPageCookie) : null);
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
        if (response.user.company) {
          setCookie("user_company", JSON.stringify(response.user.company));
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
        compayPage,
        pricingPlan,
        isRefreshed,
      }}
    >
      {children}
    </UserStateContext.Provider>
  );
};
