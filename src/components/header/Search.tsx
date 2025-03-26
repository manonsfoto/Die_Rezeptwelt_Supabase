import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  function handleSearchButton() {
    if (searchInputRef.current) {
      const searchQuery = searchInputRef.current.value.trim();
      if (searchQuery) {
        navigate(`/search?q=${encodeURIComponent(searchQuery)}&category=`);
        searchInputRef.current.value = "";
      }
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      handleSearchButton();
    }
  }

  return (
    <div className="card-body">
      <input
        ref={searchInputRef}
        type="text"
        name="searchInput"
        placeholder="Rezept suchen..."
        className="input input-bordered rounded-full"
        onKeyDown={handleKeyDown}
      />

      <button type="button" className="btn-action" onClick={handleSearchButton}>
        Suchen
      </button>
    </div>
  );
};

export default Search;
