import React, { useRef, useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";

import "./gameMap.css";

const GameMap = ({
}) => {
  const containerRef = useRef(null);

  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const [scrollPosition, setScrollPosition] = useState({ x: 0, y: 0 });

  const handleMouseDown = (event) => {
    const e = event || window.event;
    setIsDragging(true);
    setStartPosition({ x: e.clientX, y: e.clientY });
    setScrollPosition({ x: containerRef.current.scrollLeft, y: containerRef.current.scrollTop });
  };

  const handleMouseMove = (event) => {
    if (!isDragging) return;
    const e = event || window.event;
    const dx = e.clientX - startPosition.x;
    const dy = e.clientY - startPosition.y;
    containerRef.current.scrollLeft = scrollPosition.x - dx;
    containerRef.current.scrollTop = scrollPosition.y - dy;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      id="gameMap"
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div id="map"></div>
    </div>
  );
};

GameMap.propTypes = {
};

export default GameMap;
