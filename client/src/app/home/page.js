import NavBar from "@/components/navbar";

// Category Buttons
const category = ["All", "Music", "Podcasts", "Audiobooks"];

export default function Home() {
  return (
    <div className="bg-white">
      {/* Navbar */}
      <div>
        <NavBar />
      </div>

      {/* Category Buttons */}
      <div className="bg-cyan-600 p-4 flex space-x-4">
        {category.map((category) => (
          <button
            key={category}
            className="bg-gray-200 px-4 py-2 rounded-full font-medium"
          >
            {category}
          </button>
        ))}
      </div>

      {/* Content Grid */}
      <div className="bg-cyan-600 p-6 grid grid-cols-3 gap-4">
        {Array(6)
          .fill()
          .map((_, index) => (
            <div key={index} className="bg-gray-300 h-20 rounded-lg"></div>
          ))}
      </div>

      {/* Made for You Section */}
      <div className="bg-gray-200 p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold">Made for You</h2>
          <button className="text-cyan-600 font-medium">See All</button>
        </div>
        <div className="grid grid-cols-4 gap-4 mt-4">
          {Array(4)
            .fill()
            .map((_, index) => (
              <div key={index} className="bg-cyan-600 h-32 rounded-lg"></div>
            ))}
        </div>
      </div>
    </div>
  );
}
