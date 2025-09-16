"use client";
import { useState } from "react";
import { getCookie } from "@/utils/cookies";
import { ListingApi } from "@/api/actions-client";
import Button from "@/uikit/button";
import Modal from "@/uikit/modal";
import Input from "@/uikit/input";
import { useNotification } from "@/providers/notifications";

export default function ContactCTA({ button }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const userEmail = getCookie("user_email");

  const [formData, setFormData] = useState({
    email: userEmail || "",
    listing_url: "",
    message: "",
  });

  const { showNotification } = useNotification();
  const [loading, setLoading] = useState(false);
  const [emailInputError, setEmailInputError] = useState(false);
  const [urlInputError, setUrlInputError] = useState(false);
  const [messageInputError, setMessageInputError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, listing_url, message } = formData;

    if (!email.trim()) setEmailInputError(true);
    if (!listing_url.trim()) setUrlInputError(true);
    if (!message.trim()) setMessageInputError(true);

    if (!email.trim() || !listing_url.trim() || !message.trim()) {
      return;
    }
    setLoading(true);

    try {
      const response = await ListingApi.claimListing({
        email,
        listing_url,
        message,
      });

      if (response.error) {
        showNotification("error", response.error);
      } else {
        showNotification("success", response.message);
        closeModal();
        setFormData({
          email: userEmail || "",
          listing_url: "",
          message: "",
        });
      }
    } catch (error) {
      showNotification("error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-3 z-999">
        {button ? (
          <div onClick={openModal}>{button}</div>
        ) : (
          <p className="cursor-pointer" onClick={openModal}>
            Claim listing
          </p>
        )}
      </div>
      <Modal isOpen={isOpen} onClose={closeModal} title="Claim Listing">
        <form className="w-full flex flex-col gap-6">
          <Input
            type="plain"
            label="Listing URL"
            value={formData.listing_url}
            error={urlInputError}
            onChange={(e) =>
              setFormData({ ...formData, listing_url: e.target.value })
            }
            onFocus={() => setUrlInputError(false)}
            required
            placeholder="Enter the URL of the listing you want to claim"
          />
          <Input
            type="plain"
            label="Email"
            value={formData.email}
            error={emailInputError}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            onFocus={() => setEmailInputError(false)}
            required
            placeholder="Enter your email address"
          />

          <Input
            type="textarea"
            label="Message"
            value={formData.message}
            error={messageInputError}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            onFocus={() => setMessageInputError(false)}
            required
            placeholder="Provide any details that can help us verify your ownership of the listed company"
          />
          <Button
            type="submit"
            variant="primary"
            size="m"
            fullWidth
            onClick={handleSubmit}
            loading={loading}
          >
            Claim listing profile
          </Button>
        </form>
      </Modal>
    </>
  );
}
