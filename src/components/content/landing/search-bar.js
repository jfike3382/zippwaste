"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/uikit/button";
import ZoomIcon from "@/uikit/icons/zoom";

export default function SearchBar() {
  const [zipCode, setZipCode] = useState("");
  const router = useRouter();

  const handleInputChange = (e) => {
    const value = e.target.value;
    setZipCode(value);
  };

  const handleSearch = () => {
    if (zipCode.trim()) {
      router.push(`/companies?search=${encodeURIComponent(zipCode.trim())}`);
    } else {
      router.push("/companies");
    }
  };

  const handleKeyPress = (e) => {
    if (
      e.key === "Enter" ||
      e.code === "Enter" ||
      e.code === "Return" ||
      e.key === "Go" ||
      e.key === "Search" ||
      e.keyCode === 13
    ) {
      handleSearch();
    }
  };

  return (
    <div className="w-full max-w-[40rem] shadow-l hover:bg-interactive hover:focus-within:bg-white focus-within:bg-white focus-within:border-neutral-500 border-standard rounded-full p-2 flex flex-row gap-3 items-center bg-white transition-colors relative">
      <div className="flex-1">
        <input
          type="text"
          placeholder="Search by zip code or company name"
          value={zipCode}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          className="w-full px-4 max-md:py-2 text-lg outline-none border-none shadow-none bg-transparent placeholder:text-neutral-400 max-md:pr-12"
        />
      </div>

      {/* Desktop Button */}
      <div className="max-md:hidden">
        <Button variant="black" size="l" onClick={handleSearch}>
          Search Providers
        </Button>
      </div>

      {/* Mobile Search Icon */}
      <div
        className="hidden max-md:block absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer p-2"
        onClick={handleSearch}
      >
        <ZoomIcon size={28} />
      </div>
    </div>
  );
}
