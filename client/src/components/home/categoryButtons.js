export default function CategoryButtons( {category, selectedCategory, setSelectedCategory}) {
  return (
    <div className="bg-[#2d5c7c] pl-12 p-8 flex space-x-4">
      {category.map((cat) => (
        <button
          key={cat}
          className={`px-4 py-2 rounded-full font-medium ${
            selectedCategory === cat
              ? "bg-white text-[#2d5c7c]" // Active Button
              : "bg-[#60849b] text-white hover:bg-[#27506c]" // Default Button
          } `}
          onClick={() => setSelectedCategory(cat)} // Update the state on click to selected category
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
