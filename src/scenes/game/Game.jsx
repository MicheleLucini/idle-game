import React, { useState } from "react";

import { UpgradeSettlement, MoveTroops } from "../../api/user";

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
  const [modalMoveTroops, setModalMoveTroops] = useState(null);

  const onLogoutClick = () => {
    delLocal("user", "token");
    onLogout(null);
  };

  const onUpgradeClick = () => {
    UpgradeSettlement({ x: selectedSettlement.x, y: selectedSettlement.y }, addToastMessage)
      .then(() => addToastMessage("success", "Upgraded!"))
      .catch(() => { });
  };

  const onMoveTroopsClick = (fromSettlement) => {
    MoveTroops({
      sourceX: fromSettlement.x,
      sourceY: fromSettlement.y,
      destinationX: selectedSettlement.x,
      destinationY: selectedSettlement.y,
      amount: fromSettlement.troopAmount,
    }, addToastMessage)
      .catch(() => { });
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
            icon="east"
            onClick={() => setModalMoveTroops({})}
            size="small"
            text={selectedSettlement.isMine ? "Move troops" : "Attack"}
          />
          <Button
            icon="close"
            onClick={() => setSelectedSettlement(null)}
            size="small"
          />
        </div>
      )}
      {modalMoveTroops && (
        <div id="modal_move_troops">
          <h3>Move troops</h3>
          {gameData.userSettlements.map((x) => (
            <Button
              onClick={() => onMoveTroopsClick(x)}
              size="small"
              text={x.x + "/" + x.y + " - Troops: " + x.troopAmount}
            />
          ))}
          <Button
            icon="close"
            onClick={() => setModalMoveTroops(null)}
            size="small"
            text="Cancel"
          />
        </div>
      )}
    </div>
  );
};

export default Game;
