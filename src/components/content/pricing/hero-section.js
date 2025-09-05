import PlansContainer from "./plans/plans-container";
import RaizerLogoIcon from "@/uikit/icons/raizer-icon";

export default function FirstScreen() {
  return (
    <section className="flex flex-col gap-6 w-full">
      <div className="flex flex-col justify-center items-center text-center gap-6">
        <h1 className="title-xl max-w-4xl inline-flex items-center gap-3 max-xl:block">
          Raise with confidence{" "}
          <span className="text-brand-violet-500 tablet-hidden mobile-hidden">
            <RaizerLogoIcon size={38} />
          </span>
          <span className="violet-gradient-text inline-flex items-center gap-2">
            and AI
          </span>
        </h1>
        <p className="paragraph-xl max-w-lg">
          Friendly pricing designed for every founder. Start today, no credit
          card required.
        </p>
      </div>
      <PlansContainer />
    </section>
  );
}
