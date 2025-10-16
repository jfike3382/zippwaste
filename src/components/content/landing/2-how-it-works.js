import Button from "@/uikit/button";

const Steps = [
  {
    title: "Submit your startup",
    text: "Tell us about your startup and how much you're raising.",
    icon: "/assets/3d-icons/how-step-1.png",
  },
  {
    title: "Find relevant investors",
    text: "Get access to 140K+ VCs & startups to achieve your goals.",
    icon: "/assets/3d-icons/how-step-2.png",
  },
  {
    title: "Close deals faster",
    text: "Reach out directly using contact info and start conversations..",
    icon: "/assets/3d-icons/how-step-3.png",
  },
];

export default function TrustedBy() {
  return (
    <section className="section-container">
      <div className="flex flex-col gap-10 items-center justify-center">
        <div className="tag white uppercase">How it works</div>
        <div className="flex flex-col gap-6 items-center">
          <h2 className="title-xl font-medium max-w-3xl">
            {" "}
            Thousands of people will see your profile
          </h2>
          <p className="paragraph-xl">
            Get discovered by investors, founders, customers, partners & more.
          </p>
        </div>
      </div>
      <div className="flex flex-row gap-6 w-full max-w-[75rem] max-lg:flex-col">
        {Steps.map((step, index) => (
          <div
            key={index}
            className="p-8 rounded-4xl border-standard flex-1 flex flex-col gap-16 max-md:gap-8 items-start"
          >
            <div className="flex flex-col gap-4 text-start">
              <p className="title-m">{step.title}</p>
              <p>{step.text}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="max-md:w-full">
        <Button
          variant="gradient"
          size="m"
          fullWidth
          href={"/edit-startup"}
          restriction="visitor"
          hrefType="internal"
        >
          Publish your startup
        </Button>
      </div>
    </section>
  );
}
