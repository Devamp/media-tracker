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
  const [music, setMusic] = useState([]); // Store albums results (albums for now - will change to songs later)

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
      setMusic([]);
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
      // First API call: Search for an artist by name
      const searchResponse = await fetch(
        `https://api.spotify.com/v1/search?q=${searchTerm}&type=artist`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const searchData = await searchResponse.json();

      // If no artists are found, clear results and show "No results"
      if (searchData.artists.items.length === 0) {
        setMusic([]);
        setDropdownVisible(true);
        setLoading(false);
        return;
      }

      // Get the first artist's ID (most relevant result)
      const artistID = searchData.artists.items[0].id;

      // Second API call: Fetch albums from the found artist
      const albumResponse = await fetch(
        `https://api.spotify.com/v1/artists/${artistID}/albums?include_groups=album&market=US&limit=5`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const albumData = await albumResponse.json();

      // Update music state with fetched album data
      setMusic(albumData.items || []);
      setDropdownVisible(true);
    } catch (error) {
      console.error("Error fetching data: ", error);
      setMusic([]); // Clear results on error
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
          ) : music?.length > 0 ? (
            // Display search results
            music.map((result, index) => (
              <div
                key={index}
                className="p-2 hover:bg-gray-100 cursor-pointer text-sm flex items-center"
                onMouseDown={() => setSearchTerm(result.name)} // Update input when clicking result
              >
                <img
                  src={
                    result.images?.[0]?.url ||
                    "../../../public/TrackifyLogo.PNG"
                  }
                  alt={result.name}
                  className="w-12 h-12 rounded-lg"
                />
                <p className="flex justify-center pl-4">{result.name}</p>
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
