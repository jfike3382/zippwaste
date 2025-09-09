import GlobalLoader from "@/components/global-elements/global-loader";
import MainSection from "../../../components/profile/investor/profile-section";
import SimilarProfiles from "../../../components/profile/investor/similar-sidebar";
import AISidebar from "../../../components/profile/investor/ai-sidebar";
import SideBar from "@/components/global-elements/side-bar";

export default function PageWrapper({ item, similar }) {
  return (
    <>
      <SideBar position="left">
        <AISidebar item={item} />
      </SideBar>
      <section className="main-container">
        <GlobalLoader show={!item} />
        {item && (
          <div className="main-container-data-block">
            <MainSection item={item} />
          </div>
        )}
      </section>
      <SideBar position="right">
        <SimilarProfiles data={similar} />
      </SideBar>
    </>
  );
}
