"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import NavBar from "@/components/navbar/navbar";
import { Loader2 } from "lucide-react";

function LogDetailsContent() {
  const searchParams = useSearchParams();
  const nameQuery = searchParams.get("name") || "Unknown";
  const categoryQuery = searchParams.get("category") || "track";
  const imageQuery = searchParams.get("image") || "";

  const router = useRouter();
  const [date, setDate] = useState(
    () => new Date().toISOString().split("T")[0]
  );
  const [category, setCategory] = useState(""); // Default category
  const [wasLogSaved, setWasLogSaved] = useState(true);
  const [isLoading, setIsLoading] = useState(false); // state to hold login processing
  const access_token = sessionStorage.getItem("access-token");


  // Map query values to category values
  const categoryMapping = {
    track: "Music",
    show: "Podcast",
    episode: "Audiobook",
  };

  // Update the category in state if query changes
  useEffect(() => {
    const mappedCategory = categoryMapping[categoryQuery] || "Music"; // Default to "Music" if not found
    setCategory(mappedCategory);
  }, [categoryQuery]);

  // push the client-side log data to the server and save in DB
  const handleSave = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    const userData = sessionStorage.getItem("userData");

    if (!userData) {
      console.error("User Data not found");
    }

    const logEntry = {
      userData,
      nameQuery,
      imageQuery,
      category,
      date,
    };

    try {
      const res = await fetch("http://localhost:5001/insert-log", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(logEntry),
      });

      // error handling
      if (res.status === 401 || res.status === 403) {
        console.log("Error publishing log");
      }

      // process response after 1.5 seconds
      setTimeout(async () => {
        if (res.ok) {
          // Navigate to logtable page after saving
          router.push("/logtable");
        } else {
          setWasLogSaved(false);
          console.log("Something went wrong.");
        }
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      console.error("Error inserting log for current user:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-[#2D5C7C]">
      {/* NavBar */}
      <NavBar accessToken={access_token}/>

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
          I listened to: {nameQuery}
        </h1>

        <div className="flex space-x-6">
          {/* Image Placeholder */}
          {imageQuery ? (
            <img
              src={imageQuery}
              alt={nameQuery}
              className="w-40 h-40 bg-gray-300 rounded-lg border border-gray-500"
            />
          ) : (
            <div className="w-40 h-40 bg-gray-300 rounded-lg border border-gray-500"></div>
          )}

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
          </div>
        </div>

        {!wasLogSaved ? (
          <div className="flex flex-row justify-center">
            <p className="ml-2 text-red-500">
              ERROR: Something went wrong trying to save your log.
            </p>
          </div>
        ) : null}

        {/* Save Button */}
        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            className={`bg-[#2D5C7C] text-white px-6 py-3 rounded-lg font-bold ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "hover:bg-[#356a8e]"
            }`}
            disabled={isLoading}
            onClick={handleSave}
          >
            {isLoading ? (
              <div className="flex flex-row justify-center">
                <Loader2 className="animate-spin" size={24} />
                <p className="ml-2 ">Saving...</p>
              </div>
            ) : (
              "Save"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function LogDetailsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LogDetailsContent />
    </Suspense>
  );
}