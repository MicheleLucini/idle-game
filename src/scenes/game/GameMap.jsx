import React, { useRef, useState, useEffect } from "react";

import Settlement from "./Settlement.jsx";
import "./gameMap.css";

const GameMap = ({
  TILE_DIMENSIONS_PX,
  MAP_DIAMETER_TILES,
  gameData,
  selectedSettlement,
  setSelectedSettlement,
}) => {
  const containerRef = useRef(null);

  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const [scrollPosition, setScrollPosition] = useState({ x: 0, y: 0 });

  const mapStyle = () => {
    const mapSide = TILE_DIMENSIONS_PX * (MAP_DIAMETER_TILES * 2 + 1);
    return {
      height: mapSide + "px",
      width: mapSide + "px",
    };
  };

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
    const startingTile = {
      x: MAP_DIAMETER_TILES * -1,
      y: MAP_DIAMETER_TILES,
    };
    const firstSettlement = gameData.userSettlements[0];
    containerRef.current.scrollTop = ((startingTile.y - firstSettlement.y) * TILE_DIMENSIONS_PX) - (window.innerHeight / 2);
    containerRef.current.scrollLeft = (((startingTile.x + (firstSettlement.x * -1)) * TILE_DIMENSIONS_PX) * -1) - (window.innerWidth / 2);
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
      <div id="map" style={mapStyle()}>
        <div style={{
          position: "absolute",
          top: (MAP_DIAMETER_TILES * TILE_DIMENSIONS_PX) + "px",
          left: (MAP_DIAMETER_TILES * TILE_DIMENSIONS_PX) + "px",
          height: TILE_DIMENSIONS_PX + "px",
          width: TILE_DIMENSIONS_PX + "px",
          backgroundColor: "grey",
        }} />
        {gameData.userSettlements.map((x) => (
          <Settlement
            MAP_DIAMETER_TILES={MAP_DIAMETER_TILES}
            TILE_DIMENSIONS_PX={TILE_DIMENSIONS_PX}
            key={x.x + "," + x.y} data={x}
            selectedSettlement={selectedSettlement}
            setSelectedSettlement={setSelectedSettlement}
          />
        ))}
        {gameData.visibleSettlements.map((x) => (
          <Settlement
            MAP_DIAMETER_TILES={MAP_DIAMETER_TILES}
            TILE_DIMENSIONS_PX={TILE_DIMENSIONS_PX}
            key={x.x + "," + x.y} data={x}
            selectedSettlement={selectedSettlement}
            setSelectedSettlement={setSelectedSettlement}
          />
        ))}
      </div>
    </div>
  );
};

export default GameMap;
