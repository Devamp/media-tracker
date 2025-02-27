"use client";

import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-r from-[#2d5c7c] to-[#356a8e] text-center px-6">
      <h1 className="text-white text-7xl font-bold mb-8">
        Welcome to Trackify 🎵
      </h1>
      <h3 className="text-white text-2xl mb-12 max-w-2xl leading-relaxed">
        Discover your next favorite song, podcast, or playlist! Log your media
        tastes, track what you love, and let Trackify recommend fresh,
        personalized content that matches your vibe. Dive into a world of endless discovery—your soundtrack starts here!
      </h3>
      <div className="flex space-x-4">
        <button
          onClick={() => router.push("/login")}
          className="px-6 py-3 bg-white text-[#2d5c7c] font-semibold rounded-lg shadow-lg hover:bg-gray-200 transition-all"
        >
          Login
        </button>
        <button
          onClick={() => router.push("/signup")}
          className="px-6 py-3 bg-black text-white font-semibold rounded-lg shadow-lg hover:bg-gray-800 transition-all"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}
