import Image from "next/image";

import Button from "@/uikit/button";

export default function Section() {
  return (
    <section className="border-b border-black py-20 px-5 flex flex-col gap-20 items-center justify-center max-md:py-16 relative">
      <div className="landing-container relative z-40 mt-20">
        <div className="flex flex-col gap-8 items-center text-center max-w-[62.5rem]">
          <h1 className="title-xl">
            Find Dumpster Rental & Junk Removal Services Near You
          </h1>
          <p className="paragraph-xl flex flex-col gap-1">
            Stop calling around — search once, filter by what you need, and
            reach the right local provider fast.
          </p>
        </div>
        <div className="violet-gradient-border border-1 max-w-[40rem] w-full isolate rounded-full p-4 flex flex-row gap-3 justify-between items-center bg-white shadow-base max-md:flex-col max-md:rounded-4xl">
          <div className="flex flex-row gap-3">
            <Image
              src="/assets/icons/fire-colored.png"
              alt="Fire icon"
              width={42}
              height={42}
            />
            <p className="title-s text-start flex items-center ">
              Get seen by top investors & founders
            </p>
          </div>
          <div className="max-md:w-full">
            <Button
              variant="gradient"
              size="m"
              fullWidth
              href={"/edit-startup"}
              restriction="visitor"
              hrefType="internal"
            >
              Publish your startup
            </Button>
          </div>
        </div>
      </div>

      <Image
        className="absolute inset-0 w-full h-full z-0"
        src="/assets/images/gradient_main.webp"
        alt="Background Gradient"
        fill
        priority
      />
    </section>
  );
}
