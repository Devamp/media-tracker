import NavBar from "@/components/navbar";

// Category Buttons
const category = ["All", "Music", "Podcasts", "Audiobooks"];

export default function Home() {
  return (
    <div className="bg-[#2d5c7c] min-h-screen">
      {/* Navbar */}
        <NavBar />

      {/* Category Buttons */}
      <div className="bg-[#2d5c7c] pl-12 p-8 flex space-x-4">
        {category.map((category) => (
          <button
            key={category}
            className="bg-[#60849b] text-white px-4 py-2 rounded-full font-medium hover:bg-[#27506c]"
          >
            {category}
          </button>
        ))}
      </div>

      {/* Content Grid */}
      <div className="bg-[#2d5c7c] p-12 pt-0 grid grid-cols-3 gap-x-12 gap-y-6">
        {Array(6)
          .fill()
          .map((_, index) => (
            <div key={index} className="bg-white h-20 rounded-lg"></div>
          ))}
      </div>

      {/* Made for You Section */}
      <div className="bg-white p-12 pt-5">
        <div className="flex justify-between items-center">
          <h2 className="text-[#2d5c7c] text-2xl font-bold">Made for You</h2>
          <button className="text-[#2d5c7c] font-medium hover:underline">See All</button>
        </div>
        <div className="grid grid-cols-4 gap-4 mt-4">
          {Array(4)
            .fill()
            .map((_, index) => (
              <div key={index} className="bg-[#2d5c7c] h-32 rounded-lg"></div>
            ))}
        </div>
      </div>
    </div>
  );
}
