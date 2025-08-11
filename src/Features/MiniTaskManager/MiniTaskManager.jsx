import { useState, useEffect, useCallback } from "react";
import TaskForm from "./FormTask";
import "./style.css";
import TaskItem from "./TaskItem";

const MiniTaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const getTimeForPriority = useCallback((priority) => {
    switch (priority) {
      case "high":
        return 3 * 60; // 3 minutes in seconds
      case "medium":
        return 5 * 60; // 5 minutes in seconds
      case "low":
      default:
        return 7 * 60; // 7 minutes in seconds
    }
  }, []);

  // Function to add a new task
  const addTask = useCallback(
    (description, priority) => {
      const initialTimeLeft = getTimeForPriority(priority);
      const newTask = {
        id: Date.now(), // Unique ID based on timestamp
        description,
        priority,
        timeLeft: initialTimeLeft,
        isBlinking: false, // Initial state for blinking
      };
      setTasks((prevTasks) => [...prevTasks, newTask]); // Add new task to the list
    },
    [getTimeForPriority]
  );

  // Function to delete a task by its ID
  const deleteTask = useCallback((id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  }, []);

  // useEffect hook for handling countdown timers and sorting tasks
  useEffect(() => {
    // Set up an interval to update tasks every second
    const timerInterval = setInterval(() => {
      setTasks((prevTasks) => {
        let updatedTasks = prevTasks.map((task) => {
          // Decrement timeLeft if greater than 0
          if (task.timeLeft > 0) {
            return { ...task, timeLeft: task.timeLeft - 1 };
          } else if (task.timeLeft === 0 && !task.isBlinking) {
            // If time hits 0 and not already blinking, signal blinking
            return { ...task, isBlinking: true };
          }
          return task;
        });

        // Sort tasks based on time left (ascending order)
        updatedTasks.sort((a, b) => a.timeLeft - b.timeLeft);

        return updatedTasks; // Return the updated and sorted list
      });
    }, 1000); // Interval of 1000 milliseconds (1 second)

    // Cleanup function: clear the interval when the component unmounts
    return () => clearInterval(timerInterval);
  }, []);

  return (
    <div className="app-container">
      <h1>Mini Task Manager</h1>
      <TaskForm onAddTask={addTask} />
      <div className="task-list">
        {tasks.length === 0 ? (
          <p className="no-tasks-message">No tasks yet! Add some above.</p>
        ) : (
          tasks.map((task) => (
            <TaskItem key={task.id} task={task} onDelete={deleteTask} />
          ))
        )}
      </div>
    </div>
  );
};

export default MiniTaskManager;
