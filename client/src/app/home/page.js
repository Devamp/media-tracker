import NavBar from "@/components/navbar";

export default function Home() {
    return (
      <div>
        <div>
          <NavBar />
        </div>
        <div>
        <button className="border">All</button>
        <button className="border">Music</button>
        <button className="border">Podcasts</button>
        <button className="border">Audiobooks</button>
        </div>
      </div>
    );
  }
  