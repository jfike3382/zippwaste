"use client";

import ProjectLogo from "@/components/nav-bar/project-logo";
import Button from "@/uikit/button";

export default function PreFooter() {
  return (
    <section className="main-landing-section">
      <div className="landing-container max-w-lg">
        <div className="flex flex-col gap-8 items-center">
          <ProjectLogo />
          <h2 className="title-l font-medium">
            Zippwaste enables over 10,000 startups of all sizes achieve their
            goals. Join them now!
          </h2>
        </div>

        <Button variant="primary" size="l">
          Get started
        </Button>
      </div>
    </section>
  );
}
