"use client";
import Link from "next/link";
import Button from "@/uikit/button";
import { useUserState } from "@/providers/user-state-provider";
import GlobalLoader from "@/components/global-elements/global-loader";

export default function PageWrapper() {
  const { pricingPlan, isRefreshed } = useUserState();

  return (
    <>
      <GlobalLoader show={!isRefreshed} />
      {isRefreshed && (
        <section className="py-32 px-5 max-md:py-10 flex flex-col gap-12 items-center justify-center">
          <p className="title-xl">🎉</p>
          <div className="flex flex-col gap-4 items-center text-center">
            <h1 className="title-l">You’ve been upgraded to {pricingPlan} </h1>
            <p className="paragraph-l text-secondary max-w-2xl ">
              Now you have access to all features available for {pricingPlan}{" "}
              listing plan.
            </p>
          </div>
          <Link href="/">
            <Button variant="black" size="l">
              Go to main page
            </Button>
          </Link>
        </section>
      )}
    </>
  );
}
