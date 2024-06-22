import React, { useRef, useState, useEffect } from "react";

import Settlement from "./Settlement.jsx";
import "./gameMap.css";

const GameMap = ({
  MAP_MARGIN_TILES,
  TILE_DIMENSIONS_PX,
  gameData,
  selectedSettlement,
  setSelectedSettlement,
}) => {
  const containerRef = useRef(null);

  const [isDragging, setIsDragging] = useState(false);
  const [scrollPosition, setScrollPosition] = useState({ x: 0, y: 0 });
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });

  const minMapX = Math.min(gameData.userSettlements.map((x) => x.x)) - MAP_MARGIN_TILES;
  const maxMapX = Math.max(gameData.userSettlements.map((x) => x.x)) + MAP_MARGIN_TILES + 1;
  const minMapY = Math.min(gameData.userSettlements.map((x) => x.y)) - MAP_MARGIN_TILES - 1;
  const maxMapY = Math.max(gameData.userSettlements.map((x) => x.y)) + MAP_MARGIN_TILES;
  const startingTile = { x: minMapX, y: maxMapY };

  const mapStyle = {
    height: ((maxMapY - minMapY) * TILE_DIMENSIONS_PX) + "px",
    width: ((maxMapX - minMapX) * TILE_DIMENSIONS_PX) + "px",
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
    const tileOffset = TILE_DIMENSIONS_PX / 2;
    const firstSettlement = gameData.userSettlements[0];
    const windowHeightOffset = window.innerHeight / 2;
    const windowWidthOffset = window.innerWidth / 2;
    const firstSettlemetTop = (startingTile.y - firstSettlement.y) * TILE_DIMENSIONS_PX;
    const firstSettlemetLeft = (firstSettlement.x - startingTile.x) * TILE_DIMENSIONS_PX;
    containerRef.current.scrollTop = firstSettlemetTop - windowHeightOffset + tileOffset;
    containerRef.current.scrollLeft = firstSettlemetLeft - windowWidthOffset + tileOffset;
  }, []);

  return (
    <div
      id="gameMap"
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseUp}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      ref={containerRef}
    >
      <div id="map" style={mapStyle}>
        {gameData.userSettlements.map((x) => (
          <Settlement
            TILE_DIMENSIONS_PX={TILE_DIMENSIONS_PX}
            data={x}
            key={x.x + "," + x.y}
            selectedSettlement={selectedSettlement}
            setSelectedSettlement={setSelectedSettlement}
            startingTile={startingTile}
          />
        ))}
        {gameData.visibleSettlements.map((x) => (
          <Settlement
            TILE_DIMENSIONS_PX={TILE_DIMENSIONS_PX}
            data={x}
            key={x.x + "," + x.y}
            selectedSettlement={selectedSettlement}
            setSelectedSettlement={setSelectedSettlement}
            startingTile={startingTile}
          />
        ))}
      </div>
    </div>
  );
};

export default GameMap;
