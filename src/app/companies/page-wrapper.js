import TableWrapper from "@/components/table/table-wrapper";
import Footer from "@/components/global-elements/footer";

export default function PageWrapper({ initialSearch }) {
  return (
    <>
      <div className="flex  min-h-screen h-full">
        <div className="flex flex-1 ">
          <TableWrapper initialSearch={initialSearch} />
        </div>
      </div>
      <Footer />
    </>
  );
}
