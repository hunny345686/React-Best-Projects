import { useEffect, useState } from "react";

export default function useTodoManager() {
  const [edit, setEdit] = useState(null);
  const [todoList, setTodoList] = useState(() => {
    const saved = localStorage.getItem("todoList");
    return saved ? JSON.parse(saved) : [];
  });
  const [filterStatus, setfilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [todoInputs, setTodoInputs] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodoInputs((prev) => ({ ...prev, [name]: value }));
  };
  const handleAddTodo = () => {
    const newData = {
      id: Date.now(),
      ...todoInputs,
      completed: false,
    };
    if (todoInputs.title === "") return;
    setTodoList((prev) => [...prev, newData]);
    setEdit(null);
    setTodoInputs({ title: "", description: "" });
  };
  const handleUpdateTodo = () => {
    const newData = {
      ...todoInputs,
    };
    setTodoList((prev) =>
      prev.map((item) => (item.id === edit ? newData : item))
    );

    setTodoInputs({ title: "", description: "" });
    setEdit(null);
  };
  const handleDeleteTodo = (id) => {
    setTodoList((prev) => prev.filter((item) => item.id !== id));
  };
  const handleEditTodo = (editID) => {
    const { title, description } =
      todoList.find((item) => item.id === editID) || {};
    setTodoInputs({ title, description });
    setEdit(editID);
  };
  const handleToggleComplete = (id) => {
    setTodoList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };
  const getFilteredTodos = () => {
    let filtered = todoList;
    if (searchTerm) {
      filtered = filtered.filter(
        (todo) =>
          todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (todo.description &&
            todo.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    if (filterStatus === "active") {
      return filtered.filter((todo) => !todo.completed);
    } else if (filterStatus === "completed") {
      return filtered.filter((todo) => todo.completed);
    }
    return filtered;
  };

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]);

  return {
    todoList,
    todoInputs,
    edit,
    filterStatus,
    searchTerm,
    setSearchTerm,
    setfilterStatus,
    setTodoList,
    setTodoInputs,
    setEdit,
    handleChange,
    handleAddTodo,
    handleUpdateTodo,
    handleToggleComplete,
    handleEditTodo,
    handleDeleteTodo,
    getFilteredTodos,
  };
}
