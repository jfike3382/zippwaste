"use client";

import Script from "next/script";

export default function PageWrapper() {
  return (
    <div className="main-data-container">
      <div className="card-container flex flex-col gap-8 p-8 max-md:px-4">
        <section className="flex flex-col gap-4">
          <h1 className="title-m">Terms of Use</h1>
          <p className="paragraph-l">Effective Date: Sep 8, 2025</p>
        </section>
        <div className="divider" />
        <div
          id="WVRseVdGUlhiR1pTZWxSMmNsRTlQUT09"
          className="policy_embed_div"
          width="640"
          height="480"
        >
          Please wait while the policy is loaded. If it does not load, please{" "}
          <a
            rel="nofollow"
            href="https://policies.termageddon.com/api/policy/WVRseVdGUlhiR1pTZWxSMmNsRTlQUT09"
            target="_blank"
          >
            click here
          </a>{" "}
          to view the policy.
        </div>
      </div>
      <Script
        src="https://policies.termageddon.com/api/embed/WVRseVdGUlhiR1pTZWxSMmNsRTlQUT09.js"
        strategy="lazyOnload"
        onLoad={() => console.log("Termageddon script loaded successfully")}
        onError={(e) => console.error("Failed to load Termageddon script:", e)}
      />
    </div>
  );
}
