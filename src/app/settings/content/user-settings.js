"use client";

import { useState } from "react";
import Modal, { useModal } from "@/uikit/modal";
import { setCookie } from "@/utils/cookies";
import SettingsItem from "@/app/settings/content/settings-item";
import NameModal from "./name-modal";
import EmailModal from "./email-modal";
import PasswordModal from "./password-modal";

export default function UserSettings({ userInfo, setUserInfo }) {
  const { isOpen, openModal, closeModal } = useModal();
  const [modalType, setModalType] = useState(null);

  const handleOpenModal = (type) => {
    setModalType(type);
    openModal();
  };

  const handleNameChange = (newName) => {
    setUserInfo((prev) => ({
      ...prev,
      name: newName,
    }));
    setCookie("user_name", newName);
  };

  const getModalContent = () => {
    switch (modalType) {
      case "name":
        return {
          title: "Change name",
          content: (
            <NameModal
              userInfo={userInfo}
              setUserInfo={setUserInfo}
              closeModal={closeModal}
              onNameChange={handleNameChange}
            />
          ),
        };
      case "email":
        return {
          title: "Change email address",
          content: (
            <EmailModal
              userInfo={userInfo}
              setUserInfo={setUserInfo}
              closeModal={closeModal}
            />
          ),
        };
      case "password":
        return {
          title: userInfo.password ? "Change password" : "Create password",
          content: (
            <PasswordModal
              userInfo={userInfo}
              setUserInfo={setUserInfo}
              closeModal={closeModal}
            />
          ),
        };
      default:
        return { title: "", content: null };
    }
  };

  const modalContent = getModalContent();

  return (
    <>
      <div className="flex flex-col gap-8">
        <SettingsItem
          title={userInfo.name}
          subtitle="User name"
          buttonText="Change"
          onClick={() => handleOpenModal("name")}
        />

        <SettingsItem
          title={userInfo.email}
          subtitle="Email address"
          buttonText="Change"
          onClick={() => handleOpenModal("email")}
        />

        <SettingsItem
          title={userInfo.password ? "**********" : "Password doesn't exist"}
          subtitle="Password"
          buttonText={userInfo.password ? "Change" : "Create password"}
          onClick={() => handleOpenModal("password")}
        />
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} title={modalContent.title}>
        {modalContent.content}
      </Modal>
    </>
  );
}
