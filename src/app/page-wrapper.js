import TableWrapper from "@/components/table/table-wrapper";
import Footer from "@/components/global-elements/footer";

export default function PageWrapper() {
  return (
    <>
      <div className="flex min-h-screen">
        <div className="flex flex-1 ">
          <TableWrapper />
        </div>
      </div>
      <Footer />
    </>
  );
}
