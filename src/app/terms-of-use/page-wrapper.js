"use client";

import { useEffect } from "react";

const TERMAGEDDON_API_PATH = "https://policies.termageddon.com/api/policy/";
const POLICY_KEY = "WVRseVdGUlhiR1pTZWxSMmNsRTlQUT09";

export default function PageWrapper() {
  useEffect(() => {
    const policyElement = document.getElementById("policy");
    if (!policyElement) {
      console.error("Error! Could not find policy element.");
      return;
    }

    const extraParams = policyElement.dataset.extra
      ? "?" + policyElement.dataset.extra
      : "";
    const xhr = new XMLHttpRequest();

    xhr.onload = () => {
      console.log("Policy loaded successfully!");
      policyElement.innerHTML = xhr.responseText;
    };

    xhr.onerror = () => {
      console.error("Error! Could not load policy.");
      policyElement.innerHTML =
        'There has been an error loading this policy. Please <a href="https://policies.termageddon.com/api/policy/' +
        POLICY_KEY +
        '" target="_blank">click here</a> to view it.';
    };

    xhr.open("GET", TERMAGEDDON_API_PATH + POLICY_KEY + extraParams);
    xhr.send();
  }, []);

  return (
    <div className="main-data-container">
      <div className="card-container flex flex-col gap-8 p-8 max-md:px-4">
        <div
          id="policy"
          data-extra="h-align=left&h-depth=3&table-style=accordion"
          className="w-full text-base/8"
        >
          Please wait while the policy is loaded...
        </div>
      </div>
    </div>
  );
}
