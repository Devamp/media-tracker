"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function LogPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // Example data - replace with API calls later
  const sampleData = [
    { id: 1, name: "Song One", type: "Music" },
    { id: 2, name: "Podcast Episode", type: "Podcast" },
    { id: 3, name: "Audiobook Chapter", type: "Audiobook" },
  ];

  // Handle search input change
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value) {
      setSearchResults(
        sampleData.filter((item) =>
          item.name.toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
    } else {
      setSearchResults([]);
    }
  };

  // Navigate to log details page when a song/podcast/audiobook is clicked
  const handleItemClick = (item) => {
    router.push(`/logdetails?id=${item.id}&type=${item.type}`);
  };

  return (
    <div className="flex flex-col mt-28 items-center w-full min-h-screen bg-[#2D5C7C]">
      {/* Main Section */}
      <div className="text-center">
        <h1 className="text-white text-4xl font-bold flex items-center justify-center">
          Add to Your List ✅
        </h1>
        <p className="text-gray-300 text-lg mt-2">
          Search for all the audio entertainment
        </p>
      </div>

      {/* Search Bar Section */}
      <div className="bg-gray-200 p-8 rounded-lg mt-8 w-3/4 max-w-2xl shadow-md">
        <div className="flex items-center bg-white px-4 py-3 rounded-full">
          <MagnifyingGlassIcon className="size-5 text-gray-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search for Songs, Podcasts, Audiobooks..."
            className="w-full p-2 pl-4 text-gray-700 focus:outline-none"
            aria-label="Search bar for Songs, Podcasts, and Audiobooks"
          />
        </div>
      </div>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="bg-gray-100 p-4 mt-4 rounded-lg shadow-md w-3/4 max-w-2xl">
          <ul>
            {searchResults.map((item) => (
              <li
                key={item.id}
                className="p-3 bg-white rounded-md my-2 shadow-sm hover:bg-gray-200 cursor-pointer"
                onClick={() => handleItemClick(item)}
              >
                {item.name} - <span className="text-gray-500">{item.type}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
