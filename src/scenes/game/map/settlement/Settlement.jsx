import React, { useContext } from "react";
import { GameContext } from '../../Game';
import { formatBigNumber } from "../../../../logic/utility";

const Settlement = ({
  data,
  startingTile,
}) => {
  const {
    TILE_DIMENSIONS_PX,
    selectedSettlement,
    setSelectedSettlement,
  } = useContext(GameContext);

  const isSelected = selectedSettlement
    && selectedSettlement.x === data.x
    && selectedSettlement.y === data.y;

  return (
    <div
      onClick={() => setSelectedSettlement(data)}
      className='settlement'
      style={{
        top: (startingTile.y - data.y) * TILE_DIMENSIONS_PX,
        left: (data.x - startingTile.x) * TILE_DIMENSIONS_PX,
        height: TILE_DIMENSIONS_PX - 1,
        width: TILE_DIMENSIONS_PX - 1,
        backgroundColor: data.isMine ? "aquamarine" : "darksalmon",
        outline: isSelected ? "5px solid blue" : "none",
      }}
    >
      <b>{data.x + "/" + data.y}</b>
      <small>{data.level}</small>
      {data.isMine && <small>{formatBigNumber(data.troopAmount)}</small>}
    </div>
  );
};

export default Settlement;
