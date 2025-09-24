"use client";

import { useState } from "react";
import BlogFilter from "./blog-filter";
import BlogItem from "./blog-item";

export default function PageWrapper({ posts }) {
  const [displayedPosts, setDisplayedPosts] = useState(posts);

  return (
    <div className="flex flex-row flex-1 ">
      <aside className="sidebar-container">
        <BlogFilter onFilterChange={setDisplayedPosts} posts={posts} />
      </aside>
      <div className="main-data-right-container">
        <div className="flex flex-col gap-4">
          <p className="title-l">Blog</p>{" "}
          <p className="paragraph-l">
            News, posts, insights, and tips from Zippwaste team
          </p>
        </div>
        {displayedPosts.map((blogpost, index) => (
          <BlogItem key={index} blogpost={blogpost} />
        ))}
      </div>
    </div>
  );
}
