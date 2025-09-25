export const runtime = "edge";

import Image from "next/image";

export default function BlogPost({ post }) {
  return (
    <div className="main-data-container">
      <div className="card-container flex flex-col gap-8 p-8 max-md:px-4">
        <section className="flex flex-col gap-6">
          <h1 className="title-l">{post.name}</h1>
          <p className="paragraph-l">{post.subtitle}</p>
          {post.image?.url && (
            <Image
              src={post.image?.url}
              alt={post.name}
              width={800}
              height={400}
              className="w-full h-100 object-cover rounded-lg mb-6"
            />
          )}
        </section>
        <div className="divider" />

        <article
          className="rich-text-section prose max-w-none"
          dangerouslySetInnerHTML={{ __html: post.html_text }}
        />
      </div>
    </div>
  );
}
