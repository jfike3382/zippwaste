import { useState } from "react";
import Input from "@/uikit/input";
import Button from "@/uikit/button";
import { SettingsApi } from "@/api/actions-client";
import { useNotification } from "@/providers/notifications";

export default function PasswordModal({ userInfo, setUserInfo, closeModal }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPasswordError, setCurrentPasswordError] = useState(false);
  const [newPasswordError, setNewPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const { showNotification } = useNotification();

  const handleSavePassword = async (e) => {
    e.preventDefault();

    if (userInfo.password && !currentPassword.trim()) {
      setCurrentPasswordError(true);
    }
    if (!newPassword.trim()) {
      setNewPasswordError(true);
    }
    if (!confirmPassword.trim()) {
      setConfirmPasswordError(true);
    }
    if (
      (userInfo.password && !currentPassword.trim()) ||
      !newPassword.trim() ||
      !confirmPassword.trim()
    ) {
      return;
    }

    if (newPassword !== confirmPassword) {
      showNotification("error", "New passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const response = await SettingsApi.changePassword({
        old_pass: currentPassword,
        new_pass: newPassword,
        confirm_new_pass: confirmPassword,
      });

      if (response.error) {
        showNotification("error", response.error);
      } else {
        showNotification("success", response.success_message);
        setUserInfo({ ...userInfo, password: true }); // Update user info to reflect password change
        closeModal(); // Auto-close the modal
      }
    } catch (error) {
      showNotification("error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {userInfo.password && (
        <Input
          type="password"
          label="Old password"
          placeholder="Enter your old password"
          value={currentPassword}
          error={currentPasswordError}
          onChange={(e) => setCurrentPassword(e.target.value)}
          onFocus={() => setCurrentPasswordError(false)} // Reset error on focus
          autoComplete="current-password" // Added autoComplete
          required
        />
      )}
      <Input
        type="password"
        label="New password"
        placeholder="Enter your new password"
        value={newPassword}
        error={newPasswordError}
        onChange={(e) => setNewPassword(e.target.value)}
        onFocus={() => setNewPasswordError(false)} // Reset error on focus
        autoComplete="new-password" // Added autoComplete
        required
      />
      <Input
        type="password"
        label="Confirm new password"
        placeholder="Confirm your new password"
        value={confirmPassword}
        error={confirmPasswordError}
        onChange={(e) => setConfirmPassword(e.target.value)}
        onFocus={() => setConfirmPasswordError(false)} // Reset error on focus
        autoComplete="new-password" // Added autoComplete
        required
      />
      <Button
        variant="black"
        size="m"
        loading={loading}
        onClick={handleSavePassword} // Prevent empty input submission
      >
        {userInfo.password ? "Update password" : "Create password"}
      </Button>
    </>
  );
}
