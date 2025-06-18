import { useContext } from "react";
import Header from "../Header/Header";
import { ProjectsContext } from "../../ContextAPI/store";

export default function MainLayout() {
  const { component } = useContext(ProjectsContext);
  const RenderComponent = component.Component;
  return (
    <main className="flex-1 p-4 bg-white overflow-y-auto">
      <div className="bg-white rounded-lg p-4 shadow-md border border-gray-200">
        <Header component={component} />
        <RenderComponent />
      </div>
    </main>
  );
}
