import Link from "next/link";
import Button from "@/uikit/button";

export default function NotFound() {
  return (
    <main className="main-container items-center">
      <section className="flex flex-col items-center justify-center gap-8 pt-32 text-center">
        <div className="flex flex-col gap-8 items-center">
          <div className="tag white">
            <p className="violet-gradient-text">404</p>
          </div>
          <h1 className="title-xl">Page not found...</h1>
          <div className="flex flex-col gap-1">
            <p className="paragraph-xl max-w-xl ">
              ...but we do have so many other pages you might be interested in.
              Go home to explore.
            </p>
          </div>

          <Link href="/">
            <Button variant="black" size="m">
              Go to zippwaste.com
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
