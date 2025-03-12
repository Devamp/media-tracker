import { useEffect, useState } from "react";

export default function ContentGrid({ selectedCategory }) {
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data from the database
  useEffect(() => {
    const fetchLogs = async () => {
      const token = sessionStorage.getItem("token");

      try {
        if (token) {
          const res = await fetch("http://localhost:5001/user-logs", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });

          // Handle response
          if (res.ok) {
            const data = await res.json();
            const formattedLogs = data.response.map((log) => ({
              id: log._id,
              name: log.mediaName,
              img: log.mediaImage,
              category: log.mediaCategory,
            }));
            setLogs(formattedLogs);
          } else {
            console.error("Failed to fetch logs");
          }
        }
      } catch (error) {
        console.error("Error fetching logs: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLogs();
  }, []);

  // Filter the data based on the selected category
  const filteredData = logs.filter(
    (item) => selectedCategory === "All" || item.category === selectedCategory
  );

  // Limit the content to maximum of 6 items
  const displayedData = filteredData.slice(0, 6);

  return (
    <div className="bg-[#2d5c7c] p-12 pt-0 grid grid-cols-3 gap-x-12 gap-y-6">
      {/* Render the selected category's content, show message if no items are available */}
      {isLoading ? (
        <div className="col-span-3 text-white text-center font-medium">
          Loading content...
        </div>
      ) : displayedData.length > 0 ? (
        displayedData.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg h-28 pl-0 p-4 flex items-center"
          >
            <img
              src={item.img}
              alt={item.name}
              className="w-28 h-28 rounded-lg"
            />
            <h3 className="font-medium flex justify-center pl-4">
              {item.name}
            </h3>
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
