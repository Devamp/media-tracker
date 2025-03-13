import { useState, useEffect } from "react";

export default function HomePanel() {
  const [recentMusic, setRecentMusic] = useState([]);
  const [recentPodcasts, setRecentPodcasts] = useState([]);
  const [recentAudiobooks, setRecentAudiobooks] = useState([]);

  useEffect(() => {
    // Fetch the most recent media (music, podcasts, and audiobooks) from the backend
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

          // Process and filter the logs for recent music, podcasts, and audiobooks
          const music = data.response.filter(
            (log) => log.mediaCategory === "Music"
          );
          const podcasts = data.response.filter(
            (log) => log.mediaCategory === "Podcast"
          );
          const audiobooks = data.response.filter(
            (log) => log.mediaCategory === "Audiobook"
          );

          // Sort by date (newest first)
          const sortedMusic = music.sort(
            (a, b) => new Date(b.date) - new Date(a.date)
          );
          const sortedPodcasts = podcasts.sort(
            (a, b) => new Date(b.date) - new Date(a.date)
          );
          const sortedAudiobooks = audiobooks.sort(
            (a, b) => new Date(b.date) - new Date(a.date)
          );

          // Get the most recent entries
          setRecentMusic(sortedMusic.slice(0, 3)); // Limit to top 3 most recent music
          setRecentPodcasts(sortedPodcasts.slice(0, 3)); // Limit to top 3 most recent podcasts
          setRecentAudiobooks(sortedAudiobooks.slice(0, 5)); // Limit to top 5 most recent audiobooks
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
      <div className="flex flex-col gap-6 w-3/6">
        {/* Top Artist */}
        <div className="bg-[#2d5c7c] p-4 rounded-lg text-center flex-1">
          <h2 className="text-white font-bold mb-4 text-xl">Recent Music</h2>
          {recentMusic.length > 0 ? (
            recentMusic.map((item) => (
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
            ))
          ) : (
            <p className="text-white">No items available</p>
          )}
        </div>

        {/* Recent Podcasts */}
        <div className="bg-[#2d5c7c] p-4 rounded-lg text-center flex-1">
          <h2 className="text-white font-bold mb-4 text-xl">Recent Podcasts</h2>
          {recentPodcasts.length > 0 ? (
            recentPodcasts.map((item) => (
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
            ))
          ) : (
            <p className="text-white">No items available</p>
          )}
        </div>
      </div>

      {/* Right Section - Recent Audiobooks */}
      <div className="w-3/6 bg-[#2d5c7c] p-4 rounded-lg text-center flex-1">
        <h2 className="text-white font-bold mb-5 text-xl">Recent Audiobooks</h2>
        {recentAudiobooks.length > 0 ? (
          recentAudiobooks.map((item) => (
            <div
              key={item._id}
              className="bg-white h-20 pl-0 p-3 rounded-lg mb-5 flex items-center"
            >
              <img
                src={item.mediaImage}
                alt={item.mediaName}
                className="w-20 h-20 rounded"
              />
              <h3 className="pl-4 text-left break-words">{item.mediaName}</h3>
            </div>
          ))
        ) : (
          <p className="text-white">No items available</p>
        )}
      </div>
    </div>
  );
}
