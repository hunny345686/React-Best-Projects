import { useContext } from "react";
import { ProjectsContext } from "../ContextAPI/store";

export default function TabButton({ tabData, toggle }) {
  const { ID, Name, Icon, Desc } = tabData;
  const words = Desc.split(" ");
  const firstSixWords = words.slice(0, 4);
  const result = firstSixWords.join(" ");
  const { handlButtonClick, component } = useContext(ProjectsContext);
  return (
    <button
      onClick={() => handlButtonClick(ID)}
      className={`
      w-full p-3 border-l-4 rounded-lg flex items-start gap-2 cursor-pointer transition-all duration-200 ease-in-out
      ${
        component.ID === ID
          ? "border-blue-500 bg-blue-50 text-blue-800 shadow-md"
          : "border-transparent bg-gray-50 text-gray-700 hover:bg-gray-100 hover:border-gray-300 shadow-sm"
      }
    `}
    >
      <span className="text-2xl flex-shrink-0">{Icon}</span>
      {!toggle && (
        <div className="tab-tile-desc-box text-left flex-grow">
          <p className="name text-base font-semibold text-gray-900 pb-1">
            {Name}
          </p>
          <p className="desc text-sm text-gray-600">{result}</p>
        </div>
      )}
    </button>
  );
}
