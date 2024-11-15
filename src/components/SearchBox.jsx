import { useSearchParams } from "react-router-dom";
import { BiSearch } from "react-icons/bi";

export const SearchBox = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") || "";

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchParams({ search: value });
  };

  return (
    <div className="sticky top-0 bg-white z-10 p-4">
      <div className="flex items-center bg-secondary p-2">
        <BiSearch className="w-5 h-5 fill-variant" />
        <input
          className="flex-grow outline-none px-2 py-1 bg-secondary text-variant"
          type="text"
          placeholder="Search for a currency..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
    </div>
  );
};