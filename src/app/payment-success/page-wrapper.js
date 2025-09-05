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
        <section className="py-32 px-5 max-md:py-10">
          <div className="flex flex-col gap-8 items-center text-center">
            <div className="tag white">
              <p className="violet-gradient-text uppercase tracking-widest">
                Raizer Pro
              </p>
            </div>
            <h1 className="title-l">You’ve been upgraded to {pricingPlan} </h1>
            <p className="paragraph-xl max-w-xl ">
              Now you can use more features available for {pricingPlan} users.
              If you have any questions, feel free to send us a message.
            </p>
            <Link href="/">
              <Button variant="black" size="l">
                Go to main page
              </Button>
            </Link>
          </div>
        </section>
      )}
    </>
  );
}
