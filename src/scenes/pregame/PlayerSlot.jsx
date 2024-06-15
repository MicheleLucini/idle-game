import React, { useMemo, useCallback } from "react";
import PropTypes from "prop-types";

import "./pregame.css";

const PlayerSlot = ({ color, userName, itsAMe, onSelectPlayer }) => {
  const customClass = useMemo(
    () =>
      ["player", color, userName ? null : "locked"]
        .filter((x) => !!x)
        .join(" "),
    [color, userName]
  );

  const spanText = useMemo(() => {
    if (!userName) return "Player " + color + " (bot)";
    if (itsAMe) return userName + " (you)";
    return userName;
  }, [userName, color, itsAMe]);

  return (
    <div className={customClass} onClick={onSelectPlayer}>
      {userName ? (
        <span className="icon material-icons-round">face</span>
      ) : (
        <span className="icon material-icons-outlined">smart_toy</span>
      )}
      <span>{spanText}</span>
    </div>
  );
};

PlayerSlot.propTypes = {
  color: PropTypes.oneOf(["blue", "red", "green", "yellow"]).isRequired,
  userName: PropTypes.string,
  itsAMe: PropTypes.bool.isRequired,
  onSelectPlayer: PropTypes.func.isRequired,
};

PlayerSlot.defaultProps = {
  userName: null,
};

export default PlayerSlot;
