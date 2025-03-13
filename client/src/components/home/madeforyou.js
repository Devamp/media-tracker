import { useState, useEffect } from "react";

const MadeForYou = ({ accessToken }) => {
  const [musicPreferences, setMusicPreferences] = useState([]);
  const [genreIndex, setGenreIndex] = useState(0); // Track the current genre index
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(false);

  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 4;

  // Function to fetch music preferences from the server
  useEffect(() => {
    const fetchMusicPreferences = async () => {
      const token = sessionStorage.getItem("token");

      try {
        if (token) {
          const res = await fetch("http://localhost:5001/music-preferences", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });

          // Handle response
          if (res.ok) {
            const data = await res.json();
            if (data.musicPreferences) {
              setMusicPreferences(data.musicPreferences); // Set the music preferences
            } else {
              console.log("No music preferences found.");
            }
          } else {
            console.log("Failed to fetch music preferences");
          }
        }
      } catch (error) {
        console.log("Error fetching music preferences: ", error);
      }
    };

    fetchMusicPreferences();
  }, []);

  // Function to fetch tracks based on genre
  const fetchTracksByGenre = async (genre) => {
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=genre:${encodeURIComponent(
        genre
      )}&type=track&limit=4`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const data = await response.json();
    return data.tracks.items;
  };

  // Function to fetch music recommendations based on genre
  const fetchRecommendations = async (genre) => {
    setLoading(true);

    try {
      const fetchedTracks = await fetchTracksByGenre(genre);
      setTracks(fetchedTracks);
    } catch (error) {
      console.log("Error fetching tracks.");
    } finally {
      setLoading(false);
    }
  };

  // Call fetchRecommendation on component mount or when genre changes
  useEffect(() => {
    if (accessToken && musicPreferences.length > 0) {
      fetchRecommendations(musicPreferences[genreIndex]);
    } else {
      console.log("accessToken is not available yet or no music preferences.");
    }
  }, [genreIndex, accessToken, musicPreferences]); // Adding accessToken to the dependency array ensures it runs when accessToken changes

  // Function to go to the next set of items
  const nextItems = () => {
    if (startIndex + itemsPerPage < tracks.length) {
      setStartIndex(startIndex + itemsPerPage);
    } else {
      // Move to the next genre if current genre's items are exhausted
      if (genreIndex + 1 < musicPreferences.length) {
        setGenreIndex(genreIndex + 1);
        setStartIndex(0); // Reset startIndex when changing genres
      }
    }
  };

  // Function to go to the previous set of items
  const prevItems = () => {
    if (startIndex - itemsPerPage >= 0) {
      setStartIndex(startIndex - itemsPerPage);
    } else {
      // Move to the previous genre if the current genre's items are exhausted
      if (genreIndex - 1 >= 0) {
        setGenreIndex(genreIndex - 1);
        setStartIndex(0); // Reset startIndex when changing genres
      }
    }
  };

  console.log(musicPreferences);

  return (
    <div className="bg-white p-12 pt-5 relative">
      <h2 className="text-[#2d5c7c] text-2xl font-bold mb-4">Made for You</h2>

      <div className="relative flex items-center">
        {/* Left Arrow */}
        <button
          onClick={prevItems}
          disabled={startIndex === 0 && genreIndex === 0}
          className={`absolute left-[-25px] bg-[#2d5c7c] text-white w-12 h-12 flex items-center justify-center rounded-full shadow-md ${
            startIndex === 0 && genreIndex === 0
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-[#1e4b6a]"
          }`}
        >
          &#9665; {/* Left Arrow */}
        </button>

        {/* Item Grid */}
        <div className="grid grid-cols-4 gap-4 flex-1 mx-10">
          {loading ? (
            <div className="col-span-4 text-center text-gray-600">
              Loading...
            </div>
          ) : (
            tracks
              .slice(startIndex, startIndex + itemsPerPage)
              .map((track, index) => (
                <div
                  key={track.id}
                  className="bg-[#2d5c7c] h-32 pl-0 p-6 rounded-lg flex items-center"
                >
                  <img
                    src={track.album.images[0]?.url}
                    alt={track.name}
                    className="w-32 h-32 rounded-md"
                  />
                  <h3 className="pl-4 text-white text-left text-sm break-words font-bold mt-2">
                    {track.name}
                  </h3>
                </div>
              ))
          )}
        </div>

        {/* Right Arrow */}
        <button
          onClick={nextItems}
          disabled={
            startIndex + itemsPerPage >= tracks.length &&
            genreIndex === musicPreferences.length - 1
          }
          className={`absolute right-[-25px] bg-[#2d5c7c] text-white w-12 h-12 flex items-center justify-center rounded-full shadow-md ${
            startIndex + itemsPerPage >= tracks.length &&
            genreIndex === musicPreferences.length - 1
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-[#1e4b6a]"
          }`}
        >
          &#9655; {/* Right Arrow */}
        </button>
      </div>
    </div>
  );
};

export default MadeForYou;
