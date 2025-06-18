import { useState } from "react";
import { accordionItems } from "../../Data/AccordionItems";

const Accordion = () => {
  const [toggel, setToggel] = useState(1);
  const handleClick = (id) => {
    setToggel((prev) => (prev === id ? null : id));
  };

  return (
    <div className="flex flex-col items-center p-6 pt-0">
      <div className="w-full max-w-xl rounded-lg  overflow-hidden ">
        {accordionItems.map((item) => (
          <div
            key={item.id}
            className="border-b border-gray-200 last:border-b-0 mb-2"
          >
            <div
              className="flex justify-between items-center p-4 cursor-pointer bg-blue-50 rounded-lg shadow-inner border border-blue-200 hover:bg-gray-50 text-blue-700"
              onClick={() => {
                handleClick(item.id);
              }}
            >
              <div className="w-3/4 rounded text-[18px] font-bold">
                {item.id}:- {item.title}
              </div>
              <div
                role="button"
                aria-label="Down Arrow"
                className="h-5 w-5 bg-gray-200 rounded-full flex items-center justify-center text-gray-500"
              >
                {toggel === item.id ? "🔺" : "🔻"}
              </div>
            </div>
            {toggel === item.id ? (
              <div className="p-4 bg-gray-50 border-t border-gray-100 text-gray-700">
                <div className="space-y-2">
                  <div className="rounded w-full">
                    <pre className="whitespace-break-spaces">
                      {item.content}
                    </pre>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Accordion;
