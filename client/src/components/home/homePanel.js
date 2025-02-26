export default function HomePanel() {
    return (
        <div className="bg-white p-8 flex gap-6">
        {/* Left Section */}
        <div className="flex flex-col gap-6 w-2/3">
          {/* Top Artist */}
          <div className="bg-[#2d5c7c] p-6 rounded-lg text-center flex-1">
            <h2 className="text-white font-bold mb-4 text-xl">Top Artist</h2>
            <div className="flex justify-center gap-10 mt-4">
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="bg-gray-300 rounded-full w-16 h-16"
                ></div>
              ))}
            </div>
          </div>

          {/* Recent Podcasts */}
          <div className="bg-[#2d5c7c] p-6 rounded-lg text-center flex-1">
            <h2 className="text-white font-bold mb-4 text-xl">Recent Podcasts</h2>
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-white p-4 rounded-lg mb-2"
              >
                <div className="w-full h-10 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Section - Top Audiobooks */}
        <div className="w-1/3 bg-[#2d5c7c] p-6 rounded-lg text-center flex-1">
          <h2 className="text-white font-bold mb-8 text-xl">Top Audiobooks</h2>
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg mb-4 flex items-center justify-between"
            >
              <div className="w-16 h-16 bg-gray-200 rounded"></div>
              <div className="flex gap-2">      
              </div>
            </div>
          ))}
        </div>
      </div>
    )
}