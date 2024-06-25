import React, { useCallback } from "react";

import "./rangeInput.css";

const RangeInput = ({
  label,
  value,
  setValue,
  min = 0,
  max = 100,
  step = 1,
  disabled,
}) => {
  // const [isActive, setIsActive] = useState(false);

  const onChange = useCallback((e) => {
    setValue(Number(e.target.value));
  }, [setValue]);

  // const onFocus = useCallback(() => {
  //   setIsActive(true);
  // }, []);

  // const onBlur = useCallback(() => {
  //   setIsActive(false);
  // }, []);

  return (
    <div
      className={
        // "range-input" + (isActive ? " active" : "") + (disabled ? " disabled" : "")
        "range-input" + (disabled ? " disabled" : "")
      }
    >
      {label && <label>{label}</label>}
      <input
        type="range"
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        step={step}
        // onFocus={onFocus}
        // onBlur={onBlur}
        disabled={disabled ? "disabled" : false}
      />
      <span className="range-value">{value}</span>
    </div>
  );
};

export default RangeInput;
