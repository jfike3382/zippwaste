"use client";
import { createContext, useContext, useState } from "react";
import Modal from "@/components/uikit/modal";
import FormRegister from "@/components/auth/form-register";
import FormLogin from "@/components/auth/form-login";

const AuthModalContext = createContext();

export const useModal = () => useContext(AuthModalContext);

export const AuthModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState("register");

  const openRegisterModal = () => {
    setMode("register");
    setIsOpen(true);
  };

  const openLoginModal = () => {
    setMode("login");
    setIsOpen(true);
  };

  const closeAuthModal = () => setIsOpen(false);

  const toggleMode = () => {
    setMode(mode === "register" ? "login" : "register");
  };

  return (
    <AuthModalContext.Provider
      value={{ openRegisterModal, openLoginModal, closeAuthModal, toggleMode }}
    >
      {children}
      <Modal
        isOpen={isOpen}
        onClose={closeAuthModal}
        title={mode === "register" ? "Create account" : "Login"}
      >
        {mode === "register" ? (
          <FormRegister
            onSuccess={closeAuthModal}
            onSwitchMode={toggleMode}
          />
        ) : (
          <FormLogin onSuccess={closeAuthModal} onSwitchMode={toggleMode} />
        )}
      </Modal>
    </AuthModalContext.Provider>
  );
};
