import React from "react";

function TodoList({
  todoList,
  handleDeleteTodo,
  handleEditTodo,
  handleToggleComplete,
}) {
  return (
    <div className="space-y-4">
      {todoList.map((todo) => (
        <div
          key={todo.id}
          className={`
      flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-lg shadow-md border
      ${
        todo.completed
          ? "bg-green-50 border-green-200"
          : "bg-white border-gray-200"
      }
      transition duration-200 ease-in-out
    `}
        >
          <div className="flex items-center flex-grow mb-3 sm:mb-0">
            <input
              type="checkbox"
              checked={todo.completed}
              className="form-checkbox h-5 w-5 text-blue-600 rounded-md transition duration-200 cursor-pointer"
              onChange={() => handleToggleComplete(todo.id)}
            />
            <div className="ml-4">
              <h3
                className={`text-lg font-semibold ${
                  todo.completed
                    ? "line-through text-gray-500"
                    : "text-gray-800"
                }`}
              >
                {todo.title}
              </h3>
              {todo.description && (
                <p
                  className={`text-sm text-gray-600 ${
                    todo.completed ? "line-through text-gray-400" : ""
                  }`}
                >
                  {todo.description}
                </p>
              )}
            </div>
          </div>

          <div className="flex space-x-2 flex-shrink-0">
            <button
              className="p-2 rounded-full bg-yellow-100 text-yellow-700 hover:bg-yellow-200 transition duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              onClick={() => handleEditTodo(todo.id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zm-1.64 1.64L11 3.75V4.25a.75.75 0 001.5 0v-.5l.5-.5zM10 16a6 6 0 100-12 6 6 0 000 12zM8 10a2 2 0 100 4 2 2 0 000-4zM6 10a4 4 0 118 0 4 4 0 01-8 0z" />
                <path
                  fillRule="evenodd"
                  d="M15.293 1.293a1 1 0 011.414 0l2 2a1 1 0 010 1.414l-10 10a1 1 0 01-.39.242l-3 1a1 1 0 01-1.24-.75l1-3a1 1 0 01.242-.39l10-10zM12.5 7.5a.5.5 0 00-1 0v.5a.5.5 0 001 0v-.5z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button
              className="p-2 rounded-full bg-red-100 text-red-700 hover:bg-red-200 transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-400"
              onClick={() => handleDeleteTodo(todo.id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1zm2 3a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      ))}

      {todoList.length === 0 && (
        <p className="text-center text-gray-500 italic mt-8">
          No tasks found. Add a new one!
        </p>
      )}
    </div>
  );
}

export default TodoList;
