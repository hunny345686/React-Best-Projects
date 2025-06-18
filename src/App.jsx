import TabFeature from "./Features/TabFeature/TabFeature";
import MainLayout from "./Layout/MainLayout/MainLayout";
import "./App.css";
import { ProjectProvider } from "./ContextAPI/store";

function App() {
  return (
    <ProjectProvider>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4 font-sans">
        <div className="w-full max-w-6xl bg-white rounded-xl shadow-xl flex flex-col md:flex-row overflow-hidden">
          <TabFeature />
          <MainLayout />
        </div>
      </div>
    </ProjectProvider>
  );
}

export default App;
