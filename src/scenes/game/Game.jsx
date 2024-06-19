import React, { useState } from "react";

import Button from "../../components/button";
import { delLocal } from "../../logic/storage";

import GameMap from './GameMap.jsx';
import "./game.css";

const TILE_DIMENSIONS_PX = 60;
const MAP_DIAMETER_TILES = 100;

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

  return (
    <div id="game">
      <GameMap
        TILE_DIMENSIONS_PX={TILE_DIMENSIONS_PX}
        MAP_DIAMETER_TILES={MAP_DIAMETER_TILES}
        gameData={gameData}
        selectedSettlement={selectedSettlement}
        setSelectedSettlement={setSelectedSettlement}
      />
      <div id="user_data">
        <span>{JSON.stringify(gameData, null, 2)}</span>
        <Button
          text="Logout"
          icon="close"
          onClick={onLogoutClick}
          size="small"
        />
      </div>
      {selectedSettlement && (
        <div id="selected_settlement">
          <span>{JSON.stringify(selectedSettlement, null, 2)}</span>
          <Button
            // onClick={onLogout}
            disabled={!selectedSettlement.isMine}
            icon="upgrade"
            size="small"
            text="Upgrade"
          />
          <Button
            // onClick={onLogout}
            disabled={!selectedSettlement.isMine}
            icon="east"
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
