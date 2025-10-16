"use client";

import SearchBar from "./search-bar";

export default function Section() {
  return (
    <section className="section-container max-w-[62.5rem]">
      <div className="flex flex-col gap-6 items-center text-center">
        <h1 className="title-2xl">
          Find dumpster rental & junk removal services near you
        </h1>
        <p className="paragraph-xl max-w-2xl">
          Compare local providers, read reviews, and get quotes — all in one
          place. No more calling around.
        </p>
      </div>

      <div className="flex flex-col gap-4 items-center w-full">
        <SearchBar />
      </div>

      <div className="flex flex-row gap-12 items-center text-xl text-secondary max-md:flex-wrap max-md:gap-8 max-md:justify-center">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-main">7,000+</span>
          <span className="text-base">Companies</span>
        </div>
        <div className="divider vertical h-6 max-md:hidden"></div>
        <div className="flex items-center gap-2">
          <span className="font-semibold text-main ">500+</span>
          <span className="text-base">Cities</span>
        </div>
        <div className="divider vertical h-6 max-md:hidden"></div>
        <div className="flex items-center gap-2">
          <span className="font-semibold text-main ">100%</span>
          <span className="text-base">Free to use</span>
        </div>
      </div>
    </section>
  );
}
