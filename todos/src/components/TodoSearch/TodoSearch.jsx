import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../SearchBar/SearchBar";
import { setSearch } from "../../store/slices/todoSlice";

function TodoSearch() {
  const dispatch = useDispatch();
  const search = useSelector((store) => store.todo.search) || "";

  const handleSearchChange = (e) => {
    dispatch(setSearch(e.target.value));
  };

  return (
    <div className="w-full">
      <SearchBar
        value={search}
        onChange={handleSearchChange}
        placeholder="Search todos"
        className="p-2 rounded-sm w-full"
        type="text"
      />
    </div>
  );
}

export default TodoSearch;
