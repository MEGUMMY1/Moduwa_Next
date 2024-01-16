import React, { useState } from "react";
import styles from "./homeEvent_Sorter.module.css";

interface EventSorterProps {
  onSortChange: (newSortOption: string) => void;
}
const EventSorter: React.FC<EventSorterProps> = ({ onSortChange }) => {
  const [selectedSort, setSelectedSort] = useState("최신순");
  const [selectedDistance, setSelectedDistance] = useState("500m");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isDistanceOpen, setIsDistanceOpen] = useState(false);

  const sortOptions = ["최신순", "마감순", "날짜순"];
  const distanceOptions = ["500m", "1Km", "3Km", "5Km"];

  const handleSortChange = (value: string) => {
    setSelectedSort(value);
    setIsSortOpen(false);
    onSortChange(value); // 상위 컴포넌트로 정렬 옵션 전달 ****
  };

  const handleDistanceChange = (value: string) => {
    setSelectedDistance(value);
    setIsDistanceOpen(false);
  };

  return (
    <div className={styles.eventSorter}>
      <div className={styles.dropdown}>
        <button
          className={styles.dropdownButton}
          onClick={() => setIsSortOpen(!isSortOpen)}
        >
          {selectedSort}
        </button>
        {isSortOpen && (
          <div className={styles.dropdownContent}>
            {sortOptions.map((option, index) => (
              <div
                key={index}
                onClick={() => handleSortChange(option)}
                className={styles.dropdownItem}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className={styles.dropdown}>
        <button
          className={styles.dropdownButton}
          onClick={() => setIsDistanceOpen(!isDistanceOpen)}
        >
          {selectedDistance}
        </button>
        {isDistanceOpen && (
          <div className={styles.dropdownContent}>
            {distanceOptions.map((option, index) => (
              <div
                key={index}
                onClick={() => handleDistanceChange(option)}
                className={styles.dropdownItem}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventSorter;
