import { useState, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const CLIENT_ID = "ee5e278a45544efd850a529f892bc1ed";
const CLIENT_SECRET = "a2690b3b58494987bf062fca1e06b0b1";

// Search Bar
const SearchBar = () => {
  const [accessToken, setAccessToken] = useState(""); // Store access token for Spotify API

  const [searchTerm, setSearchTerm] = useState(""); // Store user input from the search bar
  const [isDropdownVisible, setDropdownVisible] = useState(false); // State to control dropdown visibility
  const [loading, setLoading] = useState(false); // Loading state to show "Loading..." when fetching data
  const [searchResults, setSearchResults] = useState([]); // Store search results

  // Fetch Spotify API Access Token when the component mounts -----
  useEffect(() => {
    const fetchAccessToken = async () => {
      // API Access Token
      const authParameters = {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
      };

      // Request an access token from Spotify
      const response = await fetch(
        "https://accounts.spotify.com/api/token",
        authParameters
      );
      const data = await response.json();
      setAccessToken(data.access_token); // Save the access token
    };

    fetchAccessToken();
  }, []);
  // -----------------------------------------

  // Debounced search function to fetch results as the user types
  useEffect(() => {
    if (!searchTerm.trim()) {
      // If search input is empty, clear results and hide dropdown
      setSearchResults([]);
      setDropdownVisible(false);
      return;
    }

    // Delay API calls to prevent excessive requests while typing
    const delayDebounce = setTimeout(() => {
      search();
    }, 500); // 500ms debounce time

    return () => clearTimeout(delayDebounce); // Clear timeout on each input change
  }, [searchTerm]); // Run when searchTerm changes

  // Function to search for artists and fetch their albums
  const search = async () => {
    console.log(`Search for ${searchTerm}`);

    // Check if we got access token
    if (!accessToken) return; // Don't search if there's no access token
    setLoading(true); // Show loading state while fetching data

    try {
      // Spotify Search API: Look for songs (tracks), podcasts (shows), and audiobooks (episodes)
      const searchResponse = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(
          searchTerm
        )}&type=track,show,episode&limit=2`, // encodeURIComponent ensures search query is properly formatted (lo-fi beats -> lo-fi%20beats)
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const searchData = await searchResponse.json();

      // Extract results for each category
      const songs = searchData.tracks?.items || [];
      const podcasts = searchData.shows?.items || [];
      const audiobooks = searchData.episodes?.items || [];

      // Combine all results into a single array
      const combinedResults = [
        ...songs.map((item) => ({ type: "Song", ...item })),
        ...podcasts.map((item) => ({ type: "Podcast", ...item })),
        ...audiobooks.map((item) => ({ type: "Audiobook", ...item })),
      ];

      setSearchResults(combinedResults);
      setDropdownVisible(true);
    } catch (error) {
      console.error("Error fetching data: ", error);
      setSearchResults([]); // Clear results on error
    } finally {
      setLoading(false); // Hide loading state
    }
  };

  return (
    <div className="relative flex items-center w-2/3">
      {/* Search Input */}
      <div className="relative w-full">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-500" />
        <input
          type="text"
          placeholder="Search for Songs, Podcasts, Audiobooks..."
          className="w-full p-2 pl-10 rounded-full bg-gray-100 text-sm focus:outline-none"
          aria-label="Search bar for Songs, Podcasts, and Audiobooks"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value); // Update state as user types
          }}
          onBlur={() => setTimeout(() => setDropdownVisible(false), 200)} // Delay hiding dropdown to allow clicking results
        />
      </div>

      {/* Search Dropdown */}
      {isDropdownVisible && (
        <div className="absolute top-12 w-full bg-white shadow-lg rounded-lg max-h-60 overflow-y-auto border border-gray-200">
          {/* Show loading message while fetching results */}
          {loading ? (
            <p className="p-2 text-center text-gray-500">Loading...</p>
          ) : searchResults.length > 0 ? (
            // Display search results
            searchResults.map((result, index) => (
              <div
                key={index}
                className="p-2 hover:bg-gray-100 cursor-pointer text-sm flex items-center justify-between"
                onMouseDown={() => setSearchTerm(result.name)} // Update input when clicking result
              >
                {/* Left side: Image and Name */}
                <div className="flex items-center">
                  <img
                    src={
                      result.type === "track"
                        ? result.album?.images?.[0]?.url // Get image from album for tracks (songs)
                        : result.images?.[0]?.url || "/TrackifyLogo.PNG"
                    }
                    alt={result.name}
                    className="w-12 h-12 rounded-lg"
                  />
                  <div className="flex flex-col pl-4">
                    <p className="font-medium">{result.name}</p>
                    <p className="text-xs text-gray-500">
                      {result.type === "track" && result.artists[0]?.name}
                      {result.type === "show" && result.publisher}
                      {result.type === "episode" && result.show?.publisher}
                    </p>
                  </div>
                </div>

                {/* Right side: Result Type (Song/Podcast/Audiobook) */}
                <p className="text-sm text-gray-500">
                  {result.type === "track" && "Song"}
                  {result.type === "show" && "Podcast"}
                  {result.type === "episode" && "Audiobook"}
                </p>
              </div>
            ))
          ) : (
            // Show message if no results found
            <p className="p-2 text-center text-gray-500">No results found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
