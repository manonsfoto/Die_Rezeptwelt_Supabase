import { SortType } from "../lib/sorting";

const SortingBar = ({
  sortType,
  setSortType,
}: {
  sortType: SortType;
  setSortType: (type: SortType) => void;
}) => {
  return (
    <div className="w-full mb-12 border-b-font-semibold">
      <div className="py-3 flex gap-3" role="group">
        <button
          type="button"
          onClick={() => setSortType("rating")}
          className={`btn-sorting ${
            sortType === "rating"
              ? "rounded-full bg-black text-base-100 "
              : "bg-transparent  hover:bg-gray-100"
          }`}
        >
          Bewertung
        </button>
        <button
          type="button"
          onClick={() => setSortType("asc")}
          className={`btn-sorting ${
            sortType === "asc"
              ? "rounded-full bg-black text-base-100 "
              : "bg-transparent  hover:bg-gray-100"
          }`}
        >
          A-Z
        </button>
        <button
          type="button"
          onClick={() => setSortType("desc")}
          className={`btn-sorting rounded-r-lg ${
            sortType === "desc"
              ? "rounded-full bg-black text-base-100 "
              : "bg-transparent  hover:bg-gray-100"
          }`}
        >
          Z-A
        </button>
      </div>
    </div>
  );
};

export default SortingBar;
