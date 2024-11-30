import { useState } from "react";
import { setStatus } from "../store/slices/filterSlice";
import { useDispatch, useSelector } from "react-redux";

function Filter() {
  const dispatch = useDispatch();
  const selectedStatus = useSelector((state) => state.filter.selectedFilter);
  const [isSelected, setIsSelected] = useState(false);
  //const selectedPriority = useSelector(
  //  (state) => state.filter.selectedPriority
  //);

  const handleChange = (value) => {
    setIsSelected(true);
    dispatch(setStatus(value));
  };

  return (
    <div className="w-full flex items-center space-x-4">
      {/*<div className="flex items-center space-x-2">
       <span>Filter by: </span>

        
        <label htmlFor="priority-filter">
          <strong className="mr-2">Priority</strong>
        </label>
        <select
          value={selectedPriority}
          onChange={(e) => dispatch(setPriority(e.target.value))}
          className="rounded-sm p-2 mr-2"
        >
          <option value="All">All</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>*/}

      <div className="flex items-center space-x-2">
        {/*<label htmlFor="status-filter">
          <strong className="mr-2">Status</strong>
        </label>*/}
        <select
          value={isSelected ? selectedStatus : "Filter by status"}
          onChange={(e) => handleChange(e.target.value)}
          className={`rounded-sm p-2 ${
            isSelected ? "text-black" : "text-gray-400"
          }`}
        >
          <option value="Filter by status" disabled>
            Filter by status
          </option>
          <option value="All">All</option>
          <option value="Completed">Completed</option>
          <option value="Uncompleted">Uncompleted</option>
        </select>
      </div>

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
