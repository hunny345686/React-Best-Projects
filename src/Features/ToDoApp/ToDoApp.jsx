import { useMemo } from "react";
import FilterAndSearch from "../../Component/FilterAndSearch";
import TodoList from "./TodoList";
import useTodoManager from "./useTodoManager";

export default function ToDoApp() {
  const {
    todoInputs,
    edit,
    filterStatus,
    searchTerm,
    handleChange,
    handleAddTodo,
    handleUpdateTodo,
    handleToggleComplete,
    handleEditTodo,
    handleDeleteTodo,
    setSearchTerm,
    setfilterStatus,
    getFilteredTodos,
  } = useTodoManager();

  const filterActionArray = ["all", "active", "completed"];
  const displayedTodos = useMemo(() => getFilteredTodos(), [getFilteredTodos]);

  return (
    <div className=" bg-gray-100 p-2 sm:p-6 lg:p-8 flex items-center justify-center font-sans">
      <div className="bg-white rounded-xl shadow-2xl p-2 sm:p-4 lg:p-6 w-full max-w-2xl">
        <div className="mb-8 p-4 bg-blue-50 rounded-lg shadow-inner border border-blue-200">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">
            {edit ? "Edit Task" : "Add New Task"}
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <input
              type="text"
              placeholder="Task Title"
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
              name="title"
              value={todoInputs.title}
              onChange={handleChange}
              required={true}
            />
            <input
              type="text"
              placeholder="Task Description (Optional)"
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
              name="description"
              value={todoInputs.description}
              onChange={handleChange}
            />
          </div>
          <button
            onClick={edit ? handleUpdateTodo : handleAddTodo}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold text-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 shadow-md"
          >
            {edit ? "Update Task" : "Add Task"}
          </button>
        </div>

        <FilterAndSearch
          filterStatus={filterStatus}
          setfilterStatus={setfilterStatus}
          setSearchTerm={setSearchTerm}
          searchTerm={searchTerm}
          filterActionArray={filterActionArray}
        />
        <TodoList
          todoList={displayedTodos}
          handleDeleteTodo={handleDeleteTodo}
          handleEditTodo={handleEditTodo}
          handleToggleComplete={handleToggleComplete}
        />
      </div>
    </div>
  );
}
