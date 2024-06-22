import React, { useState } from "react";

import { UpgradeSettlement } from "../../api/user";

import Button from "../../components/button";
import { delLocal } from "../../logic/storage";

import GameMap from './GameMap.jsx';
import "./game.css";

const TILE_DIMENSIONS_PX = 60;
const MAP_MARGIN_TILES = 20;

const Game = ({
  addToastMessage,
  gameData,
  onLogout,
}) => {
  const [selectedSettlement, setSelectedSettlement] = useState(null);

  const onLogoutClick = () => {
    delLocal("user", "token");
    onLogout(null);
  };

  const onUpgradeClick = () => {
    UpgradeSettlement({ x: selectedSettlement.x, y: selectedSettlement.y }, addToastMessage)
      .then(() => addToastMessage("success", "Upgraded!"))
      .catch(() => { });
  };

  const onMoveTroopsClick = () => {
    // MoveTroops({
    //   sourceX,
    //   sourceY,
    //   destinationX,
    //   destinationY,
    //   amount,
    // }, addToastMessage)
    //   .catch(() => { });
  };

  return (
    <div id="game">
      <GameMap
        MAP_MARGIN_TILES={MAP_MARGIN_TILES}
        TILE_DIMENSIONS_PX={TILE_DIMENSIONS_PX}
        gameData={gameData}
        selectedSettlement={selectedSettlement}
        setSelectedSettlement={setSelectedSettlement}
      />
      <div id="user_data">
        <span>{JSON.stringify(gameData, null, 2)}</span>
        <Button
          icon="close"
          onClick={onLogoutClick}
          size="small"
          text="Logout"
        />
      </div>
      {selectedSettlement && (
        <div id="selected_settlement">
          <span>{JSON.stringify(selectedSettlement, null, 2)}</span>
          <Button
            disabled={!selectedSettlement.isMine}
            icon="upgrade"
            onClick={onUpgradeClick}
            size="small"
            text="Upgrade"
          />
          <Button
            disabled={!selectedSettlement.isMine}
            icon="east"
            onClick={onMoveTroopsClick}
            size="small"
            text="Move troops"
          />
          <Button
            icon="close"
            onClick={() => setSelectedSettlement(null)}
            size="small"
          />
        </div>
      )}
    </div>
  );
};

export default Game;
