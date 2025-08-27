import Footer from "@/components/footer";
import Image from "next/image";

export default function PageWrapper() {
  return (
    <>
      <div className="flex flex-col">
        <main className="flex flex-col gap-12 items-center py-24">
          <Image
            src="/zippwaste-logo.svg"
            alt="Zippwaste Logo"
            width={200}
            height={100}
          />
          <h1 className="text-4xl font-medium">Project launch soon</h1>
        </main>
        <Footer />
      </div>
    </>
  );
}
