import { useState } from "react";
import ImageCard from "./ImageCard";
import { useFetch } from "./useFetch";
import LoadingSpinner from "../../Component/LoadingSpinner";

const ImageGallery = () => {
  const [url, setUrl] = useState("https://rickandmortyapi.com/api/character");
  const { data, error, loding } = useFetch(url);

  if (loding) return <LoadingSpinner />;
  if (error) return <p>{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between items-center mb-8 max-w-7xl mx-auto">
        <button
          className="p-3 cursor-pointer rounded-full bg-white text-gray-700 shadow-md hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-300       disabled:text-gray-500 disabled:shadow-none disabled:pointer-events-none"
          aria-label="Previous Page"
          onClick={() => {
            setUrl(data?.info?.prev);
          }}
          disabled={!data?.info?.prev}
        >
          ⬅️
        </button>
        <h2 className="text-3xl font-bold text-gray-800">
          Gallery Preview {data?.info.count}
        </h2>
        <button
          className="p-3 cursor-pointer rounded-full bg-white text-gray-700 shadow-md hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-300       disabled:text-gray-500 disabled:shadow-none disabled:pointer-events-none"
          aria-label="Next Page"
          onClick={() => {
            setUrl(data?.info?.next);
          }}
          disabled={!data?.info?.next}
        >
          ➡️
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-7xl">
        {data?.results &&
          data?.results?.map((item) => <ImageCard key={item.id} data={item} />)}
      </div>
    </div>
  );
};

export default ImageGallery;
