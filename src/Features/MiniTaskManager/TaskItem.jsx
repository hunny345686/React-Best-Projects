import { useEffect, useState } from "react";

const TaskItem = ({ task, onDelete }) => {
  const { id, description, priority, timeLeft } = task;
  const [isBlinking, setIsBlinking] = useState(task.isBlinking);

  // Format time for display (MM:SS)
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  useEffect(() => {
    let blinkTimeout;
    // If timeLeft is 0 or less, start blinking and schedule deletion
    if (timeLeft <= 0) {
      setIsBlinking(true); // Set blinking state
      // Schedule auto-deletion after 2 seconds of blinking
      blinkTimeout = setTimeout(() => {
        onDelete(id); // Call the onDelete prop to remove the task
      }, 2000); // Blink for 2 seconds then delete
    } else {
      setIsBlinking(false); // Ensure not blinking if time is still left
    }

    // Cleanup function for useEffect: clear the timeout if the component unmounts
    // or if timeLeft changes before the timeout fires (e.g., task manually deleted)
    return () => {
      if (blinkTimeout) {
        clearTimeout(blinkTimeout);
      }
    };
  }, [timeLeft, id, onDelete]); // Dependencies: re-run effect if these values change

  return (
    <div className={`task-item ${priority} ${isBlinking ? "blinking" : ""}`}>
      <span className="task-description">{description}</span>
      <span className="task-priority">({priority})</span>
      <span className="task-timer">{formatTime(timeLeft)}</span>
    </div>
  );
};

export default TaskItem;
