import ProfileWrapper from "@/components/company-page/profile-wrapper";
import Footer from "@/components/global-elements/footer";

export default function PageWrapper({ item }) {
  return (
    <>
      <div className="flex min-h-screen">
        <div className="flex flex-1 ">
          <ProfileWrapper item={item}  />
        </div>
      </div>
      <Footer />
    </>
  );
}
