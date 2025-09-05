"use client";

import { useState, useEffect, useRef, useCallback } from "react";

import PlansHeader from "./plans-header";
import PlansFeatures from "./plans-features";

import pricingData from "@/data/pricing.json";

export default function Content() {
  const { plans } = pricingData;
  const [isCollapsed, setIsCollapsed] = useState(false);
  const sentinelRef = useRef(null);

  const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1280) {
        setIsCollapsed(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    // Only observe scroll for desktop
    if (window.innerWidth >= 1280) {
      const mainContainer = document.querySelector(".main-container");
      const modalContent = document.querySelector(".modal-content");
      const scrollContainer = modalContent || mainContainer;

      if (!scrollContainer) {
        return;
      }

      const observer = new IntersectionObserver(
        ([entry]) => {
          const debouncedSetIsCollapsed = debounce((collapsed) => {
            setIsCollapsed(collapsed);
          }, 100);

          if (!entry.isIntersecting) {
            debouncedSetIsCollapsed(true);
          } else {
            debouncedSetIsCollapsed(false);
          }
        },
        {
          root: scrollContainer,
          rootMargin: "-100px 0px 0px 0px",
          threshold: 0,
        }
      );

      if (sentinelRef.current) {
        observer.observe(sentinelRef.current);
      }

      return () => {
        if (sentinelRef.current) {
          observer.unobserve(sentinelRef.current);
        }
        window.removeEventListener("resize", handleResize);
      };
    } else {
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [isCollapsed]);

  return (
    <div className="flex flex-col gap-16 items-center justify-center relative mx-auto max-xl:mx-0">
      <div ref={sentinelRef} className="h-1 w-full absolute top-0" />
      <div className="sticky top-0 z-10 w-full">
        <PlansHeader plans={plans} isCollapsed={isCollapsed} />
      </div>
      <PlansFeatures plans={plans} />
      <p>No contract or commitment – cancel anytime you want.</p>
    </div>
  );
}
