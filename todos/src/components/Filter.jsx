import { setStatus, setPriority } from "../store/slices/filterSlice";
import { useDispatch, useSelector } from "react-redux";

function Filter() {
  const dispatch = useDispatch();
  const selectedStatus = useSelector((state) => state.filter.selectedFilter);
  const selectedPriority = useSelector(
    (state) => state.filter.selectedPriority
  );

  return (
    <div>
      <span>Filter by: </span>
      <label htmlFor="priority-filter">
        <strong>Priority</strong>
      </label>
      <select
        value={selectedPriority}
        onChange={(e) => dispatch(setPriority(e.target.value))}
      >
        <option value="All">All</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>

      <label htmlFor="status-filter">
        <strong>Status</strong>
      </label>
      <select
        value={selectedStatus}
        onChange={(e) => dispatch(setStatus(e.target.value))}
      >
        <option value="All">All</option>
        <option value="Completed">Completed</option>
        <option value="Uncompleted">Uncompleted</option>
      </select>

      {/*Radio buttons
      <label>
        <input
          type="radio"
          value="All"
          checked={selectedFilter === "All"}
          onChange={(e) => dispatch(setFilter(e.target.value))}
        />
        All
      </label>
      <label>
        <input
          type="radio"
          value="Uncompleted"
          checked={selectedFilter === "Uncompleted"}
          onChange={(e) => dispatch(setFilter(e.target.value))}
        />
        Uncompleted
      </label>
      <label>
        <input
          type="radio"
          value="Completed"
          checked={selectedFilter === "Completed"}
          onChange={(e) => dispatch(setFilter(e.target.value))}
        />
        Completed
      </label>*/}
    </div>
  );
}

export default Filter;
