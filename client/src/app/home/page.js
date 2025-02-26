"use client";

import MadeForYou from "@/components/home/madeforyou";
import NavBar from "@/components/navbar";
import HomePanel from "@/components/home/homePanel";
import { useState } from "react";

// Category Buttons
const category = ["All", "Music", "Podcasts", "Audiobooks"];

// Category Images
const categoryImage = [];

// Top Artist Images
const topArtistImage = [];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <div className="bg-[#2d5c7c] min-h-screen">
      {/* Navbar */}
      <NavBar />

      {/* Category Buttons */}
      <div className="bg-[#2d5c7c] pl-12 p-8 flex space-x-4">
        {category.map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-full font-medium ${
              selectedCategory === category
                ? "bg-white text-[#2d5c7c]" // Active Button
                : "bg-[#60849b] text-white hover:bg-[#27506c]" // Default Button
            } `}
            onClick={() => setSelectedCategory(category)} // Update the state on click to selected category
          >
            {category}
          </button>
        ))}
      </div>

      {/* Content Grid */}
      <div className="bg-[#2d5c7c] p-12 pt-0 grid grid-cols-3 gap-x-12 gap-y-6">
        {Array(6)
          .fill()
          .map((_, index) => (
            <div key={index} className="bg-white h-20 rounded-lg">
              <span className="font-medium flex justify-center">
                {selectedCategory}
              </span>
            </div>
          ))}
      </div>

      {/* Made for You Section */}
      <MadeForYou items={new Array(10).fill({})} />

      {/* Top Artist, Recent Podcasts, and Top Audiobooks Section */}
      <HomePanel />
    </div>
  );
}
