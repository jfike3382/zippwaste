"use client";
import { useState } from "react";
import BlogContent from "@/data/blog-content.json";

const categories = [
  { label: "All posts", icon: "📄" },
  { label: "For consumers", icon: "💰" },
  { label: "For businesses", icon: "🫰" },
  { label: "Zippwaste news", icon: "🫰" },
];

const BlogFilter = ({ onFilterChange }) => {
  const [activeCategory, setActiveCategory] = useState("All posts");

  // Calculate category statistics
  const categoryStats = categories.reduce((acc, { label }) => {
    if (label === "All posts") {
      acc[label] = BlogContent.length;
    } else {
      acc[label] = BlogContent.filter((post) => post.category === label).length;
    }
    return acc;
  }, {});

  const handleCategoryClick = (category) => {
    const newCategory = activeCategory === category ? "All posts" : category;
    setActiveCategory(newCategory);

    const filtered =
      newCategory === "All posts"
        ? BlogContent
        : BlogContent.filter((post) => post.category === newCategory);

    onFilterChange(filtered);
  };

  return (
    <div className="flex flex-col gap-2">
      {categories.map(({ label, icon }) => (
        <div key={label} className="flex flex-col gap-4">
          {label}
        </div>
      ))}
    </div>
  );
};

export default BlogFilter;
