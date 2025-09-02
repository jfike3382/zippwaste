import FormResetPass from "@/components/auth/form-reset-pass";
import generateMetadata from "@/utils/seo-metadata/static";

export const metadata = generateMetadata({
  title: "Forgot Password - Zippwaste",
  description: "Reset your password to regain access to your listing.",
  url: "/forgot-password",
  keywords: "forgot password, reset password, account recovery,  regain access",
});

export default function Page() {
  return (
    <main className="main-container items-center">
      <section className="auth-container">
        <h1 className="title-m text-center">Reset your password</h1>
        <FormResetPass />
      </section>
    </main>
  );
}
