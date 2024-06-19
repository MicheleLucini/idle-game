import React from "react";

const Settlement = ({
  MAP_DIAMETER_TILES,
  TILE_DIMENSIONS_PX,
  data,
  isMine,
  selectedSettlement,
  setSelectedSettlement,
}) => {
  const mapCenter = MAP_DIAMETER_TILES * TILE_DIMENSIONS_PX;
  const isSelected = selectedSettlement && selectedSettlement.x === data.x && selectedSettlement.y === data.y;
  return (
    <div
      onClick={() => setSelectedSettlement(data)}
      style={{
        position: "absolute",
        top: mapCenter + (data.y * TILE_DIMENSIONS_PX * -1),
        left: mapCenter + (data.x * TILE_DIMENSIONS_PX),
        height: TILE_DIMENSIONS_PX,
        width: TILE_DIMENSIONS_PX,
        backgroundColor: isMine ? "green" : "red",
        outline: isSelected ? "5px solid blue" : "none",
      }}
    />
  );
};

export default Settlement;
