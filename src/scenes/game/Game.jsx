import React, { useState, useEffect } from "react";
import moment from "moment";

import { GetUserData, UpgradeSettlement, MoveTroops } from "../../api/user";

import Button from "../../components/button";
import { delLocal } from "../../logic/storage";

import GameMap from './GameMap.jsx';
import "./game.css";

const FRAME_RATE = 20;
const MAP_MARGIN_TILES = 20;
const TILE_DIMENSIONS_PX = 60;

const mapMovement = (movement, gameData) => {
  const clientDelta = Math.abs(moment().diff(gameData.serverDate, "ms"));
  const travelTotal = moment(movement.arrivalDate).diff(movement.departureDate, "ms");
  const travelRemaining = moment(movement.arrivalDate).diff(gameData.serverDate, "ms") - clientDelta;
  const travelPtc = 100 - (travelRemaining * 100 / travelTotal);
  return {
    ...movement,
    travelTotal,
    travelRemaining,
    travelPtc,
  };
};

const Game = ({
  addToastMessage,
  gameData,
  mapGameData,
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

  const onMoveTroopsClick = (fromSettlement) => {
    MoveTroops({
      sourceX: fromSettlement.x,
      sourceY: fromSettlement.y,
      destinationX: selectedSettlement.x,
      destinationY: selectedSettlement.y,
      amount: fromSettlement.troopAmount,
    }, addToastMessage)
      .then(() => {
        GetUserData({ userId: gameData.id }, addToastMessage)
          .then((data) => {
            mapGameData(data);
            setModalMoveTroops(null);
          });
      })
      .catch(() => { });
  };

  useEffect(() => {
    const interval = setInterval(() => setRefresh(prev => prev + 1), 1000 / FRAME_RATE);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setMovements(gameData.userTroops.map((x) => mapMovement(x, gameData)));
  }, [gameData, refresh])

  return (
    <div id="game">
      <GameMap
        MAP_MARGIN_TILES={MAP_MARGIN_TILES}
        TILE_DIMENSIONS_PX={TILE_DIMENSIONS_PX}
        gameData={gameData}
        movements={movements}
        selectedSettlement={selectedSettlement}
        setSelectedSettlement={setSelectedSettlement}
      />
      <div id="side_bar">
        <h3>User</h3>
        <span>{"ID: " + gameData.id}</span>
        <span>{"Email: " + gameData.email}</span>
        <span>{"Currency: " + gameData.gameCurrency}</span>
        <span>{"Total troops: " + gameData.userSettlements.map((x) => x.troopAmount).reduce((acc, x) => acc + x, 0)}</span>
        {selectedSettlement && (
          <>
            <hr></hr>
            <h3>Selected settlement</h3>
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
              onClick={() => { setSelectedSettlement(null); setModalMoveTroops(null) }}
              size="small"
            />
          </>
        )}
        {modalMoveTroops && (
          <>
            <hr></hr>
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
          </>
        )}
      </div>
      <div style={{ position: "absolute", top: "1.3rem", right: "1.3rem" }}>
        <Button
          icon="close"
          onClick={onLogoutClick}
          size="small"
          text="Logout"
        />
      </div>
    </div>
  );
};

export default Game;
