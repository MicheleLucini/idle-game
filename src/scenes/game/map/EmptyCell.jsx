import React, { useContext } from "react";
import { GameContext } from '../Game';

const EmptyCell = ({
  data,
  startingTile,
}) => {
  const {
    TILE_DIMENSIONS_PX,
  } = useContext(GameContext);
  return (
    <div
      className='empty-cell'
      style={{
        top: (startingTile.y - data.y) * TILE_DIMENSIONS_PX,
        left: (data.x - startingTile.x) * TILE_DIMENSIONS_PX,
        height: TILE_DIMENSIONS_PX,
        width: TILE_DIMENSIONS_PX,
      }}
    >
    </div>
  );
};

export default EmptyCell;
