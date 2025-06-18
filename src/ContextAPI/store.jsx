import { createContext, useState } from "react";
import { tabsData } from "../Data/TabsData";

export const ProjectsContext = createContext(null);

export const ProjectProvider = ({ children }) => {
  const [component, setComponent] = useState(tabsData[0]);

  const handlButtonClick = (id) => {
    const matchedItem = tabsData.find((item) => item.ID === id);
    setComponent(matchedItem);
  };

  return (
    <ProjectsContext.Provider value={{ handlButtonClick, component }}>
      {children}
    </ProjectsContext.Provider>
  );
};
