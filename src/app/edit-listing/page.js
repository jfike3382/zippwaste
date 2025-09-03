import FormRegister from "@/components/auth/form-register";
import generateMetadata from "@/utils/seo-metadata/static";

export const metadata = generateMetadata({
  title: "Edit Listing - Zippwaste",
  description:
    "Edit your listing details, access analytics, and increase your incoming traffic.",
  url: "/edit-listing",
  keywords: "edit listing, update listing",
});

export default function RegisterPage() {
  return (
    <main className="main-container items-center">
      <section className="auth-container">
        <h1 className="title-m text-center">Edit listing flow here</h1>
      </section>
    </main>
  );
}
