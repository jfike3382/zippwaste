"use client";
import { useState } from "react";
import { getCookie } from "@/utils/cookies";
import { SupportApi } from "@/api/actions-client";
import Button from "@/uikit/button";
import Modal from "@/uikit/modal";
import Input from "@/uikit/input";
import Selector from "@/uikit/selector";
import { useNotification } from "@/providers/notifications";
import ChatIcon from "@/uikit/icons/chat";

export default function ContactCTA() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const userEmail = getCookie("user_email");

  const [formData, setFormData] = useState({
    email: userEmail || "",
    topic: "",
    message: "",
  });

  const { showNotification } = useNotification();
  const [loading, setLoading] = useState(false);
  const [emailInputError, setEmailInputError] = useState(false);
  const [topicError, setTopicError] = useState(false);
  const [messageInputError, setMessageInputError] = useState(false);

  const topicOptions = [
    "General Inquiry",
    "Sales Inquiry",
    "Bug Report",
    "Data Edit / Removal",
    "Feature Request",
    "Partnership",
    "Support",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, topic, message } = formData;

    if (!email.trim()) setEmailInputError(true);
    if (!topic) setTopicError(true);
    if (!message.trim()) setMessageInputError(true);

    if (!email.trim() || !topic || !message.trim()) {
      return;
    }
    setLoading(true);

    try {
      const response = await SupportApi.SubmitContactForm({
        email,
        topic,
        message,
      });

      if (response.error) {
        showNotification("error", response.error);
      } else {
        showNotification("success", response.message);
        closeModal();
      }
    } catch (error) {
      showNotification("error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-3  fixed bottom-6 right-6 z-999">
        <button
          className="rounded-full border-standard size-13 flex items-center justify-center cursor-pointer shadow-base bg-white hover:bg-brand-gray-200 active:bg-brand-gray-400"
          onClick={openModal}
        >
          <ChatIcon size={32} />
        </button>
      </div>
      <Modal isOpen={isOpen} onClose={closeModal} title="Contact Us">
        <form className="w-full flex flex-col gap-6">
          <Selector
            value={formData.topic}
            onChange={(topic) => {
              setFormData({ ...formData, topic });
              setTopicError(false);
            }}
            options={topicOptions}
            placeholder="Select relevant topic"
            error={topicError}
            label="Topic"
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
            placeholder="Enter your message here"
          />
          <Button
            type="submit"
            variant="primary"
            size="m"
            fullWidth
            onClick={handleSubmit}
            loading={loading}
          >
            Submit message
          </Button>
        </form>
      </Modal>
    </>
  );
}
