import PlansContainer from "./plans-container";

export default function FirstScreen() {
  return (
    <section className="flex flex-col gap-6 w-full">
      <div className="flex flex-col justify-center items-center text-center gap-6 max-w-xl mx-auto">
        <h1 className="title-xl ">Pricing</h1>
        <p className="paragraph-xl flex flex-col gap-1">
          <span>Listing plans designed for businesses of all sizes.</span> <span>Start today. Simple and transparent.</span>
        </p>
      </div>
      <PlansContainer />
    </section>
  );
}
