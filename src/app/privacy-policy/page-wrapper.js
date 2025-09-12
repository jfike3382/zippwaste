import Content from "./content";

export default function PageWrapper() {
  return (
    <div className="main-data-container">
      <div className="card-container flex flex-col gap-8 p-8 max-md:px-4">
        <section className="flex flex-col gap-4">
          <h1 className="title-m">Privacy Policy</h1>
          <p className="paragraph-l">Effective Date: Sep 8, 2025</p>
        </section>
        <div className="divider" />
        <Content />
      </div>
    </div>
  );
}