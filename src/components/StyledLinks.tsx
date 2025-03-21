import { Link } from "react-router-dom";
import ArrowIcon from "./icons/ArrowIcon";

const StyledLinks = ({ bgColor }: { bgColor: string }) => {
  return (
    <div className="max-w-7xl w-full relative mt-12">
      <Link to={"/meine_rezepte"} className="w-full">
        {" "}
        <div className="flex-between pb-8 bg-primary w-full headline-2 p-4  rounded-t-3xl group">
          <p className="group-hover:underline">Meine Rezepte</p>
          <div className="rotate-180 hover:opacity-70 transition-opacity">
            <ArrowIcon />
          </div>
        </div>
      </Link>
      <Link to={"/my_grocery_list"} className="w-full">
        {" "}
        <div className="flex-between absolute z-10 top-14 pb-8  bg-neutral w-full headline-2 p-4 rounded-b-3xl group">
          <p className="group-hover:underline">Einkaufsliste</p>
          <div className="rotate-180 hover:opacity-70 transition-opacity">
            <ArrowIcon />
          </div>
        </div>
      </Link>
      <div
        className={` absolute z-20 top-28  ${bgColor} w-full p-4 rounded-t-3xl`}
      ></div>
    </div>
  );
};

export default StyledLinks;
