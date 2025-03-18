import { Link } from "react-router-dom";
import ArrowIcon from "../assets/SVG/ArrowIcon";

const StyledLinks = ({ bgColor }: { bgColor: string }) => {
  return (
    <div className="w-full relative mt-12">
      <Link to={"/meine_rezepte"} className="w-full">
        {" "}
        <div className="flex items-center justify-between pb-8 bg-primary w-full text-2xl p-4 font-caprasimo rounded-t-3xl group">
          <p className="group-hover:underline">Meine Rezepte</p>
          <div className="rotate-180 hover:opacity-70 transition-opacity">
            <ArrowIcon />
          </div>
        </div>
      </Link>
      <Link to={"/my_grocery_list"} className="w-full">
        {" "}
        <div className="flex absolute z-10 top-14  items-center  pb-8 justify-between bg-neutral w-full text-2xl   p-4 font-caprasimo  rounded-b-3xl group">
          <p className="group-hover:underline">Einkaufsliste</p>
          <div className="rotate-180 hover:opacity-70 transition-opacity">
            <ArrowIcon />
          </div>
        </div>
      </Link>
      <div
        className={` absolute z-20 top-28  ${bgColor} w-full    p-4   rounded-t-3xl`}
      ></div>
    </div>
  );
};

export default StyledLinks;
