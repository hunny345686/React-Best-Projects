export default function FilterAndSearch({
  filterActionArray,
  filterStatus,
  setfilterStatus,
  setSearchTerm,
  searchTerm,
}) {
  return (
    <div className="mb-8 flex flex-col sm:flex-row justify-between items-center gap-4">
      <div className="flex space-x-2 bg-gray-100 p-2 rounded-lg shadow-sm">
        {filterActionArray.map((item) => (
          <button
            key={item}
            className={`py-2 px-4 rounded-md text-sm font-medium transition duration-200 capitalize ${
              filterStatus === item
                ? "bg-blue-500 text-white shadow"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => setfilterStatus(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <input
        type="text"
        placeholder="Search tasks..."
        className="flex-1 max-w-xs p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}
