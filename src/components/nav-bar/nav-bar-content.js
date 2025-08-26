"use client"
import Link from "next/link";

import Button from "@/components/uikit/button";
import UserMenu from "./user-menu";
import { useUserState } from "@/providers/user-state-provider";
import { useModal } from "@/providers/auth-modal";

export async function ContentRight() {
  const { isVisitor, isCustomer, companyPage } = useUserState();
  const { openRegisterModal, openLoginModal } = useModal();

  return isVisitor ? (
    <div className="flex flex-row">
      <Button
        variant="transparent"
        size="m"
        onClick={() => {
          openLoginModal();
        }}
      >
        Sign in
      </Button>
      <Button
        variant="black"
        size="m"
        onClick={() => {
          openRegisterModal();
        }}
      >
        Create account
      </Button>
    </div>
  ) : (
    <div className="flex flex-row gap-4 items-center">
      {isCustomer && (
        <div className="bg-brand-gray-200  text-base py-2 px-4 h-10 font-semibold rounded-4xl">
          <p className="violet-gradient-text">Pro</p>
        </div>
      )}
      {!isCompanyPage && (
        <Button variant="black" size="m" href="/edit-startup">
          Publish startup
        </Button>
      )}

      <UserMenu />
    </div>
  );
}

export async function ContentMobile({ onClose }) {
  const { isVisitor, isCustomer, isCompanyPage } = await UserState();
  const { openRegisterModal, openLoginModal } = useModal();

  return (
    <div className="flex flex-col gap-6 mt-4 items-start w-full">
      <div className="flex flex-col gap-5 w-full">
        <Link
          href="/investors"
          onClick={onClose}
          className="text-3xl font-medium w-full"
        >
          Investors
        </Link>
        <Link
          className="text-3xl font-medium flex flex-row w-full gap-4 items-center "
          href="/startups"
          onClick={onClose}
        >
          <p>Startups</p>
          <p className="bg-brand-blue-800 text-white rounded-sm px-1 geist-mono text-base font-semibold items-center justify-center flex">
            NEW
          </p>
        </Link>
        <Link
          href="/fundraising-guide"
          onClick={onClose}
          className="text-3xl font-medium w-full"
        >
          Guide
        </Link>
        <Link
          href="/pricing"
          onClick={onClose}
          className=" text-3xl font-medium w-full"
        >
          Pricing
        </Link>
      </div>
      <div className="divider" />
      {isVisitor ? (
        <div className="flex flex-col gap-4 w-full">
          <Button
            variant="secondary"
            fullWidth
            size="m"
            onClick={() => {
              openLoginModal();
            }}
          >
            Sign in
          </Button>
          <Button
            variant="black"
            fullWidth
            size="m"
            onClick={() => {
              openRegisterModal();
            }}
          >
            Claim your listing
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-4 w-full">
          <UserMenu onClose={onClose} variant="extended" />
          {!isCompanyPage && (
            <Button
              variant="black"
              size="m"
              fullWidth
              href="/edit-startup"
              onClick={onClose}
            >
              Submit startup
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
