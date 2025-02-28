import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import Home from "./page";

// server side compoenent to fetch JWT & user information
export default async function HomeLayout() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (!token) {
    return (
      <div>
        <p>No token found. Please log in.</p>
      </div>
    );
  }

  try {
    const decoded = jwt.verify(
      token.value,
      "bBGIn68xpGu0k1LP0HFleWEculQqZEmK23ZGNGjYegA"
    );

    return <Home user={decoded} />;
  } catch (error) {
    console.error("JWT verification failed:", error); // Log error for debugging
    return (
      <div>
        <p>Token is invalid. Please log in again.</p>
      </div>
    );
  }
}
