import GlobalLoader from "@/components/global-elements/global-loader";
import MainSection from "@/components/company-page/profile-section";

export default function PageWrapper({ item, similar }) {
  return (
    <section className="main-container">
      <GlobalLoader show={!item} />
      {item && (
        <div className="main-container-data-block">
          <MainSection item={item} />
        </div>
      )}
    </section>
  );
}
