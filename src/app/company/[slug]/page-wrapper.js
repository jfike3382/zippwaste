import MainSection from "@/components/company-page/profile-section";

export default function PageWrapper({ item }) {
  return (
    <section className="page-container">
      <MainSection item={item} />
    </section>
  );
}
