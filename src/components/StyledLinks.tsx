import { Link } from "react-router-dom";



const StyledLinks = ({ bgColor }: { bgColor: string }) => {
    return (  <div className="w-full relative mt-12">
        <Link to={"/meine_rezepte"} className="w-full">
          {" "}
          <div className="flex items-center justify-between pb-8 bg-primary w-full text-2xl   p-4 font-caprasimo  rounded-t-3xl">
            <p>Meine Rezepte</p>
            <p>→</p>
          </div>
        </Link>
        <Link to={"/my_grocery_list"} className="w-full">
          {" "}
          <div className="flex absolute z-10 top-14 items-center  pb-8 justify-between bg-neutral w-full text-2xl   p-4 font-caprasimo  rounded-t-3xl">
            <p>Einkaufsliste</p>
            <p>→</p>
          </div>
        </Link>
        <div className={` absolute z-20 top-28  ${bgColor} w-full    p-4   rounded-t-3xl`}></div>
      </div> );
}
 
export default StyledLinks;