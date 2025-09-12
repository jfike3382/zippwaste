import Footer from "@/components/global-elements/footer";
import TableWrapper from "@/components/table/table-wrapper";

export default function PageWrapper() {
  return (
    <>
      <div className="flex flex-col min-h-screen h-full">
        <div className="flex flex-1">
          <TableWrapper />
        </div>
        <Footer />
      </div>
    </>
  );
}
