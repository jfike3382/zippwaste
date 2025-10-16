"use client";

import Image from "next/image";
import Button from "@/uikit/button";
import { useModal } from "@/providers/auth-modal";

export default function PreFooter() {
  const { openRegisterModal } = useModal();

  return (
    <>
      <div className="gradient-divider" />
      <section className="section-container max-w-[38rem]">
        <div className="flex flex-row gap-6">
          <div className="tag white uppercase">
            <div className="pt-1">
              <Image
                src="/assets/images/zippwaste-logo.svg"
                alt="Zippwaste Logo"
                width="80"
                height="24"
              />
            </div>
          </div>
          <div className="divider vertical" />
          <div className="tag white uppercase">
            <div className="pt-1">
              <Image
                src="/assets/images/zippworks-logo.svg"
                alt="Zippworks Logo"
                width="80"
                height="24"
              />
            </div>
          </div>
        </div>
        <h2 className="title-l font-medium text-center ">
          We help over 7,000 companies to promote their waste removal business.
          Advertise with us!
        </h2>

        <Button variant="primary" size="l" onClick={openRegisterModal}>
          Get started
        </Button>
      </section>
    </>
  );
}
