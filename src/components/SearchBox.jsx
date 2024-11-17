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
    <div className="sticky top-0 bg-primary-light dark:bg-primary-dark z-10 py-4 px-[20px] md:px-[40px] lg:px-[120px]">
      <div className="flex items-center bg-secondary dark:bg-variant-dark p-2">
        <BiSearch className="w-5 h-5 fill-variant-dark dark:fill-primary-light" />
        <input
          className="flex-grow outline-none px-2 py-1 bg-secondary dark:bg-variant-dark text-variant-dark dark:text-primary-light"
          type="text"
          placeholder="Search for a currency eg EUR..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
    </div>
  );
};