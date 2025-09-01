import Footer from "@/components/global-elements/footer";
import TableWrapper from "@/components/table/table-wrapper";
import Image from "next/image";

export default function PageWrapper() {
  return (
    <>
      <div className="flex flex-col min-h-screen h-full">
        <div className="flex-1 flex">
          <TableWrapper />
        </div>
        <Footer />
      </div>
    </>
  );
}
