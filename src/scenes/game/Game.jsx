import React, { createContext, useState, useMemo, useEffect } from "react";

import GameMap from './map/GameMap.jsx';
import GameUI from './ui/GameUI.jsx';

import "./game.css";
import {
  FRAME_RATE,
  MAP_MARGIN_TILES,
  TILE_DIMENSIONS_PX,
  VISIBILITY_RADIUS,
  mapMovement,
} from './game.logic.js'

export const GameContext = createContext({});

const Game = ({
  addToastMessage,
  gameData,
  onLogout,
}) => {
  const [refresh, setRefresh] = useState(0);
  const [selectedSettlement, setSelectedSettlement] = useState(null);

  const movements = useMemo(() => [
    ...gameData.userTroops.map((x) => ({ ...mapMovement(x, gameData), isMine: true })),
    ...gameData.visibleTroops.map((x) => mapMovement(x, gameData)),
  ], [gameData, refresh]);

  const onUpgradeSettlement = () => {
    UpgradeSettlement({ x: selectedSettlement.x, y: selectedSettlement.y }, addToastMessage)
      .then(() => addToastMessage("success", "Upgraded!"))
      .catch(() => { });
  };

  const onMoveTroops = () => {
    MoveTroops({
      sourceX: modalMoveTroops.x,
      sourceY: modalMoveTroops.y,
      destinationX: selectedSettlement.x,
      destinationY: selectedSettlement.y,
      amount: modalMoveTroops.amount,
    }, addToastMessage)
      .then(() => {
        setModalMoveTroops(null);
        setSelectedSettlement(null);
      })
      .catch(() => { });
  };

  useEffect(() => {
    const interval = setInterval(() => setRefresh(prev => prev + 1), 1000 / FRAME_RATE);
    return () => clearInterval(interval);
  }, []);

  const contextValue = {
    FRAME_RATE,
    MAP_MARGIN_TILES,
    TILE_DIMENSIONS_PX,
    VISIBILITY_RADIUS,
    addToastMessage,
    gameData,
    movements,
    onLogout,
    onMoveTroops,
    onUpgradeSettlement,
    selectedSettlement,
    setSelectedSettlement,
  };

  return (
    <GameContext.Provider value={contextValue}>
      <div id="game">
        <GameMap />
        <GameUI />
      </div>
    </GameContext.Provider>
  );
};

export default Game;
