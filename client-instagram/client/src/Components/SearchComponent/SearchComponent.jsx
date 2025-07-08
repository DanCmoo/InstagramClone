import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "../../Config/Debounce";
import { searchUserAction } from "../../Redux/User/Action";
import "./SearchComponent.css";
import SearchUserCard from "./SearchUserCard";

const SearchComponent = ({setIsSearchVisible}) => {
  const token = localStorage.getItem("token");
  const {user}=useSelector(store=>store);
  const dispatch = useDispatch();
  const handleSearchUser = (query) => {
    const data = {
      jwt: token,
      query,
    };
    dispatch(searchUserAction(data));
  };
  const debouncedHandleSearchUser = debounce(handleSearchUser, 1000);

// Call debouncedHandleSearchUser with a query string

  return (
    <div className="search-container bg-white dark:bg-gray-800 text-black dark:text-gray-100 border-r border-gray-200 dark:border-gray-700">
      <div className="px-3 pb-5">
        <h1 className="text-xl pb-5 text-black dark:text-gray-100">Buscar</h1>

        <input
          onChange={(e) =>debouncedHandleSearchUser(e.target.value)}
          className="search-input bg-gray-100 dark:bg-gray-700 text-black dark:text-gray-100 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400"
          type="text"
          placeholder="Buscar..."
        />
      </div>

      <hr className="border-gray-200 dark:border-gray-700" />
      <div className="px-3 pt-5">
        {!user?.searchResult?.isError?user?.searchResult?.map((item) => (
          <SearchUserCard setIsSearchVisible={setIsSearchVisible} key={item.id} username={item.username} image={item?.image}/>
        )):<h1 className="pt-10 font-bold text-center text-black dark:text-gray-100">Usuario no encontrado</h1>}
      </div>
    </div>
  );
};

export default SearchComponent;
