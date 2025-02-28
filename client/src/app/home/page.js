"use client";

import CategoryButtons from "@/components/home/categoryButtons";
import ContentGrid from "@/components/home/contentGrid";
import MadeForYou from "@/components/home/madeforyou";
import HomePanel from "@/components/home/homePanel";
import { useState } from "react";

// Category Buttons
const category = ["All", "Music", "Podcasts", "Audiobooks"];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <div className="bg-[#2d5c7c] min-h-screen">
      {/* Category Buttons */}
      <CategoryButtons
        category={category}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* Content Grid */}
      <ContentGrid selectedCategory={selectedCategory} />

      {/* Made for You Section */}
      <MadeForYou items={new Array(10).fill({})} />

      <HomePanel />
    </div>
  );
}
