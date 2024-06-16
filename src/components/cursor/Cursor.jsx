import React, { useState, useMemo, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import "./cursor.css";

const Cursor = ({ }) => {
  const [clientCursor, setClientCursor] = useState({
    x: 0,
    y: 0,
    mouseUp: false,
    mouseDown: false,
    hide: true,
    text: "",
  });

  const changeCursorX = useCallback((newValue) => {
    setClientCursor((prev) => ({
      ...prev,
      x: newValue,
      hide: false,
    }));
  }, []);
  const changeCursorY = useCallback((newValue) => {
    setClientCursor((prev) => ({
      ...prev,
      y: newValue,
      hide: false,
    }));
  }, []);
  const changeCursorUp = useCallback((newValue) => {
    setClientCursor((prev) => ({
      ...prev,
      mouseUp: newValue,
    }));
  }, []);
  const changeCursorDown = useCallback((newValue) => {
    setClientCursor((prev) => ({
      ...prev,
      mouseDown: newValue,
    }));
  }, []);
  const changeCursorHide = useCallback((newValue) => {
    setClientCursor((prev) => ({
      ...prev,
      hide: newValue,
    }));
  }, []);

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
      clientCursor.hide ? "hidden" : null,
      clientCursor.mouseDown ? "down" : null,
      clientCursor.mouseUp ? "up" : null,
      // cursorColor,
    ]
      .filter((x) => !!x)
      .join(" ")
  ), [clientCursor.hide, clientCursor.mouseDown, clientCursor.mouseUp]);

  const handleMouseMove = useCallback((event) => {
    const e = event || window.event;
    changeCursorX(e.x);
    changeCursorY(e.y);
  }, [changeCursorX, changeCursorY]);

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
        transform: "translate(" + clientCursor.x + "px, " + clientCursor.y + "px)",
      }}
    >
      <div className="goccia"></div>
      <div className="text">{clientCursor.text}</div>
    </div>
  );
};

Cursor.propTypes = {};

export default Cursor;
