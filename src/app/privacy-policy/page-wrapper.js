import Content from "./content";

export default function PageWrapper() {
  return (
    <div className="page-container">
      <div className="section-container">
        <div className="card-container flex flex-col gap-8 p-8 max-md:px-4">
          <section className="flex flex-col gap-4">
            <h1 className="title-m">Privacy Policy</h1>
            <p className="paragraph-l">Effective Date: May 20, 2025</p>
          </section>
          <div className="divider" />
          <Content />
        </div>
      </div>
    </div>
  );
}
