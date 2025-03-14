"use client";

import MusicPref from "./music/page";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function OnboardingContent() {
  const searchParams = useSearchParams();
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    if (searchParams.has("email")) {
      setUserEmail(searchParams.get("email"));
    }
  }, [searchParams]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <MusicPref userEmail={userEmail} /> {}
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OnboardingContent />
    </Suspense>
  );
}
