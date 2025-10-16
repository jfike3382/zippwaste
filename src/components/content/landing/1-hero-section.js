"use client";

import SearchBar from "./search-bar";

export default function Section() {
  return (
    <section className=" section-container ">
      <div className="flex flex-col gap-8 items-center text-center max-w-[62.5rem]">
        <h1 className="title-xl">
          Find Dumpster Rental & Junk Removal Services Near You
        </h1>
        <SearchBar />
      </div>
    </section>
  );
}
