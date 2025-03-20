import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  function handleSearchButton() {
    if (searchInputRef.current) {
      navigate(`/search?q=${encodeURIComponent(searchInputRef.current.value)}`);
    }
  }
  return (
    <div className="card-body">
      <input
        ref={searchInputRef}
        type="text"
        name="searchInput"
        placeholder="Search"
        className="input input-bordered rounded-full "
      />

      <button
        type="button"
        className="btn bg-black hover:text-black text-base-100 btn-block rounded-full"
        onClick={handleSearchButton}
      >
        Search
      </button>
    </div>
  );
};

export default Search;
