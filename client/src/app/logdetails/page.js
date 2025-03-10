"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import NavBar from "@/components/navbar/navbar";

export default function LogDetailsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Fetch details from URL parameters (if available)
  const [audioName, setAudioName] = useState(searchParams.get("name") || "");
  const [image, setImage] = useState(
    searchParams.get("image") || "/placeholder.jpg"
  );
  const [category, setCategory] = useState(
    ["Music", "Podcast", "Audiobook"].includes(searchParams.get("category"))
      ? searchParams.get("category")
      : "Music"
  );
  const [date, setDate] = useState("");

  // Save log details (this can be later sent to a backend)
  const handleSave = () => {
    const logEntry = {
      audioName,
      date,
      category,
      image,
    };

    console.log("Log Entry Saved:", logEntry);

    // Simulate storing in localStorage (can be replaced with backend storage)
    const savedLogs = JSON.parse(localStorage.getItem("logs")) || [];
    savedLogs.push(logEntry);
    localStorage.setItem("logs", JSON.stringify(savedLogs));

    // Navigate to logtable after saving
    router.push("/logtable");
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-[#2D5C7C]">
      {/* NavBar */}
      <NavBar />

      {/* Main Container */}
      <div className="bg-gray-200 p-8 rounded-lg mt-10 w-3/4 shadow-md">
        {/* Back Button (Now redirects to Home Page) */}
        <button
          className="bg-[#2d5c7c] text-white px-4 py-2 rounded-lg font-bold mb-4"
          onClick={() => router.push("/home")}
        >
          Back
        </button>

        {/* Title */}
        <h1 className="text-[#2D5C7C] text-3xl font-bold mb-4">
          I listened to...
        </h1>

        {/* Audio Name Input */}
        <div className="mb-4">
          <label className="text-[#2D5C7C] font-medium">Audio Name:</label>
          <input
            type="text"
            value={audioName}
            readOnly
            className="w-full p-2 mt-1 border rounded-md bg-gray-100"
          />
        </div>

        <div className="flex space-x-6">
          {/* Image Preview */}
          <div className="w-40 h-40 flex items-center justify-center bg-gray-300 rounded-lg border border-gray-500">
            <img
              src={image}
              alt="Audio Thumbnail"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

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

            {/* Category Selection - Now a dropdown with only 3 options */}
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
          </div>
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
