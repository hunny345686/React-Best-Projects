import { useEffect, useState } from "react";

const CountdownTimer = () => {
  const [inputTime, setInputTime] = useState(null);
  const [hour, setHour] = useState(0);
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);

  const handleTimerClick = () => {
    setHour(inputTime - 1);
    setMin(59);
    setSec(59);
  };
  // useEffect(() => {
  //   setInterval(() => {
  //     setSec((prev) => prev - 1);
  //   }, 1000);
  // }, [sec]);

  const addZero = (value) => (value <= 9 ? `0${value}` : value);

  return (
    <div className="flex flex-col items-center bg-gray-100  text-white p-8 rounded-md">
      <div className="mb-8 p-6 bg-gray-700 rounded-lg shadow-xl w-full max-w-lg">
        <label
          htmlFor="target-date-time"
          className="block text-lg font-semibold mb-3 text-gray-200"
        >
          Set Countdown Target
        </label>
        <div className="flex space-x-2">
          <input
            type="number"
            value={inputTime}
            onChange={(e) => setInputTime(e.target.value)}
            className="flex-grow p-3 rounded-md border border-gray-600 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., 10"
          />
          <button
            onClick={handleTimerClick}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-md font-bold text-white transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-700"
          >
            Start
          </button>
        </div>
      </div>

      <div className="text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 animate-pulse">
          Event Starts In:
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 p-6 bg-gray-700 bg-opacity-80 rounded-2xl shadow-2xl backdrop-blur-sm">
          <div className="flex flex-col items-center">
            <div className="text-6xl md:text-7xl font-bold text-green-300 bg-gray-800 rounded-xl p-4 min-w-[100px] text-center shadow-lg transform hover:scale-105 transition-transform duration-300">
              {addZero(hour)}
            </div>
            <span className="mt-2 text-xl font-medium text-gray-300">
              Hours
            </span>
          </div>

          <div className="flex flex-col items-center">
            <div className="text-6xl md:text-7xl font-bold text-blue-300 bg-gray-800 rounded-xl p-4 min-w-[100px] text-center shadow-lg transform hover:scale-105 transition-transform duration-300">
              {addZero(min)}
            </div>
            <span className="mt-2 text-xl font-medium text-gray-300">
              Minutes
            </span>
          </div>

          <div className="flex flex-col items-center">
            <div className="text-6xl md:text-7xl font-bold text-red-300 bg-gray-800 rounded-xl p-4 min-w-[100px] text-center shadow-lg transform hover:scale-105 transition-transform duration-300">
              {addZero(sec)}
            </div>
            <span className="mt-2 text-xl font-medium text-gray-300">
              Seconds
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
