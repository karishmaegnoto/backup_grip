import { useState, useMemo, useEffect, useRef } from "react";
import styles from "./multiSelect.module.scss";
import { textTruncateMore } from "@/helper/helper";
import { X, Search } from "lucide-react";
import LogoutSpinner from "../Loader/logout-spinner";
import useToastContext from "@/hooks/useToastContext";
import Tooltip from "../tooltip/page";

const MultiSelect = ({
  options,
  label = "Select Options",
  onSelectionChange,
  value,
  loader = false,
  maxLimit,
  moduleType,
  handleAddTimeline,
  labelKey,
}) => {
  const notification = useToastContext();

  const [selectedOptionIds, setSelectedOptionIds] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    const ids = value?.map((el) => el?.value);
    setSelectedOptionIds(ids || []);
  }, [value]);

  const toggleOption = (option) => {
    const isSelected = selectedOptionIds.includes(option.value);
    let updatedSelection;

    if (isSelected) {
      updatedSelection = selectedOptionIds.filter(
        (itemId) => itemId !== option.value
      );
    } else if (!maxLimit || selectedOptionIds.length < maxLimit) {
      updatedSelection = [...selectedOptionIds, option.value];
    } else {
      return notification.error(
        `You have reached the max limit. The max limit is ${maxLimit}.`
      );
    }

    setSelectedOptionIds(updatedSelection);

    if (onSelectionChange) {
      const updatedSelectedOptions = options.filter((opt) =>
        updatedSelection.includes(opt.value)
      );
      onSelectionChange(updatedSelectedOptions);
      if (moduleType && updatedSelectedOptions?.length > 0) {
        const titleValue = updatedSelectedOptions
          ?.map((item) => item.title)
          .join(", ");
        const labelValue = titleValue;
        handleAddTimeline(labelKey, labelValue);
      }
    }
  };

  // Filter options based on the search query
  const filteredOptions = useMemo(() => {
    return options.filter((option) =>
      option.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [options, searchQuery]);

  // Generate the display label based on selected options' titles
  const displayLabel =
    selectedOptionIds.length > 0
      ? options
          .filter((option) => selectedOptionIds.includes(option.value))
          .map((option) => option.title)
          .join(", ")
      : label;

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.multiSelect} ref={dropdownRef}>
      <div
        className={styles.header}
        onClick={() => !loader && setIsOpen(!isOpen)}
        style={
          loader
            ? { background: "rgb(249, 249, 249)", cursor: "not-allowed" }
            : {}
        }
      >
        {selectedOptionIds?.length > 0 ? (
          <Tooltip content={displayLabel} position="bottom">
            {textTruncateMore(displayLabel, 37)}
          </Tooltip>
        ) : (
          textTruncateMore(displayLabel, 37)
        )}
        {moduleType !== "view" && (
          <div className="flex">
            {selectedOptionIds?.length > 0 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedOptionIds([]);
                  setSearchQuery("");
                  setIsOpen(false);
                  onSelectionChange([]);
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
                    selectedOptionIds.includes(option.value)
                      ? styles.selected
                      : ""
                  }`}
                  onClick={() => toggleOption(option)}
                >
                  {option?.title}
                  {selectedOptionIds.includes(option.value) && (
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

export default MultiSelect;
