"use client";
import { useState } from "react";

import Button from "@/uikit/button";
import Input from "@/uikit/input";
import {
  PassRequestCode,
  PassVerifyCode,
  PassSetNewPass,
} from "@/api/auth-client";
import { useNotification } from "@/providers/notifications";
import { setAuthCookies } from "@/utils/cookies";

export default function FormResetPass() {
  const [formData, setFormData] = useState({
    email: "",
    verification_code: "",
    new_password: "",
  });

  const [resetStep, setResetStep] = useState(1);

  const { showNotification } = useNotification(); // Global notification hook
  const [loading, setLoading] = useState(false); // Loading state
  const [emailInputError, setEmailInputError] = useState(false);
  const [codeInputError, setCodeInputError] = useState(false);
  const [codeInputVis, setCodeInputVis] = useState(false);
  const [passInputError, setPassInputError] = useState(false);
  const [passInputVis, setPassInputVis] = useState(false);

  const submitPassRequestCode = async (e) => {
    e.preventDefault();
    const { email } = formData;

    if (!email.trim()) {
      setEmailInputError(true);
      return;
    }
    setLoading(true);
    try {
      const response = await PassRequestCode({
        email: email,
      });

      if (response.error) {
        showNotification("error", response.error);
      } else {
        setResetStep(2);
        setCodeInputVis(true);
        showNotification("success", response.message);
      }
    } catch (error) {
      showNotification("error", error.message);
    } finally {
      setLoading(false);
    }
  };

  const submitPassVerifyCode = async (e) => {
    e.preventDefault();

    const { email, verification_code } = formData;

    if (!email.trim()) {
      setEmailInputError(true);
    }
    if (!verification_code.trim()) {
      setCodeInputError(true);
    }
    if (!email.trim() || !verification_code.trim()) {
      return;
    }
    setLoading(true);
    try {
      const response = await PassVerifyCode({
        email: email,
        verification_code: verification_code,
      });

      if (response.error) {
        showNotification("error", response.error);
      } else {
        setResetStep(3);
        setPassInputVis(true);
        showNotification("success", response.message);
      }
    } catch (error) {
      showNotification("error", error.message);
    } finally {
      setLoading(false);
    }
  };

  const submitPassSetNewPass = async (e) => {
    e.preventDefault();

    const { email, new_password } = formData;

    if (!email.trim()) {
      setEmailInputError(true);
    }
    if (!new_password.trim()) {
      setPassInputError(true);
    }
    if (!email.trim() || !new_password.trim()) {
      return;
    }
    setLoading(true);
    try {
      const response = await PassSetNewPass({
        email: email,
        new_password: new_password,
      });

      if (response.error) {
        showNotification("error", response.error);
      } else {
        setAuthCookies(response.user, response.auth_token);
      }
    } catch (error) {
      showNotification("error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <form className="w-full flex flex-col gap-6">
        <Input
          label="Email"
          type="email"
          placeholder="Your email address"
          autoComplete="username"
          value={formData.email}
          error={emailInputError}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          onFocus={(e) => setEmailInputError(false)}
          required
        />
        <Input
          label="Code"
          type="number"
          placeholder="Enter verification code"
          value={formData.verification_code}
          visible={codeInputVis}
          error={codeInputError}
          onChange={(e) =>
            setFormData({ ...formData, verification_code: e.target.value })
          }
          onFocus={(e) => setCodeInputError(false)}
          required
        />

        <Input
          label="New password"
          type="password"
          placeholder="Enter a new password"
          autoComplete="new-password"
          value={formData.new_password}
          visible={passInputVis}
          error={passInputError}
          onChange={(e) =>
            setFormData({ ...formData, new_password: e.target.value })
          }
          onFocus={(e) => setPassInputError(false)}
          required
        />

        <Button
          variant="black"
          size="m"
          fullWidth
          onClick={
            resetStep === 1
              ? submitPassRequestCode
              : resetStep === 2
              ? submitPassVerifyCode
              : submitPassSetNewPass
          }
          loading={loading}
        >
          {resetStep === 1
            ? "Request a code"
            : resetStep === 2
            ? "Verify the code"
            : "Save new password and log in"}
        </Button>
      </form>
      <p className="text-base text-center">
        {" "}
        Go back to{" "}
        <a className="text-brand-blue-800" href="/login">
          Login
        </a>
      </p>
    </div>
  );
}
