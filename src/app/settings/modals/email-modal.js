import { useState } from "react";
import Input from "@/uikit/input";
import Button from "@/uikit/button";
import { SettingsApi } from "@/api/actions-client";
import { useNotification } from "@/providers/notifications";
import { setCookie } from "@/utils/cookies";

export default function EmailModal({ userInfo, setUserInfo, closeModal }) {
  const [email, setEmail] = useState(userInfo.email);
  const [resetStep, setResetStep] = useState(1);
  const [verificationCode, setVerificationCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailInputError, setEmailInputError] = useState(false);
  const [codeInputError, setCodeInputError] = useState(false);
  const { showNotification } = useNotification();

  const handleEmailReset = async (e) => {
    e.preventDefault();

    if (resetStep === 1 && !email.trim()) {
      setEmailInputError(true);
      return;
    }

    if (resetStep === 2) {
      if (!email.trim()) {
        setEmailInputError(true);
      }
      if (!verificationCode.trim()) {
        setCodeInputError(true);
      }
      if (!email.trim() || !verificationCode.trim()) {
        return;
      }
    }

    setLoading(true);
    try {
      const response = await SettingsApi.changeEmail({
        step: resetStep,
        email,
        one_time_code: verificationCode,
      });

      if (response.error) {
        showNotification("error", response.error);
      } else {
        if (resetStep === 1) {
          setResetStep(2);
          showNotification("success", response.success_message);
        } else if (resetStep === 2) {
          setUserInfo({ ...userInfo, email });
          setCookie("user_email", email);
          showNotification("success", response.success_message);
          closeModal(); // Auto-close the modal
        }
      }
    } catch (error) {
      showNotification("error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Input
        type="email"
        label="Email"
        placeholder="Enter your email address"
        value={email}
        error={emailInputError}
        onChange={(e) => setEmail(e.target.value)}
        onFocus={() => setEmailInputError(false)} // Reset error on focus
        required
      />
      {resetStep === 2 && (
        <Input
          type="number"
          label="Verification code"
          value={verificationCode}
          error={codeInputError}
          onChange={(e) => setVerificationCode(e.target.value)}
          onFocus={() => setCodeInputError(false)} // Reset error on focus
          required
        />
      )}
      <Button
        variant="black"
        size="m"
        loading={loading}
        onClick={handleEmailReset} // Prevent empty input submission
      >
        {resetStep === 1
          ? "Request verification code"
          : "Verify and save email"}
      </Button>
    </>
  );
}
