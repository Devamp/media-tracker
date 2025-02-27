import { useState } from "react";

const music = [
  {
    id: "m1",
    name: "APT.",
    img: "https://i.scdn.co/image/ab67616d0000b27336032cb4acd9df050bc2e197",
  },
  {
    id: "m2",
    name: "we can't be friends (wait for your love)",
    img: "https://i.scdn.co/image/ab67616d0000b2738b58d20f1b77295730db15b4",
  },
  {
    id: "m3",
    name: "Die With A Smile",
    img: "https://i.scdn.co/image/ab67616d0000b27382ea2e9e1858aa012c57cd45",
  },
  {
    id: "m4",
    name: "Anti-Hero",
    img: "https://i.scdn.co/image/ab67616d0000b273bb54dde68cd23e2a268ae0f5",
  },
];

const podcast = [
  {
    id: "p1",
    name: "TED Talks Daily",
    img: "https://i.scdn.co/image/ab6765630000ba8a1eef8dcabec3dca77ace07c8",
  },
  {
    id: "p2",
    name: "Learning Easy English",
    img: "https://i.scdn.co/image/ab6765630000ba8a5ddbeecc590a066fd7dbb27b",
  },
  {
    id: "p3",
    name: "Learning English Conversations",
    img: "https://i.scdn.co/image/ab6765630000ba8a947e831094641e0163c74535",
  },
  {
    id: "p4",
    name: "Better Version",
    img: "https://i.scdn.co/image/ab6765630000ba8a33e903d1f9adb0a2f087c5e0",
  },
];

const audiobook = [
  {
    id: "a1",
    name: "Atomic Habits (James Clear)",
    img: "https://i.scdn.co/image/ab6765630000ba8a9ed8fa6c5d3681b214776bf3",
  },
  {
    id: "a2",
    name: "Thinking, Fast & Slow (Daniel Kahneman)",
    img: "https://i.scdn.co/image/ab6765630000ba8a822fec292cf7237ecfb8437c",
  },
  {
    id: "a3",
    name: "12 Rules for Life (Jordan B. Peterson)",
    img: "https://i.scdn.co/image/ab6765630000ba8afada17ad64aae7c4ecb9cf39",
  },
  {
    id: "a4",
    name: "Deep Work (Cal Newport)",
    img: "https://i.scdn.co/image/ab6765630000ba8abbdbf539dc876b0f5e964e9d",
  },
];

// Combine all data above into a single list
const allItems = [...music, ...podcast, ...audiobook];

const MadeForYou = () => {
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 4;
  const totalItems = allItems.length;

  // Function to go to the next set of items
  const nextItems = () => {
    if (startIndex + itemsPerPage < totalItems) {
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
          {allItems
            .slice(startIndex, startIndex + itemsPerPage)
            .map((item, index) => (
              <div
                key={item.id}
                className="bg-[#2d5c7c] h-32 pl-0 p-6 rounded-lg flex items-center"
              >
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-32 h-32 rounded-md"
                />
                <h3 className="pl-4 text-white text-left text-sm break-words font-bold mt-2">
                  {item.name}
                </h3>
              </div>
            ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={nextItems}
          disabled={startIndex + itemsPerPage >= totalItems}
          className={`absolute right-[-25px] bg-[#2d5c7c] text-white w-12 h-12 flex items-center justify-center rounded-full shadow-md ${
            startIndex + itemsPerPage >= totalItems
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
