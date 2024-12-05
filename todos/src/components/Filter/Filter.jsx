import PropTypes from "prop-types";

function Filter({ options, placeholder, selectedValue, onChange }) {
  return (
    <div className="w-full flex items-center space-x-4">
      <div className="flex items-center space-x-2">
        <label htmlFor="filter" className="sr-only">
          {placeholder}
        </label>
        <select
          id="filter"
          value={selectedValue || ""}
          onChange={(e) => onChange(e.target.value)}
          className={`rounded-sm p-2 ${
            selectedValue ? "text-black" : "text-gray-400"
          }`}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

Filter.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  placeholder: PropTypes.string,
  selectedValue: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default Filter;
