"use client";
import { useState } from "react";
import Button from "@/uikit/button";
import Input from "@/uikit/input";
import { LoginOrRegister } from "@/api/auth-client";
import { useNotification } from "@/providers/notifications";
import { setAuthCookies } from "@/utils/cookies";

export default function FormLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { showNotification } = useNotification(); // Global notification hook
  const [loading, setLoading] = useState(false); // Loading state
  const [emailInputError, setEmailInputError] = useState(false);
  const [passInputError, setPassInputError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

    if (!email.trim()) {
      setEmailInputError(true);
    }
    if (!password.trim()) {
      setPassInputError(true);
    }
    if (!email.trim() || !password.trim()) {
      return;
    }

    setLoading(true);
    try {
      const response = await LoginOrRegister({
        name: "",
        email: email,
        password: password,
        auth_type: "Login",
        utm_source: "",
        utm_campaign: "",
        utm_content: "",
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
    <form className="flex flex-col gap-6 w-full">
      <Input
        label="Email"
        type="email"
        autoComplete="username"
        placeholder="Your email address"
        value={formData.email}
        error={emailInputError}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        onFocus={(e) => setEmailInputError(false)}
        required
      />

      <Input
        label="Password"
        type="password"
        autocomplete="current-password"
        placeholder="Enter a password"
        value={formData.password}
        error={passInputError}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        onFocus={(e) => setPassInputError(false)}
        required
      />

      <Button
        type="submit"
        variant="black"
        size="m"
        fullWidth
        onClick={handleSubmit}
        loading={loading}
      >
        Sign in
      </Button>
      <p className="text-base text-center">
        <a className="text-brand-blue-800" href="/forgot-password">
          Forgot password?
        </a>
      </p>
      <p className="text-base text-center">
        Don&apos;t have an account?{" "}
        <a className="text-brand-blue-800" href="/register">
          Create account
        </a>
      </p>
    </form>
  );
}
