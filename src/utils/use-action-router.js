"use client";
import { useUserState } from "@/providers/user-state-provider";
import { useModal } from "@/providers/auth-modal";

export function useActionRouter() {
  const { isVisitor, isUser } = useUserState();

  // Safe destructuring with fallback no-op functions
  const modal = useModal() || {};

  const openRegisterModal =
    modal.openRegisterModal ||
    (() => {
      if (process.env.NODE_ENV === "development") {
        console.warn(
          "openRegisterModal is not available. Did you forget to wrap with AuthModalProvider?"
        );
      }
    });

  const handleAction = (action, e) => {
    if (isVisitor) {
      e?.preventDefault();
      openRegisterModal();
      return false;
    } else if (isUser) {
      e?.preventDefault();
      return false;
    }
    return true;
  };

  const handleActionRegistration = (e) => {
    if (isVisitor) {
      e?.preventDefault();
      openRegisterModal();
      return false;
    }
    return true;
  };

  return { handleAction, handleActionRegistration };
}
