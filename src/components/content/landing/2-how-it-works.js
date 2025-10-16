import Button from "@/uikit/button";
import Image from "next/image";
import InfoIcon from "@/uikit/icons/info";

const Steps = [
  {
    title: "Enter ZIP code",
    text: "Tell us your location to find local waste service providers in your area.",
    icon: "/assets/images/map-icon.png",
  },
  {
    title: "Choose service type",
    text: "Select between Dumpster rental or Junk removal based on your needs.",
    icon: "/assets/images/flag-icon.png",
  },
  {
    title: "Filter & Connect",
    text: "Filter by dumpster size, debris types, and more, and contact providers directly.",
    icon: "/assets/images/connect-icon.png",
  },
];

export default function HowItWorks() {
  return (
    <>
      <div className="gradient-divider" />
      <section className="section-container">
        <div className="flex flex-col gap-10 items-center justify-center">
          <div className="tag white uppercase">
            <InfoIcon size={16} />
            <span>How it works</span>
          </div>
          <div className="flex flex-col gap-6 items-center">
            <h2 className="title-xl max-w-3xl text-center">
              Find and connect with reliable waste services
            </h2>
            <p className="paragraph-xl max-w-2xl text-center">
              Stop calling around — search once, filter by what you need, and
              reach the right local provider fast.
            </p>
          </div>
        </div>
        <div className="flex flex-row gap-8 w-full max-w-[75rem] max-lg:flex-col">
          {Steps.map((step, index) => (
            <div
              key={index}
              className="p-8 rounded-4xl border-standard flex-1 flex flex-col gap-12 max-md:gap-8 items-start shadow-base"
            >
              <Image src={step.icon} alt={step.title} width={64} height={64} />

              <div className="flex flex-col gap-4 text-start">
                <p className="title-m ">{step.title}</p>
                <p>{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
