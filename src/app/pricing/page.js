import FormRegister from "@/components/auth/form-register";
import generateMetadata from "@/utils/seo-metadata/static";

export const metadata = generateMetadata({
  title: "Pricing - Zippwaste",
  description: "Pricing.",
  url: "/pricing",
  keywords: "pricing, plans, subscription",
});

export default function PricingPage() {
  return (
    <main className="main-container items-center">
      <section className="auth-container">
        <h1 className="title-m text-center">Pricing</h1>
        <FormRegister />
      </section>
    </main>
  );
}
