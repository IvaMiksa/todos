import { setFilter } from "../store/slices/filterSlice";
import { useDispatch, useSelector } from "react-redux";

function Filter() {
  const dispatch = useDispatch();
  const selectedFilter = useSelector((state) => state.filter.selectedFilter);


  const handleChange = (e) => {
    dispatch(setFilter(e.target.value));
  };

  return (
    <div>
      <label>
        <input
          type="radio"
          value="All"
          checked={selectedFilter === "All"}
          onChange={handleChange}
        />
        All
      </label>
      <label>
        <input
          type="radio"
          value="Uncompleted"
          checked={selectedFilter === "Uncompleted"}
          onChange={handleChange}
        />
        Uncompleted
      </label>
      <label>
        <input
          type="radio"
          value="Completed"
          checked={selectedFilter === "Completed"}
          onChange={handleChange}
        />
        Completed
      </label>
    </div>
  );
}

export default Filter;
