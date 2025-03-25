import { categories, SortType } from "../lib/sorting";


const SortingBar = ({
  sortType,
  setSortType,
  selectedCategory,
  setSelectedCategory,
}: {
  sortType: SortType;
  setSortType: (type: SortType) => void;
  selectedCategory?: string;
  setSelectedCategory?: (category: string) => void;
}) => {
  return (
    <div className="w-full mb-12 border-b-font-semibold">
      <div className="py-3 flex flex-col gap-6">
   
        <div className="flex flex-wrap gap-3" role="group">
    
          <button
            type="button"
            onClick={() => setSortType("rating")}
            className={`btn-sorting ${
              sortType === "rating"
                ? "rounded-full bg-black text-base-100 "
                : "bg-transparent hover:bg-gray-100"
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
                : "bg-transparent hover:bg-gray-100"
            }`}
          >
            A-Z
          </button>
          <button
            type="button"
            onClick={() => setSortType("desc")}
            className={`btn-sorting ${
              sortType === "desc"
                ? "rounded-full bg-black text-base-100 "
                : "bg-transparent hover:bg-gray-100"
            }`}
          >
            Z-A
          </button>

       
          {selectedCategory !== undefined && setSelectedCategory && (
            <div className="border-l-2 border-black h-10 mx-2"></div>
          )}

    
          {selectedCategory !== undefined &&
            setSelectedCategory &&
            categories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => setSelectedCategory(category.id)}
                className={`btn-sorting ${
                  selectedCategory === category.id
                    ? "rounded-full bg-black text-base-100"
                    : "bg-transparent hover:bg-gray-100"
                }`}
              >
                {category.name}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SortingBar;
