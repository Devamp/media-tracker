"use client";

import MusicPref from "./music/page";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const searchParams = useSearchParams();
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    if (searchParams.has("email")) {
      setUserEmail(searchParams.get("email"));
    }
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <MusicPref userEmail={userEmail} /> {}
    </div>
  );
}
