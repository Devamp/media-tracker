import NavBar from "@/components/navbar";

export default function Home() {
  return (
    <div className="bg-white">
      <div>
        <NavBar />
      </div>
      <div className="text-white bg-cyan-600">
        <div>
          {/* Category Buttons */}
          <button className="border rounded-full">All</button>
          <button className="border rounded-full">Music</button>
          <button className="border rounded-full">Podcasts</button>
          <button className="border rounded-full">Audiobooks</button>
        </div>
        <div className="grid grid-cols-4 gap-4 justify-center items-center">
          {/* The cards under the category buttons */}
          <div className="w-20 h-20 bg-white border border-gray-300 shadow-md"></div>
          <div className="w-20 h-20 bg-white border border-gray-300 shadow-md"></div>
          <div className="w-20 h-20 bg-white border border-gray-300 shadow-md"></div>
          <div className="w-20 h-20 bg-white border border-gray-300 shadow-md"></div>
          <div className="w-20 h-20 bg-white border border-gray-300 shadow-md"></div>
          <div className="w-20 h-20 bg-white border border-gray-300 shadow-md"></div>
          <div className="w-20 h-20 bg-white border border-gray-300 shadow-md"></div>
          <div className="w-20 h-20 bg-white border border-gray-300 shadow-md"></div>
        </div>
      </div>
      <div>
        <div className="flex justify-between items-center">
          <h1>Made for You</h1>
          <p>See All</p>
        </div>
        <div className="grid grid-cols-4 gap-4 justify-center items-center">
          <div className="w-20 h-20 bg-cyan-600 border border-gray-300 shadow-md"></div>
          <div className="w-20 h-20 bg-cyan-600 border border-gray-300 shadow-md"></div>
          <div className="w-20 h-20 bg-cyan-600 border border-gray-300 shadow-md"></div>
          <div className="w-20 h-20 bg-cyan-600 border border-gray-300 shadow-md"></div>
        </div>
      </div>
    </div>
  );
}
