import ToDoApp from "../Features/ToDoApp/ToDoApp";
import CountdownTimer from "../Features/CountdownTimer/CountdownTimer";
import ImageGallery from "../Features/ImageGallery/ImageGallery";
import Accordion from "../Features/Accordion/Accordion";
import FileExplorer from "../Features/FileExplorer/FileExplorer";
import CompanyInfo from "../Features/CompanyInformation/CompanyInfo";

export const tabsData = [
  {
    ID: 1,
    Name: "ToDo App",
    Component: ToDoApp,
    Icon: "📝",
    Desc: "A simple task management application to help users organize their daily activities and track progress.",
  },
  {
    ID: 2,
    Name: "Countdown Timer",
    Component: CountdownTimer,
    Icon: "⌛",
    Desc: "Displays the remaining time in days, hours, minutes, and seconds until a specified target date or event",
  },
  {
    ID: 3,
    Name: "Image Gallery",
    Component: ImageGallery,
    Icon: "🖼️",
    Desc: "Displays all the Imgages by feching all the data from API end point and show it Next and Prev will be there ",
  },
  {
    ID: 4,
    Name: "Accordion",
    Component: Accordion,
    Icon: "🪗",
    Desc: "Displays to see a series of stacked, card-like elements, representing the accordion ",
  },
  {
    ID: 5,
    Name: "FileExplorer",
    Component: FileExplorer,
    Icon: "📂",
    Desc: "component in React, focusing on the structure and basic rendering",
  },
  {
    ID: 6,
    Name: "Company's Information",
    Component: CompanyInfo,
    Icon: "ℹ️",
    Desc: "A company description is a concise summary of a business, often used in a business plan or website, and includes elements like history, location, employee conut,URLs, and management",
  },
];
