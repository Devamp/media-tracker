"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import NavBar from "@/components/navbar";

export default function LogDetailsPage() {
  const router = useRouter();
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("Music"); // Default category
  const [liked, setLiked] = useState(false);
  const [review, setReview] = useState("");

  const handleSave = () => {
    const logEntry = {
      date,
      category,
      liked,
      review,
    };
    console.log("Log Entry Saved:", logEntry);
    // Later, this can be sent to a database
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-[#2D5C7C]">
      {/* NavBar */}
      <NavBar />

      {/* Main Container */}
      <div className="bg-gray-200 p-8 rounded-lg mt-10 w-3/4 shadow-md">
        {/* Back Button (Linked to /log) */}
        <button
          className="bg-[#2d5c7c] text-white px-4 py-2 rounded-lg font-bold mb-4"
          onClick={() => router.push("/log")}
        >
          Back
        </button>

        {/* Title */}
        <h1 className="text-[#2D5C7C] text-3xl font-bold mb-4">
          I listened to...
        </h1>

        <div className="flex space-x-6">
          {/* Image Placeholder */}
          <div className="w-40 h-40 bg-gray-300 rounded-lg border border-gray-500"></div>

          {/* Details Section */}
          <div className="flex flex-col space-y-3 w-full">
            {/* Date Selection */}
            <label className="text-[#2D5C7C] font-medium">Date:</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2D5C7C]"
            />

            {/* Category Selection */}
            <label className="text-[#2D5C7C] font-medium">Category:</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2D5C7C]"
            >
              <option value="Music">Music</option>
              <option value="Podcast">Podcast</option>
              <option value="Audiobook">Audiobook</option>
            </select>

            {/* Like Button (Smaller & Centered) */}
            <div className="flex justify-center mt-4">
              <button
                className={`px-3 py-1 rounded-md text-sm font-semibold transition ${
                  liked ? "bg-red-500 text-white" : "bg-gray-300 text-gray-700"
                }`}
                onClick={() => setLiked(!liked)}
              >
                {liked ? "♥ Liked" : "♡ Like"}
              </button>
            </div>
          </div>
        </div>

        {/* Review Section */}
        <div className="mt-6">
          <label className="text-[#2D5C7C] font-medium">Add a Review:</label>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Write your review..."
            className="w-full p-3 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2D5C7C] h-28"
          ></textarea>
        </div>

        {/* Save Button */}
        <div className="mt-6 flex justify-end">
          <button
            className="bg-[#2D5C7C] text-white px-6 py-3 rounded-lg font-bold"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
