import React from "react";

const MovingTroop = ({
  TILE_DIMENSIONS_PX,
  data,
  startingTile,
}) => {
  const fromTileToPx = (tileNumber) => tileNumber * TILE_DIMENSIONS_PX + (TILE_DIMENSIONS_PX / 2);

  const startingPositionTop = fromTileToPx(startingTile.y - data.sourceY);
  const startingPositionLeft = fromTileToPx(data.sourceX - startingTile.x);

  const endingPositionTop = fromTileToPx(startingTile.y - data.destinationy);
  const endingPositionLeft = fromTileToPx(data.destinationX - startingTile.x);

  const elapsedTime = data.travelTotal - data.travelRemaining;

  const currentTop = startingPositionTop + (elapsedTime / data.travelTotal) * (endingPositionTop - startingPositionTop);
  const currentLeft = startingPositionLeft + (elapsedTime / data.travelTotal) * (endingPositionLeft - startingPositionLeft);

  return (
    <div
      style={{
        position: "absolute",
        top: currentTop,
        left: currentLeft,
        height: 30,
        width: 30,
        marginTop: -15,
        marginLeft: -15,
        backgroundColor: data.isMine ? "aquamarine" : "darksalmon",
        borderRadius: "50%",
        outline: "4px solid rgba(0,0,0,0.1)",
        display: "grid",
        placeContent: "center",
        textAlign: "center",
      }}
    >
      <small>{data.amount}</small>
    </div>
  );
};

export default MovingTroop;
