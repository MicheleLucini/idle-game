import React, { useState, useEffect } from "react";
import moment from "moment";

import { UpgradeSettlement, MoveTroops } from "../../api/user";

import Button from "../../components/button";
import RangeInput from "../../components/rangeInput";
import { delLocal } from "../../logic/storage";
import { formatBigNumber } from "../../logic/utility.js";

import GameMap from './map/GameMap.jsx';

import "./game.css";
import {
  FRAME_RATE,
  MAP_MARGIN_TILES,
  TILE_DIMENSIONS_PX,
  VISIBILITY_RADIUS,
  mapMovement,
} from './game.logic.js'

const Game = ({
  addToastMessage,
  gameData,
  onLogout,
}) => {
  const [modalMoveTroops, setModalMoveTroops] = useState(null);
  const [movements, setMovements] = useState([]);
  const [refresh, setRefresh] = useState(0);
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

  useEffect(() => {
    setMovements([
      ...gameData.userTroops.map((x) => ({ ...mapMovement(x, gameData), isMine: true })),
      ...gameData.visibleTroops.map((x) => mapMovement(x, gameData)),
    ]);
  }, [gameData, refresh]);

  return (
    <div id="game">
      <GameMap
        MAP_MARGIN_TILES={MAP_MARGIN_TILES}
        TILE_DIMENSIONS_PX={TILE_DIMENSIONS_PX}
        VISIBILITY_RADIUS={VISIBILITY_RADIUS}
        gameData={gameData}
        movements={movements}
        selectedSettlement={selectedSettlement}
        setSelectedSettlement={setSelectedSettlement}
      />
      <div id="side_bar">
        <h3>User</h3>
        <span>{"ID: " + gameData.id}</span>
        <span>{"Email: " + gameData.email}</span>
        <span>{"Currency: " + formatBigNumber(gameData.gameCurrency)}</span>
        <span>{"Troops in settlements: " + formatBigNumber(gameData.userSettlements.map((x) => x.troopAmount).reduce((acc, x) => acc + x, 0))}</span>
        <span>{"Troops moving: " + formatBigNumber(gameData.userTroops.map((x) => x.amount).reduce((acc, x) => acc + x, 0))}</span>
        {selectedSettlement && (
          <>
            <hr></hr>
            <h3>Selected settlement</h3>
            <span>{JSON.stringify(selectedSettlement, null, 2)}</span>
            <div style={{ display: "grid", gridAutoFlow: "column", justifyContent: "start", gap: 7 }}>
              {selectedSettlement.isMine && (
                <Button
                  icon="upgrade"
                  onClick={onUpgradeClick}
                  size="small"
                  text="Upgrade"
                />
              )}
              <Button
                icon={selectedSettlement.isMine ? "tactic" : "swords"}
                onClick={() => setModalMoveTroops({})}
                size="small"
                text={selectedSettlement.isMine ? "Move troops" : "Attack"}
              />
              <Button
                icon="close"
                onClick={() => { setSelectedSettlement(null); setModalMoveTroops(null) }}
                size="small"
              />
            </div>
          </>
        )}
        {modalMoveTroops && !modalMoveTroops.level && (
          <>
            <hr></hr>
            <h3>Move troops</h3>
            {gameData.userSettlements.map((x) => (
              <Button
                key={x.x + "/" + x.y}
                onClick={() => setModalMoveTroops(x)}
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
          </>
        )}
        {modalMoveTroops && modalMoveTroops.level && (
          <>
            <hr></hr>
            <h3>Troops amount</h3>
            <RangeInput
              value={modalMoveTroops.amount || 0}
              setValue={(amount) => setModalMoveTroops((prev) => ({ ...prev, amount }))}
              max={modalMoveTroops.troopAmount}
            />
            <Button
              onClick={onMoveTroopsClick}
              size="small"
              text="Confirm"
            />
            <Button
              icon="close"
              onClick={() => setModalMoveTroops(null)}
              size="small"
              text="Cancel"
            />
          </>
        )}
        <div style={{ position: "absolute", top: 8, right: 8 }}>
          <Button
            icon="close"
            onClick={onLogoutClick}
            size="small"
            text="Logout"
          />
        </div>
      </div>
    </div>
  );
};

export default Game;
