import { useState, useMemo, useEffect, useRef } from "react";
import styles from "./multiSelect.module.scss";
import { textTruncateMore } from "@/helper/helper";
import { X, Search } from "lucide-react";
import LogoutSpinner from "../Loader/logout-spinner";

const SingleSelect = ({
  options,
  label = "Select Option",
  onSelectionChange,
  value,
  loader = false,
  crossButton = true,
  disabled = false,
  moduleType,
  handleAddTimeline,
  labelKey,
}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);
  useEffect(() => {
    setSelectedOption(value?.value);
  }, [value]);

  // Handle option selection
  const handleOptionSelect = (option) => {
    setSelectedOption(option?.value);
    setIsOpen(false);
    setSearchQuery("");

    // Call the external callback with the selected option
    if (onSelectionChange) {
      const selectedOptionDetails = options?.find(
        (opt) => opt?.value === option?.value
      );
      onSelectionChange(selectedOptionDetails);
      if (moduleType && labelKey !== "Lead status") {
        const labelValue = selectedOptionDetails?.title;
        handleAddTimeline(labelKey, labelValue);
      }
    }
  };

  // Filter options based on the search query
  const filteredOptions = useMemo(() => {
    return options?.filter((option) =>
      option?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase())
    );
  }, [options, searchQuery]);

  // Generate the display label based on selected option's title
  const displayLabel = selectedOption
    ? options?.find((option) => option?.value === selectedOption)?.title
    : label;

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef?.current &&
        !dropdownRef?.current?.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOpen = () => {
    if (!loader) {
      if (!disabled) {
        setIsOpen(!isOpen);
      }
    }
  };

  return (
    <div className={styles.multiSelect} ref={dropdownRef}>
      <div
        className={styles.header}
        onClick={() => handleOpen()}
        style={
          loader || disabled
            ? { background: "rgb(249, 249, 249)", cursor: "not-allowed" }
            : {}
        }
      >
        {displayLabel ? textTruncateMore(displayLabel, 37) : label}
        {moduleType !== "view" && (
          <div className="flex">
            {selectedOption && crossButton && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedOption(null);
                  setSearchQuery("");
                  setIsOpen(false);
                  onSelectionChange(null);
                }}
              >
                <X style={{ color: "#999", opacity: 0.7 }} />
              </button>
            )}

            <span className={styles.arrow}>
              {loader ? <LogoutSpinner /> : <>{isOpen ? "▲" : "▼"}</>}
            </span>
          </div>
        )}
      </div>
      {isOpen && (
        <div className={styles.dropdownContent}>
          <div className={styles.search_container}>
            <Search className={styles?.searchInputIcon} />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          {filteredOptions?.length > 0 ? (
            <div className={styles.optionList}>
              {filteredOptions?.map((option) => (
                <button
                  type="button"
                  key={option.id}
                  className={`${styles.option} ${
                    selectedOption === option.value ? styles.selected : ""
                  }`}
                  onClick={() => handleOptionSelect(option)}
                >
                  {option?.title}
                  {selectedOption === option.value && (
                    <span className={styles.checkmark}>✓</span>
                  )}
                </button>
              ))}
            </div>
          ) : (
            <div className={styles.noOptions}>No options available</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SingleSelect;
