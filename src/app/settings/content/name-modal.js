import { useState } from "react";
import Input from "@/uikit/input";
import Button from "@/uikit/button";
import { SettingsApi } from "@/api/actions-client";
import { useNotification } from "@/providers/notifications";
import { setCookie } from "@/utils/cookies";

export default function NameModal({ userInfo, setUserInfo, closeModal }) {
  const [name, setName] = useState(userInfo.name);
  const [loading, setLoading] = useState(false);
  const [nameInputError, setNameInputError] = useState(false);
  const { showNotification } = useNotification();

  const handleSaveName = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setNameInputError(true);
      return;
    }

    setLoading(true);
    const response = await SettingsApi.changeName({ name });
    setLoading(false);

    if (response.error) {
      showNotification("error", response.error);
    } else {
      showNotification("success", response.success_message);
      setUserInfo({ ...userInfo, name });
      setCookie("user_name", name);
      closeModal();
    }
  };

  return (
    <>
      <Input
        type="text"
        label="Name"
        placeholder="Enter your name"
        value={name}
        error={nameInputError}
        onChange={(e) => setName(e.target.value)}
        onFocus={() => setNameInputError(false)} // Reset error on focus
        required
      />
      <Button
        variant="black"
        size="m"
        loading={loading}
        onClick={handleSaveName} // Prevent empty input submission
      >
        Save name
      </Button>
    </>
  );
}
