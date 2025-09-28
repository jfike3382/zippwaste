"use client";

import { useState } from "react";

export default function FAQItem({ faq_item, initialOpen = false }) {
  const [open, setOpen] = useState(initialOpen);

  return (
    <div className="flex flex-col gap-6 w-full p-6 border-standard rounded-3xl">
      <div
        className="flex flex-row gap-4 justify-between items-center cursor-pointer"
        onClick={() => setOpen((v) => !v)}
      >
        <h3 className="title-s font-medium text-start">{faq_item.question}</h3>

        <span className="flex-shrink-0 w-5 h-5 ml-auto fill-current relative">
          <svg
            viewBox="0 0 16 16"
            width={16}
            height={16}
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              y="7"
              width="16"
              height="2"
              rx="1"
              className={`transform origin-center transition duration-200 ease-out ${
                open ? "rotate-180" : ""
              }`}
              fill="currentColor"
            />
            <rect
              y="7"
              width="16"
              height="2"
              rx="1"
              className={`transform origin-center transition duration-200 ease-out ${
                open ? "rotate-0" : "rotate-90"
              }`}
              fill="currentColor"
            />
          </svg>
        </span>
      </div>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? "opacity-100 mt-0" : "max-h-0 opacity-0 -mt-6"
        }`}
      >
        <p
          className="paragraph-l text-start"
          dangerouslySetInnerHTML={{ __html: faq_item.answer }}
        />
      </div>
    </div>
  );
}
