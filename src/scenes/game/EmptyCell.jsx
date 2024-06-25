import React from "react";

const EmptyCell = ({
  TILE_DIMENSIONS_PX,
  data,
  startingTile,
}) => {
  return (
    <div
      style={{
        position: "absolute",
        top: (startingTile.y - data.y) * TILE_DIMENSIONS_PX,
        left: (data.x - startingTile.x) * TILE_DIMENSIONS_PX,
        height: TILE_DIMENSIONS_PX,
        width: TILE_DIMENSIONS_PX,
        backgroundColor: "#ddd",
      }}
    >
    </div>
  );
};

export default EmptyCell;
