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
        height: TILE_DIMENSIONS_PX - 1,
        width: TILE_DIMENSIONS_PX - 1,
        backgroundColor: "white",
        color: "#ddd",
        display: "grid",
        placeContent: "center",
        textAlign: "center",
        marginTop: 1,
        marginLeft: 1,
      }}
    >
      <small>{data.x + "/" + data.y}</small>
    </div>
  );
};

export default EmptyCell;
