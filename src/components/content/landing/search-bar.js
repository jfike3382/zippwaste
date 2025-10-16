"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/uikit/button";

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
    <div className="w-full max-w-[40rem] shadow-l hover:bg-interactive hover:focus-within:bg-white focus-within:bg-white focus-within:border-neutral-500 border-standard rounded-full p-2 flex flex-row gap-3 items-center bg-white max-md:flex-col max-md:rounded-4xl transition-colors">
      <div className="flex-1 max-md:w-full">
        <input
          type="text"
          placeholder="Search by zip code or company name"
          value={zipCode}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          className="w-full px-4 text-lg outline-none border-none shadow-none bg-transparent placeholder:text-neutral-400"
        />
      </div>
      <Button variant="black" size="l" onClick={handleSearch}>
        Search Providers
      </Button>
    </div>
  );
}
