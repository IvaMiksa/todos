import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function SearchBar({
  value,
  onChange,
  placeholder = "Search...",
  className = "",
  type = "text",
  icon = faSearch,
}) {
  return (
    <div className="relative flex items-center w-full">
      <FontAwesomeIcon
        icon={icon}
        className="absolute left-3 text-gray-300 w-4 h-4"
      />
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`pl-10 pr-4 py-2 w-full rounded-lg rounded-sm shadow border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-800 ${className}`}
      />
    </div>
  );
}

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string,
  icon: PropTypes.object,  
};

export default SearchBar;
