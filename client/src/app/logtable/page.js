"use client";

import { useEffect, useState } from "react";
import NavBar from "@/components/navbar/navbar";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

// function to format the date according to log table
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const month = date.toLocaleString("default", { month: "short" });
  const day = date.getDate();
  return { month, day };
};

export default function LogTablePage() {
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    // Ensure we are running in the client-side before accessing sessionStorage
    if (typeof window !== "undefined") {
      setAccessToken(sessionStorage.getItem("access-token"));
    }
  }, []);

  // Filter logs based on selected category
  const filteredLogs = logs.filter(
    (log) => filter === "All" || log.category === filter
  );

  // on component load, fetch all user logs
  useEffect(() => {
    const fetchLogs = async () => {
      const token = sessionStorage.getItem("token");

      try {
        if (token) {
          const res = await fetch("http://localhost:5001/user-logs", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });

          // error handling
          if (res.status === 401 || res.status === 403) {
            console.log("Error publishing log");
          }

          // process response after 1.5 seconds
          setTimeout(async () => {
            if (res.ok) {
              const data = await res.json();

              const formattedLogs = data.response.map((log) => {
                const { month, day } = formatDate(log.date);
                return {
                  id: log._id,
                  month: month,
                  day: day.toString(),
                  entertainment: log.mediaName,
                  category: log.mediaCategory,
                  image: log.mediaImage,
                };
              });

              setLogs(formattedLogs);
            } else {
              console.log("Something went wrong.");
            }
            setIsLoading(false); // Stop loader after fetching
          }, 1500);
        }
      } catch (error) {
        console.error("Error inserting log for current user:", error);
        setIsLoading(false); // Stop loader on error
      }
    };

    fetchLogs();
  }, []);

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-[#2D5C7C]">
      {/* Navbar */}
      <NavBar accessToken={accessToken} />

      {/* Filter Buttons */}
      <div className="flex space-x-4 mt-24">
        {" "}
        {["All", "Music", "Podcast", "Audiobook"].map((category) => (
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
        {isLoading ? (
          <div className="flex flex-col justify-center items-center">
            <Loader2 className="animate-spin text-[#1E3A5F]" size={40} />
            <h2 className="text-bold text-lg">Loading your log...</h2>
          </div>
        ) : (
          <table className="w-full border-collapse table-fixed">
            <thead>
              <tr className="bg-[#2D5C7C] text-white text-center">
                <th className="p-3 w-1/5">Image</th>
                <th className="p-3 w-1/5">Month</th>
                <th className="p-3 w-1/5">Day</th>
                <th className="p-3 w-1/5">Media Name</th>
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
        )}
      </div>
    </div>
  );
}
