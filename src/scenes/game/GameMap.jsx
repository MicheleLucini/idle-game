import React, { useRef, useState, useMemo, useCallback, useEffect } from "react";
import PropTypes from "prop-types";

import "./gameMap.css";

const GameMap = ({
  TILE_DIMENSIONS_PX,
  MAP_DIAMETER_TILES,
}) => {
  const containerRef = useRef(null);

  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const [scrollPosition, setScrollPosition] = useState({ x: 0, y: 0 });

  const mapStyle = useMemo(() => ({
    height: TILE_DIMENSIONS_PX * (MAP_DIAMETER_TILES * 2 + 1),
    width: TILE_DIMENSIONS_PX * (MAP_DIAMETER_TILES * 2 + 1),
  }), [TILE_DIMENSIONS_PX, MAP_DIAMETER_TILES]);

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

  useEffect(() => {
    containerRef.current.scrollLeft =
      MAP_DIAMETER_TILES * TILE_DIMENSIONS_PX - (window.innerWidth / 2);
    containerRef.current.scrollTop =
      MAP_DIAMETER_TILES * TILE_DIMENSIONS_PX - (window.innerHeight / 2);
  }, []);

  return (
    <div
      id="gameMap"
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div id="map" style={mapStyle}>
        <div style={{
          position: "absolute",
          top: MAP_DIAMETER_TILES * TILE_DIMENSIONS_PX,
          left: MAP_DIAMETER_TILES * TILE_DIMENSIONS_PX,
          height: TILE_DIMENSIONS_PX,
          width: TILE_DIMENSIONS_PX,
          backgroundColor: "olive",
        }} />
      </div>
    </div>
  );
};

GameMap.propTypes = {
  TILE_DIMENSIONS_PX: PropTypes.number,
  MAP_DIAMETER_TILES: PropTypes.number,
};

export default GameMap;
