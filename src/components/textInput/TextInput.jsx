import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";

import "./textInput.css";

const TextInput = ({
  label,
  value,
  setValue,
  placeholder,
  disabled,
  onKeyPressEnter,
}) => {
  const [isActive, setIsActive] = useState(false);

  const onChange = useCallback((e) => {
    setValue(e.target.value);
  });
  const onFocus = useCallback(() => {
    setIsActive(true);
  });
  const onBlur = useCallback(() => {
    setIsActive(false);
  });
  const onKeyPress = useCallback((e) => {
    if (!e) e = window.event;
    var keyCode = e.code || e.key;
    if (keyCode === "Enter" && onKeyPressEnter) {
      onKeyPressEnter();
      return false;
    }
  });

  return (
    <div
      className={
        "text-input" + (isActive ? " active" : "") + (!!value ? " filled" : "")+ (disabled ? " disabled" : "")
      }
    >
      <label>{label}</label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        // validate={validate}
        placeholder={placeholder}
        onFocus={onFocus}
        onBlur={onBlur}
        required="required"
        onKeyPress={onKeyPress}
        disabled={disabled ? "disabled" : false}
      />
      {/* <p>// place for errors</p> */}
    </div>
  );
};

TextInput.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  setValue: PropTypes.func.isRequired,
  // validate: PropTypes.func,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  onKeyPressEnter: PropTypes.func,
};

TextInput.defaultProps = {
  label: null,
  value: null,
  // validate: () => {},
  placeholder: null,
  disabled: false,
  onKeyPressEnter: null,
};

export default TextInput;
