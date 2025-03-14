"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function PodcastInterestsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selected, setSelected] = useState([]);
  const [musicPreferences, setMusicPreferences] = useState([]);
  const [audiobookPreferences, setAudiobookPreferences] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false); // Modal state
  const [userEmail, setUserEmail] = useState("");

  const genres = [
    "Technology",
    "Business",
    "Comedy",
    "Education",
    "Health & Fitness",
    "News",
    "Society & Culture",
    "True Crime",
    "Science",
    "History",
    "Sports",
    "Music",
    "Self-Improvement",
    "Politics",
    "Entertainment",
    "Spirituality",
  ];

  useEffect(() => {
    if (searchParams.has("email")) {
      setUserEmail(searchParams.get("email"));
    }
    if (searchParams.has("musicPreferences")) {
      setMusicPreferences(
        JSON.parse(decodeURIComponent(searchParams.get("musicPreferences")))
      );
    }
    if (searchParams.has("audiobookPreferences")) {
      setAudiobookPreferences(
        JSON.parse(decodeURIComponent(searchParams.get("audiobookPreferences")))
      );
    }
  }, [searchParams]);

  const toggleSelection = (genre) => {
    if (selected.includes(genre)) {
      setSelected((prev) => prev.filter((g) => g !== genre));
    } else if (selected.length < 4) {
      setSelected((prev) => [...prev, genre]);
    }
  };

  const handleSubmit = () => {
    if (selected.length === 4) {
      setShowConfirmation(true); // Show modal before navigating
    }
  };

  const confirmAndNavigate = () => {
    const userPreferences = {
      userEmail,
      musicPreferences,
      audiobookPreferences,
      podcastPreferences: selected,
    };

    fetch("http://localhost:5001/submit-preferences", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userPreferences),
    })
      .then(async (response) => {
        const data = await response.json();

        if (data.token) {
          sessionStorage.setItem("token", data.token); // store current token in session storage
          router.push("/home");
        }
      })
      .catch((error) => console.error("Error submitting preferences:", error));
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-white p-6">
      <div className="text-center w-full mb-8">
        <h2 className="text-3xl font-bold text-gray-900">
          Podcast Interests 🎧
        </h2>
        <p className="text-gray-600 text-lg">
          Let's find podcasts that match your interests!
        </p>
      </div>

      <div className="w-full flex justify-center">
        <div className="grid grid-cols-4 gap-4 w-3/4">
          {genres.map((genre) => (
            <button
              key={genre}
              className={`w-full py-4 rounded-lg text-lg font-medium transition-all ${
                selected.includes(genre)
                  ? "bg-[#145D7E] text-white"
                  : selected.length >= 4
                  ? "bg-[#E9E1E4] text-gray-500 cursor-not-allowed"
                  : "bg-[#E9E1E4] text-gray-700 hover:bg-gray-300"
              }`}
              onClick={() => toggleSelection(genre)}
              disabled={!selected.includes(genre) && selected.length >= 4}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      <div className="w-full flex justify-center mt-6">
        <button
          className={`px-8 py-3 rounded-lg text-lg font-semibold transition border-2 border-[#145D7E] ${
            selected.length === 4
              ? "bg-[#145D7E] text-white hover:bg-[#E9E1E4] hover:text-[#145D7E]"
              : "bg-[#E9E1E4] text-gray-500 cursor-not-allowed"
          }`}
          disabled={selected.length !== 4}
          onClick={handleSubmit}
        >
          Next
        </button>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center w-1/3">
            <h3 className="text-xl font-semibold">Selected Interests:</h3>

            {/* Combined Preferences Box */}
            <div className="mt-2 text-gray-700 text-lg border border-gray-300 rounded-lg p-4 bg-gray-100 text-left max-h-40 overflow-y-auto">
              <strong>🎵 Music:</strong> {musicPreferences.join(", ")} <br />
              <strong>📚 Audiobooks:</strong> {audiobookPreferences.join(", ")}{" "}
              <br />
              <strong>🎧 Podcasts:</strong> {selected.join(", ")}
            </div>

            <button
              className="mt-6 px-6 py-2 bg-[#145D7E] text-white rounded-lg w-full text-lg font-semibold"
              onClick={confirmAndNavigate}
            >
              Confirm & Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function PodcastInterests() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PodcastInterestsContent />
    </Suspense>
  );
}
