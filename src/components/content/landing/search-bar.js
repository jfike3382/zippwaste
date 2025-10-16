"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/uikit/input";
import Button from "@/uikit/button";

export default function SearchBar() {
  const [zipCode, setZipCode] = useState("");
  const router = useRouter();

  const handleInputChange = (e) => {
    const value = e.target.value;
    // Only allow numbers
    if (/^\d*$/.test(value)) {
      setZipCode(value);
    }
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
    <div className="w-full max-w-[40rem] flex flex-row gap-3 max-md:flex-col">
      <div className="flex-1">
        <Input
          placeholder="Enter ZIP CODE"
          value={zipCode}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
      </div>
      <Button variant="primary" size="m" onClick={handleSearch}>
        Search Providers
      </Button>
    </div>
  );
}
