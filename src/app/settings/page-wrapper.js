"use client";

import { useEffect, useState } from "react";

import GlobalLoader from "@/components/global-elements/global-loader";
import Modal, { useModal } from "@/uikit/modal";
import { SettingsApi } from "@/api/support-client";
import { setCookie } from "@/utils/cookies";
import SettingsItem from "@/components/global-elements/settings-item";
import NameModal from "@/app/settings/modals/name-modal";
import EmailModal from "@/app/settings/modals/email-modal";
import PasswordModal from "@/app/settings/modals/password-modal";
import LogoUploader from "@/utils/logo-uploader";
import ProfileLogo from "@/components/profile-logo";

export default function PageWrapper() {
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(true);

  const { isOpen, openModal, closeModal } = useModal();
  const [modalType, setModalType] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const response = await SettingsApi.getUserInfo();
      if (!response.error) {
        setUserInfo(response.user || []);
      }
      setLoading(false);
    };

    fetchUserInfo();
  }, []);

  const handleOpenModal = (type) => {
    setModalType(type);
    openModal();
  };

  const handleLogoChange = (logoUrl, response) => {
    setUserInfo((prev) => ({
      ...prev,
      logo: { url: logoUrl },
    }));
    setCookie("user_logo", response?.user?.logo?.url);
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
      <GlobalLoader show={loading} />
      <section className="main-container-data-block max-w-4xl">
        <h1 className="title-l text-center">Settings</h1>
        {userInfo && Object.keys(userInfo).length > 0 && (
          <div className="flex flex-col gap-8">
            <div className="flex flex-col items-center gap-4">
              <ProfileLogo
                name={userInfo.name}
                size="xl"
                src={userInfo.logo?.url}
              />
              <LogoUploader
                onLogoChange={handleLogoChange}
                apiName="UserLogo"
                text="Change logo"
              />
            </div>
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
              title={
                userInfo.password ? "**********" : "Password doesn't exist"
              }
              subtitle="Password"
              buttonText={userInfo.password ? "Change" : "Create password"}
              onClick={() => handleOpenModal("password")}
            />
          </div>
        )}

        <Modal isOpen={isOpen} onClose={closeModal} title={modalContent.title}>
          {modalContent.content}
        </Modal>
      </section>
    </>
  );
}
