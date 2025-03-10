"use client";

import { useState } from "react";
import NavBar from "@/components/navbar/navbar";
import { useRouter } from "next/navigation";

export default function LogTablePage() {
  const router = useRouter();

  // Sample log data (Replace this with actual data from state or backend)
  const [logs, setLogs] = useState([
    {
      id: 1,
      month: "Feb",
      day: "21",
      entertainment: "Song A",
      category: "Music",
      image: "/placeholder-image.png", // Replace with actual image URL
    },
    {
      id: 2,
      month: "Feb",
      day: "22",
      entertainment: "Podcast B",
      category: "Podcast",
      image: "/placeholder-image.png",
    },
    {
      id: 3,
      month: "Feb",
      day: "23",
      entertainment: "Audiobook C",
      category: "Audiobook",
      image: "/placeholder-image.png",
    },
    {
      id: 4,
      month: "Feb",
      day: "24",
      entertainment: "Song D",
      category: "Music",
      image: "/placeholder-image.png",
    },
    {
      id: 5,
      month: "Feb",
      day: "25",
      entertainment: "Podcast E",
      category: "Podcast",
      image: "/placeholder-image.png",
    },
  ]);

  const [filter, setFilter] = useState("All");

  // Filter logs based on selected category
  const filteredLogs = logs.filter(
    (log) => filter === "All" || log.category === filter
  );

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-[#2D5C7C]">
      {/* Navbar */}
      <NavBar />

      {/* Filter Buttons */}
      <div className="flex space-x-4 mt-6">
        {["All", "Music", "Podcasts", "Audiobooks"].map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-full text-white font-medium ${
              filter === category ? "bg-[#1E3A5F]" : "bg-gray-500"
            }`}
            onClick={() => setFilter(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Log Table */}
      <div className="bg-gray-200 p-6 rounded-lg mt-6 w-4/5 shadow-md">
        <table className="w-full border-collapse table-fixed">
          <thead>
            <tr className="bg-[#2D5C7C] text-white text-center">
              <th className="p-3 w-1/5">Image</th>
              <th className="p-3 w-1/5">Month</th>
              <th className="p-3 w-1/5">Day</th>
              <th className="p-3 w-1/5">Entertainment</th>
              <th className="p-3 w-1/5">Category</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map((log) => (
              <tr key={log.id} className="border-b text-center">
                {/* Image Column */}
                <td className="p-3">
                  <img
                    src={log.image}
                    alt="Audio Thumbnail"
                    className="w-16 h-16 object-cover rounded-md mx-auto"
                  />
                </td>
                <td className="p-3">{log.month}</td>
                <td className="p-3">{log.day}</td>
                <td className="p-3">{log.entertainment}</td>
                <td className="p-3">{log.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
