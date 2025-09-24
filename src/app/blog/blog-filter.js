"use client";
import { useState } from "react";

const categories = [
  { label: "All posts", icon: "📄" },
  { label: "Zippwaste news", icon: "📢" },
  { label: "For businesses", icon: "💰" },
  { label: "For consumers", icon: "🙂" },
];

const BlogFilter = ({ onFilterChange, posts }) => {
  const [activeCategory, setActiveCategory] = useState("All posts");

  // Calculate category statistics from actual posts
  const categoryStats = categories.reduce((acc, { label }) => {
    if (label === "All posts") {
      acc[label] = posts.length;
    } else {
      acc[label] = posts.filter((post) => post.category === label).length;
    }
    return acc;
  }, {});

  const handleCategoryClick = (category) => {
    const newCategory = activeCategory === category ? "All posts" : category;
    setActiveCategory(newCategory);

    const filtered =
      newCategory === "All posts"
        ? posts
        : posts.filter((post) => post.category === newCategory);

    onFilterChange(filtered);
  };

  return (
    <div className="flex flex-col gap-2">
      {categories.map(({ label, icon }) => (
        <button
          key={label}
          onClick={() => handleCategoryClick(label)}
          className={`menu-item ${activeCategory === label ? "active" : ""}`}
        >
          <div className="flex items-center gap-2">
            <span>{icon}</span>
            <span>{label}</span>
          </div>
          <span className="text-sm text-secondary">
            {categoryStats[label] || 0}
          </span>
        </button>
      ))}
    </div>
  );
};

export default BlogFilter;
