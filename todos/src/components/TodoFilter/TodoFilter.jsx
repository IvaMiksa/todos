import { useDispatch, useSelector } from "react-redux";
import Filter from "../Filter/Filter";
import { setFilter } from "../../store/slices/filterSlice";

function TodoFilter() {
  const dispatch = useDispatch();
  const selectedFilter = useSelector((state) => state.filter.filter);
  const filterOptions = ["All", "Completed", "Uncompleted"];

  const handleFilterChange = (value) => {
    dispatch(setFilter(value));
  };
  
  return (
    <Filter
      options={filterOptions}
      selectedValue={selectedFilter === "All" ? "" : selectedFilter}
      onChange={handleFilterChange}
      placeholder="Filter by status"
    />
  );
}

export default TodoFilter;
