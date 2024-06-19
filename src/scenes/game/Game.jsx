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
  setGameData,
}) => {
  const [selectedSettlement, setSelectedSettlement] = useState(null);

  const onLogout = () => {
    delLocal("user", "token");
    setGameData(null);
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
          onClick={onLogout}
          size="small"
        />
      </div>
    </div>
  );
};

export default Game;
