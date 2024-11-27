import { setSearch } from "../store/slices/todoSlice";
import { useDispatch, useSelector } from "react-redux";

function SearchBar() {
  const dispatch = useDispatch();
  const search = useSelector((store) => store.todo.search);

  const handleChange = (e) => {
    dispatch(setSearch(e.target.value));
    //console.log(e.target.value);
  };

  return (
    <div className="w-full">
      <input
        type="text"
        placeholder="Search todos"
        value={search}
        onChange={handleChange}
        className="p-2 rounded-sm w-full"
      />
    </div>
  );
}

export default SearchBar;
