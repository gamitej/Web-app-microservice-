import { Link } from "react-router-dom";
import { pageData } from "./data";

const HomePage = () => {
  return (
    <div className="w-[90%] md:w-[60%] lg:w-[50%] grid grid-cols-12 gap-4 mt-10 m-auto">
      {pageData.map(({ url, title, desc }) => (
        <Link
          to={url}
          key={url}
          className="px-4 py-2 col-span-4 rounded-md shadow-md border flex flex-col gap-1 hover:border-blue-400"
        >
          <h3 className="text-blue-500 uppercase font-[550]">{title}</h3>
          <span className="text-gray-400 capitalize">{desc}</span>
        </Link>
      ))}
    </div>
  );
};

export default HomePage;
