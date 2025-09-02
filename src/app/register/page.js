import FormRegister from "@/components/auth/form-register";
import generateMetadata from "@/utils/seo-metadata/static";

export const metadata = generateMetadata({
  title: "Register - Zippwaste",
  description:
    "Create an account to create a listing, access analytics, and increase your incoming traffic.",
  url: "/register",
  keywords: "sign up, register",
});

export default function RegisterPage() {
  return (
    <main className="main-container items-center">
      <section className="auth-container">
        <h1 className="title-m text-center">Create account</h1>
        <FormRegister />
      </section>
    </main>
  );
}
