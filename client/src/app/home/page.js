"use client";

import CategoryButtons from "@/components/home/categoryButtons";
import ContentGrid from "@/components/home/contentGrid";
import MadeForYou from "@/components/home/madeforyou";
import HomePanel from "@/components/home/homePanel";
import { useState, useEffect } from "react";
import NavBar from "@/components/navbar/navbar";

// Spotify API's ID and SECRET
const CLIENT_ID = "ee5e278a45544efd850a529f892bc1ed";
const CLIENT_SECRET = "a2690b3b58494987bf062fca1e06b0b1";

// Category Buttons
const category = ["All", "Music", "Podcast", "Audiobook"];

export default function Home() {
  const [accessToken, setAccessToken] = useState(""); // Store access token for Spotify API
  const [selectedCategory, setSelectedCategory] = useState("All"); // for updating the category in the content grid

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
      sessionStorage.setItem("access-token", data.access_token);
    };

    fetchAccessToken();
  }, []);
  // -----------------------------------------

  return (
    <div className="bg-[#2d5c7c] min-h-screen">
      {/* NavBar */}
      <NavBar accessToken={accessToken} />

      {/* Category Buttons */}
      <CategoryButtons
        category={category}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* Content Grid */}
      <ContentGrid selectedCategory={selectedCategory} />

      {/* Made for You Section */}
      <MadeForYou accessToken={accessToken} />

      <HomePanel />
    </div>
  );
}
