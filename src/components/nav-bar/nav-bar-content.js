import Link from "next/link";

import Button from "@/uikit/button";
import Dropdown from "@/uikit/dropdown";
import UserMenu from "./user-menu";
import WebsiteIcon from "@/uikit/icons/website";
import LocationIcon from "@/uikit/icons/location";
import { useUserState } from "@/providers/user-state-provider";
import { useModal } from "@/providers/auth-modal";

export function ContentLeft() {
  const toggleContent = (
    <Button variant="transparent" size="m" icon="down" iconPosition="right">
      Products
    </Button>
  );

  return (
    <div className="flex items-center gap-2">
      <Dropdown
        toggleContent={toggleContent}
        dropdownSize="l"
        dropdownOrientation="bottom"
        horizontalPosition="left"
      >
        {(closeDropdown) => (
          <div className="flex flex-col gap-2">
            <Link
              className="dropdown-cell"
              href="/pricing"
              onClick={closeDropdown}
            >
              <div className="flex flex-row gap-3 items-center">
                <div className="size-11 flex items-center justify-center rounded-2xl bg-[#FFEA79]">
                  <LocationIcon size={24} />
                </div>
                <div className="flex flex-col">
                  <p className="text-sm font-medium">Business Listing</p>
                  <p className="text-sm text-secondary font-normal">
                    Get your business listed on Zippwaste
                  </p>
                </div>
              </div>
            </Link>

            <Link
              className="dropdown-cell"
              href="/zippworks-media"
              onClick={closeDropdown}
            >
              <div className="flex flex-row gap-3 items-center">
                <div className="size-11 flex items-center justify-center rounded-2xl bg-[#C7EDC6]">
                  <WebsiteIcon size={24} />
                </div>
                <div className="flex flex-col">
                  <p className="text-sm font-medium">Website Creation</p>
                  <p className="text-sm text-secondary font-normal">
                    Professional websites by Zippworks
                  </p>
                </div>
              </div>
            </Link>
          </div>
        )}
      </Dropdown>

      <Button variant="transparent" size="m" href="/blog">
        Blog
      </Button>

      <Button variant="transparent" size="m" href="/pricing">
        Pricing
      </Button>
    </div>
  );
}

export function ContentRight() {
  const { isVisitor, companyPage } = useUserState();
  const { openRegisterModal, openLoginModal } = useModal();

  const getButtonText = () => {
    if (companyPage && typeof companyPage === 'object' && companyPage.published === true) {
      return "Edit listing";
    }
    return "Add my listing";
  };

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
        variant="primary"
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
      <Button variant="primary" size="m" href="/edit-listing">
        {getButtonText()}
      </Button>

      <UserMenu />
    </div>
  );
}

export function ContentMobile({ onClose }) {
  const { isVisitor, companyPage } = useUserState();
  const { openRegisterModal, openLoginModal } = useModal();

  const getButtonText = () => {
    if (companyPage && typeof companyPage === 'object' && companyPage.published === true) {
      return "Edit listing";
    }
    return "Add my listing";
  };

  return (
    <div className="flex flex-col gap-6 mt-4 items-start w-full">
      <Link
        href="/zippworks-media"
        onClick={onClose}
        className=" text-3xl font-medium w-full"
      >
        ZippWorks Media
      </Link>

      <Link
        href="/blog"
        onClick={onClose}
        className=" text-3xl font-medium w-full"
      >
        Blog
      </Link>

      <Link
        href="/pricing"
        onClick={onClose}
        className=" text-3xl font-medium w-full"
      >
        Pricing
      </Link>

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
            variant="primary"
            fullWidth
            size="m"
            onClick={() => {
              openRegisterModal();
            }}
          >
            Create account
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-4 w-full">
          <UserMenu onClose={onClose} variant="extended" />
          <Button
            variant="primary"
            size="m"
            fullWidth
            href="/edit-listing"
            onClick={onClose}
          >
            {getButtonText()}
          </Button>
        </div>
      )}
    </div>
  );
}
