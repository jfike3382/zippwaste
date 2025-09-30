"use client";

import { useState } from "react";
import BlogFilter from "./blog-filter";
import BlogItem from "./blog-item";
import Selector from "@/uikit/selector";

export default function PageWrapper({ posts }) {
  const [displayedPosts, setDisplayedPosts] = useState(posts);
  const [selectedCategory, setSelectedCategory] = useState("");

  // Get unique categories from posts
  const categories = [...new Set(posts.map((post) => post.category))];
  const categoryOptions = [
    { label: "All posts", value: "" },
    ...categories.map((cat) => ({ label: cat, value: cat })),
  ];

  const handleMobileFilterChange = (category) => {
    setSelectedCategory(category);
    if (category === "" || category === "All posts") {
      setDisplayedPosts(posts);
    } else {
      setDisplayedPosts(posts.filter((post) => post.category === category));
    }
  };

  return (
    <div className="flex flex-row flex-1 ">
      <aside className="sidebar-container">
        <BlogFilter onFilterChange={setDisplayedPosts} posts={posts} />
      </aside>
      <div className="main-data-right-container">
        <div className="flex flex-col gap-4">
          <p className="title-l">Blog</p>
          <p className="paragraph-l">
            News, posts, insights, and tips from Zippwaste team
          </p>
          <div className="desktop-hidden">
            <Selector
              value={selectedCategory}
              onChange={handleMobileFilterChange}
              options={categoryOptions}
              placeholder="All posts"
            />
          </div>
        </div>

        {displayedPosts.map((blogpost, index) => (
          <BlogItem key={index} blogpost={blogpost} />
        ))}
      </div>
    </div>
  );
}
