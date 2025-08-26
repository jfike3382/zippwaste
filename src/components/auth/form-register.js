"use client";

import { useState } from "react";

import Button from "@/components/uikit/button";
import Input from "@/components/uikit/input";
import { LoginOrRegister } from "@/api/auth-client";
import { useNotification } from "@/providers/notifications";
import { setAuthCookies } from "@/utils/cookies";

export default function FormRegister({ onSuccess }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { showNotification } = useNotification();
  const [loading, setLoading] = useState(false);
  const [nameInputError, setNameInputError] = useState(false);
  const [emailInputError, setEmailInputError] = useState(false);
  const [passInputError, setPassInputError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setNameInputError(true);
    }
    if (!email.trim()) {
      setEmailInputError(true);
    }
    if (!password.trim()) {
      setPassInputError(true);
    }
    if (!name.trim() || !email.trim() || !password.trim()) {
      return;
    }

    setLoading(true);
    try {
      const response = await LoginOrRegister({
        name: name,
        email: email,
        password: password,
        auth_type: "Register",
        utm_source: "",
        utm_campaign: "",
        utm_content: "",
      });

      if (response.error) {
        showNotification("error", response.error);
      } else {
        setAuthCookies(response.user, response.auth_token);
        onSuccess?.(); // Close modal on success
      }
    } catch (error) {
      showNotification("error", response.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <Input
        label="Name"
        type="plain"
        autoComplete="name"
        placeholder="Your name"
        value={name}
        error={nameInputError}
        onChange={(e) => setName(e.target.value)}
        onFocus={(e) => setNameInputError(false)}
        required
      />
      <Input
        label="Email"
        type="email"
        autoComplete="username"
        placeholder="Your email address"
        value={email}
        error={emailInputError}
        onChange={(e) => setEmail(e.target.value)}
        onFocus={(e) => setEmailInputError(false)}
        required
      />

      <Input
        label="Password"
        type="password"
        autoComplete="new-password"
        placeholder="Enter a password"
        value={password}
        error={passInputError}
        onChange={(e) => setPassword(e.target.value)}
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
        Continue
      </Button>
      <p className=" text-center">
        Already have an account?{" "}
        <a className="text-brand-blue-800" href="/login">
          Sign in
        </a>
      </p>
      <p className=" text-center">
        By continuing, you agree to our{" "}
        <a className="text-brand-blue-800" href="/terms-of-use">
          Terms
        </a>{" "}
        and{" "}
        <a className="text-brand-blue-800" href="privacy-policy">
          Privacy
        </a>
        .
      </p>
    </div>
  );
}
