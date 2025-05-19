"use client";
import styles from "./formFields.module.scss";

const RadioButton = ({
  label,
  name,
  value,
  onChange,
  checked,
  radioContainerClass,
}) => {
  return (
    <div className={`${styles.radioContainer} ${radioContainerClass}`}>
      <label className={styles.radioLabel}>
        <input
          type="radio"
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
          className={styles.radioInput}
        />
        <span className={styles.radioButton}></span>
        {label}
      </label>
    </div>
  );
};

export default RadioButton;
