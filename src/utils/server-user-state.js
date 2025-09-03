import { cookies } from "next/headers";

export async function UserState() {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("auth_token")?.value;
  const pricingPlan = cookieStore.get("user_pricing_package")?.value;
  const userCompany = cookieStore.get("user_startup")?.value;

  return {
    isVisitor: !authToken,
    isUser: authToken && pricingPlan === "Free",
    isCustomer: authToken && pricingPlan !== "Free",
    isCompanyPage: userCompany,
  };
}
