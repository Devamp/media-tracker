"use client";
import { useState } from "react";

export default function PodcastInterests() {
  const genres = [
    "Technology",
    "Business",
    "Comedy",
    "Education",
    "Health & Fitness",
    "News",
    "Society & Culture",
    "True Crime",
    "Science",
    "History",
    "Sports",
    "Music",
    "Self-Improvement",
    "Politics",
    "Entertainment",
    "Spirituality",
  ];

  const [selected, setSelected] = useState([]);

  const toggleSelection = (genre) => {
    if (selected.includes(genre)) {
      setSelected((prev) => prev.filter((g) => g !== genre));
    } else if (selected.length < 4) {
      setSelected((prev) => [...prev, genre]);
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-white p-6">
      <div className="text-center w-full mb-8">
        <h2 className="text-3xl font-bold text-gray-900 flex items-center justify-center">
          Podcast Interests 🎧
        </h2>
        <p className="text-gray-600 text-lg text-center">
          Let's find podcasts that match your interests!
        </p>
      </div>

      {}
      <div className="w-full flex justify-center">
        <div className="grid grid-cols-4 gap-4 w-3/4">
          {genres.map((genre) => (
            <button
              key={genre}
              className={`w-full py-4 rounded-lg text-lg font-medium transition-all ${
                selected.includes(genre)
                  ? "bg-[#145D7E] text-white"
                  : selected.length >= 4
                  ? "bg-[#E9E1E4] text-gray-500 cursor-not-allowed"
                  : "bg-[#E9E1E4] text-gray-700 hover:bg-gray-300"
              }`}
              onClick={() => toggleSelection(genre)}
              disabled={!selected.includes(genre) && selected.length >= 4}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      {}
      <div className="w-full flex justify-center mt-6">
        <button
          className={`px-8 py-3 rounded-lg text-lg font-semibold transition border-2 border-[#145D7E] ${
            selected.length === 4
              ? "bg-[#145D7E] text-white hover:bg-[#E9E1E4] hover:text-[#145D7E]"
              : "bg-[#E9E1E4] text-gray-500 cursor-not-allowed"
          }`}
          disabled={selected.length !== 4}
          onClick={() => alert(`Selected Interests: ${selected.join(", ")}`)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
