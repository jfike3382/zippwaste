"use client";

import FAQ from "@/components/global-elements/faq";
import Link from "next/link";
import Button from "@/uikit/button";

export default function Section({ onClose }) {
  const handleShowAllQuestions = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <section className="w-full mx-auto items-center flex justify-center">
      <div className="landing-container max-w-[40rem]">
        <h2 className="title-l">Your questions, answered</h2>
        <FAQ isFeaturedPricing={true} initialOpen={false} />
        <Link href="/faq" onClick={handleShowAllQuestions}>
          <Button variant="black" size="l">
            Show all questions
          </Button>
        </Link>
      </div>
    </section>
  );
}
