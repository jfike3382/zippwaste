import PlansContainer from "./plans-container";
import Image from "next/image";

export default function FirstScreen() {
  return (
    <section className="flex flex-col gap-20 w-full">
      <div className="flex flex-col justify-center items-center text-center gap-6 max-w-[960px] mx-auto">
        <div className="tag white uppercase">
          <div className="pt-1">
            <Image
              src="/assets/images/zippworks-logo.svg"
              alt="Zippworks Logo"
              width="80"
              height="24"
            />
          </div>
        </div>
        <h1 className="title-xl ">
          Professional Websites for Dumpster & Junk Removal Companies
        </h1>
        <p className="paragraph-xl flex flex-col gap-1">
          <span>
            ZippWorks Media helps waste industry businesses stand out online
            with modern websites, built to generate leads and simplify
            operations.
          </span>{" "}
        </p>
      </div>
      <PlansContainer />
    </section>
  );
}
