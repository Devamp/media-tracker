import { useState, useEffect } from "react";

const artists = [
  {
    id: 1,
    name: "Taylor Swift",
    img: "https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676",
  },
  {
    id: 2,
    name: "Lady Gaga",
    img: "https://i.scdn.co/image/ab6761610000e5ebaadc18cac8d48124357c38e6",
  },
  {
    id: 3,
    name: "Ariana Grande",
    img: "https://i.scdn.co/image/ab6761610000e5eb40b5c07ab77b6b1a9075fdc0",
  },
  {
    id: 4,
    name: "Bruno Mars",
    img: "https://i.scdn.co/image/ab6761610000e5ebc36dd9eb55fb0db4911f25dd",
  },
];

const podcasts = [
  {
    id: 1,
    name: "TED Talks Daily",
    img: "https://i.scdn.co/image/ab6765630000ba8a1eef8dcabec3dca77ace07c8",
  },
  {
    id: 2,
    name: "Learning Easy English",
    img: "https://i.scdn.co/image/ab6765630000ba8a5ddbeecc590a066fd7dbb27b",
  },
  {
    id: 3,
    name: "Learning English Conversations",
    img: "https://i.scdn.co/image/ab6765630000ba8a947e831094641e0163c74535",
  },
];

const audiobooks = [
  {
    id: 1,
    name: "Atomic Habits (James Clear)",
    img: "https://i.scdn.co/image/ab6765630000ba8a9ed8fa6c5d3681b214776bf3",
  },
  {
    id: 2,
    name: "Thinking, Fast & Slow (Daniel Kahneman)",
    img: "https://i.scdn.co/image/ab6765630000ba8a822fec292cf7237ecfb8437c",
  },
  {
    id: 3,
    name: "12 Rules for Life (Jordan B. Peterson)",
    img: "https://i.scdn.co/image/ab6765630000ba8afada17ad64aae7c4ecb9cf39",
  },
  {
    id: 4,
    name: "Deep Work (Cal Newport)",
    img: "https://i.scdn.co/image/ab6765630000ba8abbdbf539dc876b0f5e964e9d",
  },
];

export default function HomePanel() {
  const [recentPodcasts, setRecentPodcasts] = useState([]);
  const [recentAudiobooks, setRecentAudiobooks] = useState([]);

  useEffect(() => {
    // Fetch the most recent media (podcasts and audiobooks) from the backend
    const fetchData = async () => {
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

          // Error handling
          if (res.status === 401 || res.status === 403) {
            console.log("Error fetching logs");
            return;
          }

          // Get data from the response
          const data = await res.json();

          // Process and filter the logs for recent podcasts and audiobooks
          const podcasts = data.response.filter(
            (log) => log.mediaCategory === "Podcast"
          );
          const audiobooks = data.response.filter(
            (log) => log.mediaCategory === "Audiobook"
          );

          // Sort by date (newest first)
          const sortedPodcasts = podcasts.sort(
            (a, b) => new Date(b.date) - new Date(a.date)
          );
          const sortedAudiobooks = audiobooks.sort(
            (a, b) => new Date(b.date) - new Date(a.date)
          );

          // Get the most recent entries
          setRecentPodcasts(sortedPodcasts.slice(0, 3)); // Limit to top 3 most recent podcasts
          setRecentAudiobooks(sortedAudiobooks.slice(0, 4)); // Limit to top 4 most recent audiobooks
        }
      } catch (err) {
        console.error("Error fetching logs:", err);
      }
    };

    fetchData();
  }, []); // Run this effect only once when the component mounts

  return (
    <div className="bg-white p-8 flex gap-6">
      {/* Left Section */}
      <div className="flex flex-col gap-6 w-3/5">
        {/* Top Artist */}
        <div className="bg-[#2d5c7c] p-4 rounded-lg text-center flex-1">
          <h2 className="text-white font-bold mb-4 text-xl">Top Artist</h2>
          <div className="flex justify-center gap-6 mt-4">
            {artists.map((item) => (
              <div key={item.id} className="flex flex-col items-center">
                <img
                  src={item.img}
                  alt={item.name}
                  className="rounded-full w-14 h-14"
                />
                <h3 className="text-white mt-1">{item.name}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Podcasts */}
        <div className="bg-[#2d5c7c] p-4 rounded-lg text-center flex-1">
          <h2 className="text-white font-bold mb-4 text-xl">Recent Podcasts</h2>
          {recentPodcasts.map((item) => (
            <div
              key={item._id}
              className="flex items-center bg-white pl-0 px-3 py-2 rounded-lg mb-3 w-4/5 h-14 mx-auto"
            >
              <img
                src={item.mediaImage}
                alt={item.mediaName}
                className="w-14 h-14 rounded"
              />
              <h3 className="pl-4">{item.mediaName}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Right Section - Recent Audiobooks */}
      <div className="w-2/5 bg-[#2d5c7c] p-4 rounded-lg text-center flex-1">
        <h2 className="text-white font-bold mb-4 text-xl">Recent Audiobooks</h2>
        {recentAudiobooks.map((item) => (
          <div
            key={item._id}
            className="bg-white h-20 pl-0 p-3 rounded-lg mb-3 flex items-center"
          >
            <img
              src={item.mediaImage}
              alt={item.mediaName}
              className="w-20 h-20 rounded"
            />
            <h3 className="pl-4 text-left break-words">{item.mediaName}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
