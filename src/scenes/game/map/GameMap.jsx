import React, { useRef, useState, useMemo, useEffect } from "react";

import EmptyCell from "./EmptyCell.jsx";
import MovingTroop from "./MovingTroop.jsx";
import Settlement from "./Settlement.jsx";
import "./gameMap.css";

const GameMap = ({
  MAP_MARGIN_TILES,
  TILE_DIMENSIONS_PX,
  VISIBILITY_RADIUS,
  gameData,
  movements,
  selectedSettlement,
  setSelectedSettlement,
}) => {
  const containerRef = useRef(null);

  const [isDragging, setIsDragging] = useState(false);
  const [scrollPosition, setScrollPosition] = useState({ x: 0, y: 0 });
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });

  const minMapX = Math.min(...gameData.userSettlements.map((x) => x.x)) - MAP_MARGIN_TILES;
  const maxMapX = Math.max(...gameData.userSettlements.map((x) => x.x)) + MAP_MARGIN_TILES + 1;
  const minMapY = Math.min(...gameData.userSettlements.map((x) => x.y)) - MAP_MARGIN_TILES - 1;
  const maxMapY = Math.max(...gameData.userSettlements.map((x) => x.y)) + MAP_MARGIN_TILES;
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

  // Funzione per calcolare la distanza euclidea al quadrato tra due punti
  const euclideanDistanceSquared = (x1, y1, x2, y2) => (x2 - x1) ** 2 + (y2 - y1) ** 2;

  // Funzione per trovare tutte le celle a distanza <= d da (x0, y0)
  const findCellsAtMaxDistance = (x0, y0, d) => {
    const dSquared = d ** 2;
    let cells = [];

    // Iteriamo su tutte le possibili coordinate nell'intervallo [-d, d]
    for (let dx = -d; dx <= d; dx++) {
      for (let dy = -d; dy <= d; dy++) {
        const x = x0 + dx;
        const y = y0 + dy;
        if (euclideanDistanceSquared(x0, y0, x, y) <= dSquared) {
          cells.push({ x, y });
        }
      }
    }

    return cells;
  };

  // Funzione per trovare tutte le celle visibili da un array di villaggi
  const findVisibleCells = (villages, visibilityRadius) => {
    const visibleCellsSet = new Set();
    villages.forEach(village => {
      const cells = findCellsAtMaxDistance(village.x, village.y, visibilityRadius);
      cells.forEach(cell => {
        const key = `${cell.x},${cell.y}`;
        visibleCellsSet.add(key);
      });
    });
    return visibleCellsSet;
  };

  // Funzione per trovare tutte le celle nella mappa
  const findAllCellsInMap = (xMin, yMin, xMax, yMax) => {
    const cells = [];
    for (let x = xMin; x <= xMax; x++) {
      for (let y = yMin; y <= yMax; y++) {
        cells.push({ x, y });
      }
    }
    return cells;
  };

  // Funzione per trovare le celle non visibili
  const nonVisibleCells = useMemo(() => {
    const visibleCellsSet = findVisibleCells(gameData.userSettlements, VISIBILITY_RADIUS);
    const allCells = findAllCellsInMap(minMapX, minMapY, maxMapX, maxMapY);
    const nonVisibleCells = [];
    allCells.forEach(cell => {
      const key = `${cell.x},${cell.y}`;
      if (!visibleCellsSet.has(key)) {
        nonVisibleCells.push(cell);
      }
    });
    return nonVisibleCells;
  }, [gameData.userSettlements, minMapX, minMapY, maxMapX, maxMapY]);

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
        {nonVisibleCells.map((x) => (
          <EmptyCell
            TILE_DIMENSIONS_PX={TILE_DIMENSIONS_PX}
            data={x}
            key={x.x + "," + x.y}
            startingTile={startingTile}
          />
        ))}
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
        {movements.map((x) => (
          <MovingTroop
            TILE_DIMENSIONS_PX={TILE_DIMENSIONS_PX}
            data={x}
            key={x.id}
            startingTile={startingTile}
          />
        ))}
      </div>
    </div>
  );
};

export default GameMap;
