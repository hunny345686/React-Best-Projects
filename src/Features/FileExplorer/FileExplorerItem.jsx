import { useState } from "react";

const FileExplorerItem = ({ item, onAddNode }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [showInput, setShowInput] = useState(false);
  const [newNodeName, setNewNodeName] = useState("");
  const [newNodeType, setNewNodeType] = useState("");

  const isFolder = item.type === "folder";

  const handleAddItem = (type) => {
    setNewNodeType(type);
    setShowInput(true);
    if (isFolder) {
      setIsExpanded(true);
    }
  };

  const handleSave = () => {
    if (newNodeName.trim() === "") {
      alert("Name cannot be empty.");
      return;
    }
    onAddNode(item.id, newNodeName.trim(), newNodeType);
    setNewNodeName("");
    setShowInput(false);
  };

  const handleCancel = () => {
    setNewNodeName("");
    setShowInput(false);
  };

  return (
    <div className="mb-1">
      <div
        className={`flex items-center py-1 px-2 rounded-md transition-all duration-150 
                    ${
                      isFolder
                        ? "font-semibold text-gray-800 cursor-pointer hover:bg-gray-100"
                        : "text-gray-700 hover:bg-gray-50"
                    } 
                    `}
        onClick={() => isFolder && setIsExpanded(!isExpanded)}
      >
        <span className="mr-2 text-lg">
          {isFolder ? (isExpanded ? "📂" : "📁") : "📄"}
        </span>
        <span className="flex-grow">{item.name}</span>

        {isFolder && (
          <div className="flex gap-2 ml-auto">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAddItem("folder");
              }}
              className="px-2 py-1 bg-blue-500 text-white text-xs rounded-md hover:bg-blue-600 transition-colors duration-150"
              title="Add Folder"
            >
              + Folder
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAddItem("file");
              }}
              className="px-2 py-1 bg-green-500 text-white text-xs rounded-md hover:bg-green-600 transition-colors duration-150"
              title="Add File"
            >
              + File
            </button>
          </div>
        )}
      </div>

      {showInput && (
        <div className="flex items-center ml-8 mt-2 mb-1">
          <span className="mr-2 text-lg">
            {newNodeType === "folder" ? "📁" : "📄"}
          </span>
          <input
            type="text"
            value={newNodeName}
            onChange={(e) => setNewNodeName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSave();
              } else if (e.key === "Escape") {
                handleCancel();
              }
            }}
            placeholder={`Enter ${newNodeType} name`}
            className="border border-gray-300 rounded-md px-2 py-1 text-sm flex-grow focus:outline-none focus:ring-2 focus:ring-blue-300"
            autoFocus
          />
          <button
            onClick={handleSave}
            className="ml-2 px-3 py-1 bg-indigo-500 text-white text-xs rounded-md hover:bg-indigo-600 transition-colors duration-150"
          >
            Save
          </button>
          <button
            onClick={handleCancel}
            className="ml-1 px-3 py-1 bg-gray-400 text-white text-xs rounded-md hover:bg-gray-500 transition-colors duration-150"
          >
            Cancel
          </button>
        </div>
      )}

      {isFolder && isExpanded && item.children && item.children.length > 0 && (
        <div className="ml-5 border-l border-dotted border-gray-300 pl-2 mt-1">
          {item.children.map((child) => (
            <FileExplorerItem
              key={child.id}
              item={child}
              onAddNode={onAddNode}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FileExplorerItem;
