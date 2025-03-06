"use client";

import { useState } from "react";
import NavBar from "@/components/navbar/navbar";
import { useRouter } from "next/navigation";
import { HeartIcon, PencilSquareIcon } from "@heroicons/react/24/outline";

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
      liked: true,
    },
    {
      id: 2,
      month: "Feb",
      day: "22",
      entertainment: "Podcast B",
      category: "Podcast",
      liked: false,
    },
    {
      id: 3,
      month: "Feb",
      day: "23",
      entertainment: "Audiobook C",
      category: "Audiobook",
      liked: false,
    },
    {
      id: 4,
      month: "Feb",
      day: "24",
      entertainment: "Song D",
      category: "Music",
      liked: true,
    },
    {
      id: 5,
      month: "Feb",
      day: "25",
      entertainment: "Podcast E",
      category: "Podcast",
      liked: false,
    },
  ]);

  const [filter, setFilter] = useState("All");

  // Handle like toggle
  const toggleLike = (id) => {
    setLogs(
      logs.map((log) => (log.id === id ? { ...log, liked: !log.liked } : log))
    );
  };

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
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#2D5C7C] text-white text-left">
              <th className="p-3">Month</th>
              <th className="p-3">Day</th>
              <th className="p-3">Entertainment</th>
              <th className="p-3">Category</th>
              <th className="p-3">Like</th>
              <th className="p-3">Edit</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map((log) => (
              <tr key={log.id} className="border-b">
                <td className="p-3">{log.month}</td>
                <td className="p-3">{log.day}</td>
                <td className="p-3">{log.entertainment}</td>
                <td className="p-3">{log.category}</td>
                <td className="p-3 text-center">
                  <button onClick={() => toggleLike(log.id)}>
                    {log.liked ? (
                      <HeartIcon className="w-5 h-5 text-red-500 fill-red-500" />
                    ) : (
                      <HeartIcon className="w-5 h-5 text-gray-500" />
                    )}
                  </button>
                </td>
                <td className="p-3 text-center">
                  <button
                    onClick={() => router.push(`/logdetails?id=${log.id}`)}
                  >
                    <PencilSquareIcon className="w-5 h-5 text-gray-700" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
