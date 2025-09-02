import FormLogin from "@/components/auth/form-login";
import createMetadata from "@/utils/seo-metadata/static";

export const metadata = createMetadata({
  title: "Login - Zippwaste",
  description:
    "Login to your account to claim your listing, track analytics, and manage your company.",
  url: "/login",
  keywords: "sign in, login dashboard, account access",
});

export default function Page() {
  return (
    <main className="main-container items-center">
      <section className="auth-container">
        <h1 className="title-m text-center">Login</h1>
        <FormLogin />
      </section>
    </main>
  );
}
