import React, { useMemo, useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";

import {
  cursorPositionPx2Pct,
  cursorXPctToPx,
  cursorYPctToPx,
} from "../../logic/utility";

import "./cursor.css";

const Cursor = ({
  playerId,
  cursorData,
  changeCursorX,
  changeCursorY,
  changeCursorHide,
  changeCursorUp,
  changeCursorDown,
  viewport,
}) => {
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
        cursorData.hide ? "hidden" : null,
        cursorData.mouseDown ? "down" : null,
        cursorData.mouseUp ? "up" : null,
        cursorColor,
      ]
        .filter((x) => !!x)
        .join(" "),
    [cursorColor, cursorData.hide, cursorData.mouseDown, cursorData.mouseUp]
  );

  const handleMouseMove = useCallback(
    (event) => {
      const e = event || window.event;
      const { x, y } = cursorPositionPx2Pct(e.x, e.y, viewport);
      changeCursorX(x);
      changeCursorY(y);
    },
    [changeCursorX, changeCursorY, viewport]
  );

  const handleMouseEnter = useCallback(() => {
    changeCursorHide(false);
  }, [changeCursorHide]);

  const handleMouseLeave = useCallback(() => {
    changeCursorUp(false);
    changeCursorHide(true);
  }, [changeCursorUp, changeCursorHide]);

  const handleMouseDown = useCallback(() => {
    changeCursorUp(false);
    changeCursorDown(true);
  }, [changeCursorUp, changeCursorDown]);

  const handleMouseUp = useCallback(() => {
    changeCursorDown(false);
    changeCursorUp(true);
  }, [changeCursorDown, changeCursorUp]);

  const handleContextMenu = useCallback((event) => {
    event.preventDefault();
    return false;
  }, []);

  useEffect(() => {
    document.onmousemove = handleMouseMove;
    document.onmouseenter = handleMouseEnter;
    document.onmouseleave = handleMouseLeave;
    document.onmousedown = handleMouseDown;
    document.onmouseup = handleMouseUp;
    document.oncontextmenu = handleContextMenu;
  }, [
    handleMouseMove,
    handleMouseEnter,
    handleMouseLeave,
    handleMouseDown,
    handleMouseUp,
    handleContextMenu,
  ]);

  return (
    <div
      className={cursorClass}
      style={{
        transform:
          "translate(" +
          cursorXPctToPx(cursorData.x, viewport) +
          "px, " +
          cursorYPctToPx(cursorData.y, viewport) +
          "px)",
      }}
    >
      <div className="goccia"></div>
      <div className="text">{cursorData.text}</div>
    </div>
  );
};

Cursor.propTypes = {
  playerId: PropTypes.string,
  cursorData: PropTypes.object.isRequired,
  changeCursorX: PropTypes.func.isRequired,
  changeCursorY: PropTypes.func.isRequired,
  changeCursorUp: PropTypes.func.isRequired,
  changeCursorDown: PropTypes.func.isRequired,
  changeCursorHide: PropTypes.func.isRequired,
  viewport: PropTypes.object.isRequired,
};

Cursor.defaultProps = {
  playerId: null,
};

export default Cursor;
