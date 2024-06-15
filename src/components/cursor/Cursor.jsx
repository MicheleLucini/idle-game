import React, { useMemo, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import "./cursor.css";

const Cursor = ({
  cursorData,
  changeCursorX,
  changeCursorY,
  changeCursorHide,
  changeCursorUp,
  changeCursorDown,
  viewport,
}) => {
  // const cursorColor = useMemo(() => {
  //   switch (playerId) {
  //     case "playerBlue":
  //       return "blue";
  //       break;
  //     case "playerRed":
  //       return "red";
  //       break;
  //     case "playerGreen":
  //       return "green";
  //       break;
  //     case "playerYellow":
  //       return "yellow";
  //       break;
  //     default:
  //       return null;
  //       break;
  //   }
  // }, [playerId]);

  const cursorClass = useMemo(() => (
    [
      "cursor",
      cursorData.hide ? "hidden" : null,
      cursorData.mouseDown ? "down" : null,
      cursorData.mouseUp ? "up" : null,
      // cursorColor,
    ]
      .filter((x) => !!x)
      .join(" ")
  ), [cursorData.hide, cursorData.mouseDown, cursorData.mouseUp]);

  const handleMouseMove = useCallback((event) => {
    const e = event || window.event;
    changeCursorX(e.x);
    changeCursorY(e.y);
  }, [changeCursorX, changeCursorY, viewport]);

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
        transform: "translate(" + cursorData.x + "px, " + cursorData.y + "px)",
      }}
    >
      <div className="goccia"></div>
      <div className="text">{cursorData.text}</div>
    </div>
  );
};

Cursor.propTypes = {
  cursorData: PropTypes.object.isRequired,
  changeCursorX: PropTypes.func.isRequired,
  changeCursorY: PropTypes.func.isRequired,
  changeCursorUp: PropTypes.func.isRequired,
  changeCursorDown: PropTypes.func.isRequired,
  changeCursorHide: PropTypes.func.isRequired,
};

export default Cursor;
