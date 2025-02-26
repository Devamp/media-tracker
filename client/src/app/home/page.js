"use client";

import MadeForYou from "@/components/madeforyou";
import NavBar from "@/components/navbar";
import { useState } from "react";

// Category Buttons
const category = ["All", "Music", "Podcasts", "Audiobooks"];

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
      <div className="bg-white p-8 flex gap-6">
        {/* Left Section */}
        <div className="flex flex-col gap-6 w-2/3">
          {/* Top Artist */}
          <div className="bg-[#2d5c7c] p-6 rounded-lg text-center flex-1">
            <h2 className="text-white font-bold mb-4 text-xl">Top Artist</h2>
            <div className="flex justify-center gap-10 mt-4">
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="bg-gray-300 rounded-full w-16 h-16"
                ></div>
              ))}
            </div>
          </div>

          {/* Recent Podcasts */}
          <div className="bg-[#2d5c7c] p-6 rounded-lg text-center flex-1">
            <h2 className="text-white font-bold mb-4 text-xl">Recent Podcasts</h2>
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-white p-4 rounded-lg mb-2"
              >
                <div className="w-full h-10 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Section - Top Audiobooks */}
        <div className="w-1/3 bg-[#2d5c7c] p-6 rounded-lg text-center flex-1">
          <h2 className="text-white font-bold mb-8 text-xl">Top Audiobooks</h2>
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg mb-4 flex items-center justify-between"
            >
              <div className="w-16 h-16 bg-gray-200 rounded"></div>
              <div className="flex gap-2">      
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
