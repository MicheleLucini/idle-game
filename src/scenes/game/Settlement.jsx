import React from "react";

const Settlement = ({
  TILE_DIMENSIONS_PX,
  data,
  selectedSettlement,
  setSelectedSettlement,
  startingTile,
}) => {
  const isSelected = selectedSettlement
    && selectedSettlement.x === data.x
    && selectedSettlement.y === data.y;

  return (
    <div
      onClick={() => setSelectedSettlement(data)}
      style={{
        position: "absolute",
        top: (startingTile.y - data.y) * TILE_DIMENSIONS_PX,
        left: (data.x - startingTile.x) * TILE_DIMENSIONS_PX,
        height: TILE_DIMENSIONS_PX,
        width: TILE_DIMENSIONS_PX,
        backgroundColor: data.isMine ? "green" : "red",
        outline: isSelected ? "5px solid blue" : "none",
      }}
    />
  );
};

export default Settlement;
