import Footer from "@/components/footer";
import Image from "next/image";

export default function PageWrapper() {
  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-col gap-12 items-center py-32">
          <Image
            src="/zippwaste-logo.svg"
            alt="Zippwaste Logo"
            width={200}
            height={100}
          />
          <h1 className="text-4xl font-medium">Project launch soon</h1>
        </div>
        <Footer />
      </div>
    </>
  );
}
