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
  {
    id: "m5",
    name: "Anti-Hero",
    img: "https://i.scdn.co/image/ab67616d0000b273bb54dde68cd23e2a268ae0f5",
  },
  {
    id: "m6",
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
  {
    id: "p5",
    name: "Better Version",
    img: "https://i.scdn.co/image/ab6765630000ba8a33e903d1f9adb0a2f087c5e0",
  },
  {
    id: "p6",
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
  {
    id: "a5",
    name: "Deep Work (Cal Newport)",
    img: "https://i.scdn.co/image/ab6765630000ba8abbdbf539dc876b0f5e964e9d",
  },
  {
    id: "a6",
    name: "Deep Work (Cal Newport)",
    img: "https://i.scdn.co/image/ab6765630000ba8abbdbf539dc876b0f5e964e9d",
  },
];

export default function ContentGrid({ selectedCategory }) {
  // Determine which category to display
  const categoryData =
    selectedCategory === "Music"
      ? music
      : selectedCategory === "Podcasts"
      ? podcast
      : selectedCategory === "Audiobooks"
      ? audiobook
      : selectedCategory === "All"
      ? [...music.slice(0, 2), ...podcast.slice(0, 2), ...audiobook.slice(0, 2)]    // Get first 2 items from each category
      : [];

  return (
    <div className="bg-[#2d5c7c] p-12 pt-0 grid grid-cols-3 gap-x-12 gap-y-6">
      {/* Render the selected category's content, show message if no items are available */}
      {categoryData.length > 0 ? (
        categoryData.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg h-28 pl-0 p-4 flex items-center"
          >
            <img
              src={item.img}
              alt={item.name}
              className="w-28 h-28 rounded-lg"
            />
            <h3 className="font-medium flex justify-center pl-4">{item.name}</h3>
          </div>
        ))
      ) : (
        <div className="col-span-3 text-white text-center font-medium">
          No items available
        </div>
      )}
    </div>
  );
}
