import React, { useMemo, useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";

import { cursorXPctToPx, cursorYPctToPx } from "../../logic/utility";

import "./cursor.css";

const CursorGhost = ({ playerId, gameData, viewport }) => {
  if (!gameData || !gameData[playerId + "_userName"]) return null;

  const cursorColor = useMemo(() => {
    switch (playerId) {
      case "playerBlue":
        return "blue";
        break;
      case "playerRed":
        return "red";
        break;
      case "playerGreen":
        return "green";
        break;
      case "playerYellow":
        return "yellow";
        break;
      default:
        return null;
        break;
    }
  }, [playerId]);

  const cursorClass = useMemo(
    () =>
      [
        "cursor",
        gameData[playerId + "_cursorHide"] ? "hidden" : null,
        cursorColor,
      ]
        .filter((x) => !!x)
        .join(" "),
    [cursorColor, gameData[playerId + "_cursorHide"]]
  );

  return (
    <div
      className={cursorClass}
      style={{
        transform:
          "translate(" +
          cursorXPctToPx(gameData[playerId + "_cursorX"], viewport) +
          "px, " +
          cursorYPctToPx(gameData[playerId + "_cursorY"], viewport) +
          "px)",
      }}
    >
      <div className="goccia"></div>
      <div className="text">{gameData[playerId + "_cursorText"]}</div>
    </div>
  );
};

CursorGhost.propTypes = {
  playerId: PropTypes.string,
  gameData: PropTypes.object,
  viewport: PropTypes.object.isRequired,
};

CursorGhost.defaultProps = {
  playerId: null,
  gameData: null,
};

export default CursorGhost;
