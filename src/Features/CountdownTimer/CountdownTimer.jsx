import { useEffect, useRef, useState } from "react";

function CountdownTimer({
  initialHours = 0,
  initialMinutes = 0,
  initialSeconds = 0,
}) {
  const [targetTime, setTargetTime] = useState(null); // Milliseconds timestamp of when the timer should end
  const [timeLeft, setTimeLeft] = useState(0); // Remaining time in milliseconds
  const [isRunning, setIsRunning] = useState(false); // Whether the timer is currently counting down
  const [isPaused, setIsPaused] = useState(false); // Whether the timer is paused

  // Refs for input fields to get their values directly
  const hoursInputRef = useRef(null);
  const minutesInputRef = useRef(null);
  const secondsInputRef = useRef(null);

  const formatTime = (time) =>
    String(Math.floor(Math.max(0, time))).padStart(2, "0");

  // Effect to update timeLeft every second
  useEffect(() => {
    let intervalId;

    // Timer runs only if it's running AND NOT paused AND targetTime is set
    if (isRunning && !isPaused && targetTime !== null) {
      intervalId = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetTime - now;

        if (distance <= 0) {
          clearInterval(intervalId);
          setTimeLeft(0);
          setIsRunning(false);
          setIsPaused(false); // Ensure it's not paused when it ends
        } else {
          setTimeLeft(distance);
        }
      }, 1000);
    } else {
      clearInterval(intervalId); // Clear interval if not running, paused, or targetTime is null
    }

    // Cleanup function
    return () => clearInterval(intervalId);
  }, [isRunning, isPaused, targetTime]); // Depend on isPaused as well

  // Effect to initialize inputs and calculate initial timeLeft when component mounts or initial values change
  useEffect(() => {
    // Set initial values to refs if they are provided as props (e.g., for an initial display)
    if (hoursInputRef.current)
      hoursInputRef.current.value = formatTime(initialHours);
    if (minutesInputRef.current)
      minutesInputRef.current.value = formatTime(initialMinutes);
    if (secondsInputRef.current)
      secondsInputRef.current.value = formatTime(initialSeconds);
  }, [initialHours, initialMinutes, initialSeconds]);

  // Calculate days, hours, minutes, seconds from timeLeft for display
  const displayDays = formatTime(timeLeft / (1000 * 60 * 60 * 24));
  const displayHours = formatTime(
    (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const displayMinutes = formatTime(
    (timeLeft % (1000 * 60 * 60)) / (1000 * 60)
  );
  const displaySeconds = formatTime((timeLeft % (1000 * 60)) / 1000);

  // Handle Start Timer
  const handleStart = () => {
    const hours = parseInt(hoursInputRef.current.value || "0", 10);
    const minutes = parseInt(minutesInputRef.current.value || "0", 10);
    const seconds = parseInt(secondsInputRef.current.value || "0", 10);

    const totalDurationMs = (hours * 3600 + minutes * 60 + seconds) * 1000;

    if (totalDurationMs > 0) {
      const newTargetTime = new Date().getTime() + totalDurationMs;
      setTargetTime(newTargetTime);
      setTimeLeft(totalDurationMs);
      setIsRunning(true);
      setIsPaused(false); // Ensure it's not paused when starting
      console.log(`Timer started for ${hours}h ${minutes}m ${seconds}s.`);
    } else {
      alert("Please enter a duration greater than zero!"); // Using alert as per guidance for this specific case (user input error)
    }
  };

  // Handle Pause Timer
  const handlePause = () => {
    setIsPaused(true);
    console.log("Timer paused.");
  };

  // Handle Continue Timer
  const handleContinue = () => {
    // When continuing, recalculate targetTime based on current timeLeft
    const newTargetTime = new Date().getTime() + timeLeft;
    setTargetTime(newTargetTime);
    setIsPaused(false);
    setIsRunning(true); // Ensure it's running after continue
    console.log("Timer continued.");
  };

  // Handle Reset Timer
  const handleReset = () => {
    setIsRunning(false);
    setIsPaused(false); // Ensure it's not paused
    setTargetTime(null);
    setTimeLeft(0);
    // Reset input fields to initial or empty
    if (hoursInputRef.current)
      hoursInputRef.current.value = formatTime(initialHours);
    if (minutesInputRef.current)
      minutesInputRef.current.value = formatTime(initialMinutes);
    if (secondsInputRef.current)
      secondsInputRef.current.value = formatTime(initialSeconds);
    console.log("Timer reset.");
  };

  return (
    <div className=" p-4 font-inter text-gray-800">
      <div className="bg-white p-8 sm:p-12 rounded-2xl shadow-2xl text-center max-w-lg w-full transform transition-all duration-500 ease-in-out border-4 border-white-300">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-6 leading-tight">
          Countdown Timer
        </h2>

        {/* Input Fields */}
        <div className="mb-6 flex flex-wrap justify-center items-center space-x-2 sm:space-x-4">
          <div className="flex flex-col items-center mb-4 sm:mb-0">
            <label
              htmlFor="hours"
              className="text-sm font-medium text-gray-600 mb-1"
            >
              Hours
            </label>
            <input
              type="number"
              id="hours"
              ref={hoursInputRef}
              min="0"
              max="99"
              defaultValue={formatTime(initialHours)}
              className="w-20 text-center p-2 border border-gray-300 rounded-md text-xl font-bold focus:ring-blue-500 focus:border-blue-500"
              onChange={(e) => {
                const val = Math.max(0, parseInt(e.target.value || "0", 10));
                e.target.value = formatTime(val);
              }}
              aria-label="Hours"
              disabled={
                isRunning && !isPaused
              } /* Disable inputs when timer is running and not paused */
            />
          </div>
          <span className="text-3xl sm:text-4xl font-bold text-gray-600">
            :
          </span>
          <div className="flex flex-col items-center mb-4 sm:mb-0">
            <label
              htmlFor="minutes"
              className="text-sm font-medium text-gray-600 mb-1"
            >
              Minutes
            </label>
            <input
              type="number"
              id="minutes"
              ref={minutesInputRef}
              min="0"
              max="59"
              defaultValue={formatTime(initialMinutes)}
              className="w-20 text-center p-2 border border-gray-300 rounded-md text-xl font-bold focus:ring-blue-500 focus:border-blue-500"
              onChange={(e) => {
                const val = Math.min(
                  59,
                  Math.max(0, parseInt(e.target.value || "0", 10))
                );
                e.target.value = formatTime(val);
              }}
              aria-label="Minutes"
              disabled={
                isRunning && !isPaused
              } /* Disable inputs when timer is running and not paused */
            />
          </div>
          <span className="text-3xl sm:text-4xl font-bold text-gray-600">
            :
          </span>
          <div className="flex flex-col items-center">
            <label
              htmlFor="seconds"
              className="text-sm font-medium text-gray-600 mb-1"
            >
              Seconds
            </label>
            <input
              type="number"
              id="seconds"
              ref={secondsInputRef}
              min="0"
              max="59"
              defaultValue={formatTime(initialSeconds)}
              className="w-20 text-center p-2 border border-gray-300 rounded-md text-xl font-bold focus:ring-blue-500 focus:border-blue-500"
              onChange={(e) => {
                const val = Math.min(
                  59,
                  Math.max(0, parseInt(e.target.value || "0", 10))
                );
                e.target.value = formatTime(val);
              }}
              aria-label="Seconds"
              disabled={
                isRunning && !isPaused
              } /* Disable inputs when timer is running and not paused */
            />
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex justify-center space-x-4 mb-8">
          {/* Start Button */}
          {!isRunning && timeLeft === 0 && (
            <button
              onClick={handleStart}
              className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition duration-300 font-semibold"
            >
              Start Timer
            </button>
          )}

          {/* Pause/Continue Button */}
          {isRunning && !isPaused && timeLeft > 0 && (
            <button
              onClick={handlePause}
              className="bg-yellow-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-yellow-600 transition duration-300 font-semibold"
            >
              Pause
            </button>
          )}
          {isRunning && isPaused && timeLeft > 0 && (
            <button
              onClick={handleContinue}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 font-semibold"
            >
              Continue
            </button>
          )}

          {/* Reset Button */}
          {(isRunning ||
            timeLeft >
              0) /* Show reset if running or if time has passed/been set */ && (
            <button
              onClick={handleReset}
              className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-600 transition duration-300 font-semibold"
            >
              Reset Timer
            </button>
          )}
        </div>

        {/* Display Timer */}
        {timeLeft > 0 ? (
          <div className="flex justify-center items-center space-x-2 sm:space-x-4 mb-4">
            <div className="flex flex-col items-center p-3 sm:p-4 bg-blue-100 text-blue-800 rounded-lg shadow-inner flex-1 min-w-[60px] sm:min-w-[80px]">
              <span className="text-3xl sm:text-5xl font-bold">
                {displayDays}
              </span>
              <span className="text-xs sm:text-sm uppercase tracking-wide">
                Days
              </span>
            </div>
            <span className="text-3xl sm:text-5xl font-bold text-gray-600">
              :
            </span>
            <div className="flex flex-col items-center p-3 sm:p-4 bg-green-100 text-green-800 rounded-lg shadow-inner flex-1 min-w-[60px] sm:min-w-[80px]">
              <span className="text-3xl sm:text-5xl font-bold">
                {displayHours}
              </span>
              <span className="text-xs sm:text-sm uppercase tracking-wide">
                Hours
              </span>
            </div>
            <span className="text-3xl sm:text-5xl font-bold text-gray-600">
              :
            </span>
            <div className="flex flex-col items-center p-3 sm:p-4 bg-yellow-100 text-yellow-800 rounded-lg shadow-inner flex-1 min-w-[60px] sm:min-w-[80px]">
              <span className="text-3xl sm:text-5xl font-bold">
                {displayMinutes}
              </span>
              <span className="text-xs sm:text-sm uppercase tracking-wide">
                Minutes
              </span>
            </div>
            <span className="text-3xl sm:text-5xl font-bold text-gray-600">
              :
            </span>
            <div className="flex flex-col items-center p-3 sm:p-4 bg-red-100 text-red-800 rounded-lg shadow-inner flex-1 min-w-[60px] sm:min-w-[80px]">
              <span className="text-3xl sm:text-5xl font-bold">
                {displaySeconds}
              </span>
              <span className="text-xs sm:text-sm uppercase tracking-wide">
                Seconds
              </span>
            </div>
          </div>
        ) : (
          <p className="text-2xl sm:text-3xl font-bold text-green-700 mb-8">
            {isRunning ? "Timer Running..." : "Timer Finished! 🎉"}
          </p>
        )}
      </div>
    </div>
  );
}

export default CountdownTimer;
