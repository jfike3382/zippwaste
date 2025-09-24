export const runtime = "edge";

import Image from "next/image";

export default function BlogPost({ post }) {
  return (
    <>
      <section className="main-container">
        <div className="main-container-data-block">
          {post.image?.url && (
            <Image
              src={post.image.url}
              alt={post.name}
              width={800}
              height={400}
              className="w-full h-64 object-cover rounded-lg mb-6"
            />
          )}

          <h1 className="title-l mb-4">{post.name}</h1>

          {post.subtitle && (
            <p className="text-xl text-gray-600 mb-6">{post.subtitle}</p>
          )}

          <article
            className="rich-text-section prose max-w-none"
            dangerouslySetInnerHTML={{ __html: post.html_text }}
          />
        </div>
      </section>
    </>
  );
}
