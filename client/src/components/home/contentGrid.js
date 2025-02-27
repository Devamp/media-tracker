export default function ContentGrid({ selectedCategory }) {
  return (
    <div className="bg-[#2d5c7c] p-12 pt-0 grid grid-cols-3 gap-x-12 gap-y-6">
      {Array(6)
        .fill()
        .map((_, index) => (
          <div key={index} className="bg-white h-20 rounded-lg">
            <span className="font-medium flex justify-center">
              {selectedCategory}
            </span>
          </div>
        ))}
    </div>
  );
}
