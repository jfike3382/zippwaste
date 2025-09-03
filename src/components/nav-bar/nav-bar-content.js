import Link from "next/link";

import Button from "@/uikit/button";
import UserMenu from "./user-menu";
import { useUserState } from "@/providers/user-state-provider";
import { useModal } from "@/providers/auth-modal";

export function ContentRight() {
  const { isVisitor, companyPage } = useUserState();
  const { openRegisterModal } = useModal();

  return isVisitor ? (
    <div className="flex flex-row">
      <Button variant="transparent" size="m" href="/pricing">
        Pricing
      </Button>
      <Button
        variant="primary"
        size="m"
        onClick={() => {
          openRegisterModal();
        }}
      >
        Claim listing
      </Button>
    </div>
  ) : (
    <div className="flex flex-row gap-4 items-center">
      {!companyPage && (
        <Button variant="primary" size="m" href="/edit-listing">
          Claim listing
        </Button>
      )}

      <UserMenu />
    </div>
  );
}

export function ContentMobile({ onClose }) {
  const { isVisitor, companyPage } = useUserState();
  const { openRegisterModal } = useModal();

  return (
    <div className="flex flex-col gap-6 mt-4 items-start w-full">
      <div className="flex flex-col gap-5 w-full">
        <Link
          href="/blog"
          onClick={onClose}
          className=" text-3xl font-medium w-full"
        >
          Blog
        </Link>
      </div>
      <div className="divider" />
      {isVisitor ? (
        <div className="flex flex-col gap-4 w-full">
          <Button variant="secondary" fullWidth size="m" href="/pricing">
            Pricing
          </Button>
          <Button
            variant="primary"
            fullWidth
            size="m"
            onClick={() => {
              openRegisterModal();
            }}
          >
            Claim listing
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-4 w-full">
          <UserMenu onClose={onClose} variant="extended" />
          {!companyPage && (
            <Button
              variant="primary"
              size="m"
              fullWidth
              href="/edit-listing"
              onClick={onClose}
            >
              Claim listing
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
