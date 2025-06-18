import { useState } from "react";
import { tabsData } from "../../Data/TabsData";
import TabButton from "../../Component/TabButton";
export default function TabFeature() {
  const [toggle, setToggel] = useState(false);

  return (
    <aside
      className={`transition-all duration-500 ease-in-out flex-shrink-0 p-4 border-r border-gray-200 bg-gray-50 ${
        toggle ? "w-25" : "w-85"
      }`}
    >
      <div className="flex gap-8 items-center justify-between p-4 mb-4 bg-blue-500 text-white rounded-lg shadow-md">
        {!toggle && (
          <>
            <span className="text-2xl">📂</span>
            <h2 className="text-xl font-bold">Projects Vault</h2>
          </>
        )}
        <span
          className="text-2xl cursor-pointer "
          onClick={() => setToggel(!toggle)}
        >
          {toggle ? "👉" : "👈"}
        </span>
      </div>

      <nav className="space-y-3">
        {tabsData.map((item) => (
          <TabButton key={item.ID} tabData={item} toggle={toggle} />
        ))}
      </nav>
    </aside>
  );
}
