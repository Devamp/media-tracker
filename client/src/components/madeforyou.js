import { useState } from "react";

const MadeForYou = ({ items }) => {
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 4;

  // Function to go to the next set of items
  const nextItems = () => {
    if (startIndex + itemsPerPage < items.length) {
      setStartIndex(startIndex + itemsPerPage);
    }
  };

  // Function to go to the previous set of items
  const prevItems = () => {
    if (startIndex - itemsPerPage >= 0) {
      setStartIndex(startIndex - itemsPerPage);
    }
  };

  return (
    <div className="bg-white p-12 pt-5 relative">
      <h2 className="text-[#2d5c7c] text-2xl font-bold mb-4">Made for You</h2>

      <div className="relative flex items-center">
        {/* Left Arrow */}
        <button
          onClick={prevItems}
          disabled={startIndex === 0}
          className={`absolute left-[-25px] bg-[#2d5c7c] text-white w-12 h-12 flex items-center justify-center rounded-full shadow-md ${
            startIndex === 0
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-[#1e4b6a]"
          }`}
        >
          &#9665; {/* Left Arrow */}
        </button>

        {/* Item Grid */}
        <div className="grid grid-cols-4 gap-4 flex-1 mx-10">
          {items
            .slice(startIndex, startIndex + itemsPerPage)
            .map((item, index) => (
              <div key={index} className="bg-[#2d5c7c] h-32 rounded-lg">
                {startIndex + index + 1}
              </div>
            ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={nextItems}
          disabled={startIndex + itemsPerPage >= items.length}
          className={`absolute right-[-25px] bg-[#2d5c7c] text-white w-12 h-12 flex items-center justify-center rounded-full shadow-md ${
            startIndex + itemsPerPage >= items.length
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-[#1e4b6a]"
          }`}
        >
          &#9655; {/* Right Arrow */}
        </button>
      </div>
    </div>
  );
};

export default MadeForYou;
