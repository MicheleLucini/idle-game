import React, { useMemo } from "react";
import PropTypes from "prop-types";

import "./button.css";

const Button = ({ id, text, icon, onClick, disabled, size }) => {
  const buttonClassName = useMemo(
    () =>
      [
        "simple-button",
        disabled ? "disabled" : null,
        !text ? "icon-only" : null,
        size,
      ]
        .filter((x) => !!x)
        .join(" "),
    [disabled, text, size]
  );

  return (
    <button id={id} className={buttonClassName} type="button" onClick={onClick}>
      {icon && <span className="material-icons-round">{icon}</span>}
      {text && text}
    </button>
  );
};

Button.propTypes = {
  id: PropTypes.string,
  text: PropTypes.string,
  icon: PropTypes.string,
  size: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  id: "",
  text: null,
  icon: null,
  size: null,
  onClick: () => {},
  disabled: false,
};

export default Button;
