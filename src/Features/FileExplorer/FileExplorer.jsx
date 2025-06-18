import React, { useState } from "react";
import FileExplorerItem from "./FileExplorerItem";

const generateId = () =>
  Date.now().toString(36) + Math.random().toString(36).substring(2, 5);

const FileExplorer = () => {
  const [fileSystem, setFileSystem] = useState([
    {
      id: "root-1",
      name: "Documents",
      type: "folder",
      children: [
        { id: "doc-1", name: "Resume.pdf", type: "file" },
        { id: "doc-2", name: "MeetingNotes.docx", type: "file" },
        {
          id: "doc-folder-1",
          name: "Projects",
          type: "folder",
          children: [
            { id: "proj-1", name: "ProjectA_Report.xlsx", type: "file" },
            { id: "proj-2", name: "ProjectB_Specs.pdf", type: "file" },
          ],
        },
      ],
    },
    {
      id: "root-2",
      name: "Pictures",
      type: "folder",
      children: [
        { id: "pic-1", name: "Vacation2024.jpg", type: "file" },
        { id: "pic-2", name: "ProfilePic.png", type: "file" },
      ],
    },
    { id: "root-3", name: "README.md", type: "file" },
  ]);

  const addNode = (parentId, name, type) => {
    const newNode = {
      id: generateId(),
      name: name,
      type: type,
      ...(type === "folder" && { children: [] }),
    };

    const insertNode = (nodes, targetParentId, nodeToAdd) => {
      return nodes.map((node) => {
        if (node.id === targetParentId) {
          return {
            ...node,
            children: node.children
              ? [...node.children, nodeToAdd]
              : [nodeToAdd],
          };
        }
        if (node.type === "folder" && node.children) {
          return {
            ...node,
            children: insertNode(node.children, targetParentId, nodeToAdd),
          };
        }
        return node;
      });
    };

    setFileSystem((prevFileSystem) =>
      insertNode(prevFileSystem, parentId, newNode)
    );
  };

  return (
    <div className="font-sans border border-gray-300 p-6 rounded-xl w-100 mx-auto shadow-lg bg-white">
      <div className="pt-5">
        {fileSystem.map((item) => (
          <FileExplorerItem key={item.id} item={item} onAddNode={addNode} />
        ))}
      </div>
    </div>
  );
};

export default FileExplorer;
