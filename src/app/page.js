import Image from "next/image";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center">
        <Image
          src="/zippwaste-logo.svg"
          alt="Zippwaste Logo"
          width={200}
          height={100}
        />
        <h1 className="text-4xl font-bold">Project launch soon</h1>
      </main>
    </div>
  );
}
