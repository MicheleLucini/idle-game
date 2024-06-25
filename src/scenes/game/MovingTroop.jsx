import React from "react";

const MovingTroop = ({
  TILE_DIMENSIONS_PX,
  data,
  startingTile,
}) => {
  const fromTileToPx = (tileNumber) => tileNumber * TILE_DIMENSIONS_PX + (TILE_DIMENSIONS_PX / 2);

  const startingPositionTop = fromTileToPx(startingTile.y - data.sourceY);
  const startingPositionLeft = fromTileToPx(data.sourceX - startingTile.x);

  const endingPositionTop = fromTileToPx(startingTile.y - data.destinationY);
  const endingPositionLeft = fromTileToPx(data.destinationX - startingTile.x);

  const deltaX = endingPositionLeft - startingPositionLeft;
  const deltaY = endingPositionTop - startingPositionTop;

  const elapsedTime = data.travelTotal - data.travelRemaining;

  const currentTop = startingPositionTop + (elapsedTime / data.travelTotal) * deltaY;
  const currentLeft = startingPositionLeft + (elapsedTime / data.travelTotal) * deltaX;

  // Creazione della linea di percorso
  const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  // Calcolo dell'angolo della linea
  const angle = Math.atan2(deltaY, deltaX) * 180 / Math.PI;

  return (
    <>
      <div
        style={{
          position: "absolute",
          backgroundColor: "rgba(0,0,0,0.2)",
          top: startingPositionTop,
          left: startingPositionLeft,
          height: 2,
          width: distance,
          transformOrigin: "0 0",
          transform: `rotate(${angle}deg)`,
        }}
      />
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
    </>
  );
};

export default MovingTroop;
