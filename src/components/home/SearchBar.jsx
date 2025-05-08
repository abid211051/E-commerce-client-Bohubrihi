import React from "react";
import { getProducts } from "../../api/apiProduct";
import { Search } from "lucide-react";

const SearchBar = (props) => {
  const { handleSearch, sortBy, order, limit, skip } = props;
  const handleform = (e) => {
    e.preventDefault();
    const search = e.target.search.value;

    getProducts(sortBy, order, limit, skip, search)
      .then((response) => {
        handleSearch(response.data.product, search);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <div className="w-full bg-gradient-to-r from-zinc-900 to-slate-700 py-3 px-2">
      <form
        action=""
        className="w-full flex justify-end items-center"
        onSubmit={handleform}
      >
        <div className="flex w-fit border-2 items-center text-white pl-1 rounded-md">
          <Search />
          <input
            onChange={(e) => handleSearch(null, e.target.value)}
            name="search"
            type="search"
            className="p-2 sm:w-[300px] text-white"
            placeholder="Search Products"
          />
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
