import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-[200px] p-4">
      <div
        className="inline-blockh-8 w-8 border-4 border-t-4 border-blue-500 border-gray-200 rounded-full animate-spin"
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
      <p className="ml-3 text-lg font-medium text-gray-700">Loading...</p>
    </div>
  );
};

export default LoadingSpinner;
