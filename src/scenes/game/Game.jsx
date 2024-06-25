import React, { useState, useEffect } from "react";
import moment from "moment";

import { UpgradeSettlement, MoveTroops } from "../../api/user";

import Button from "../../components/button";
import { delLocal } from "../../logic/storage";

import GameMap from './GameMap.jsx';
import "./game.css";

const FRAME_RATE = 20;
const MAP_MARGIN_TILES = 18;
const TILE_DIMENSIONS_PX = 60;
const VISIBILITY_RADIUS = 16;

const mapMovement = (movement, gameData) => {
  // Calcolo del delta tra server e client in millisecondi
  const serverMoment = moment(gameData.serverDate);
  const clientMoment = moment(gameData.clientDate);
  const deltaServerClient = clientMoment.diff(serverMoment);
  // Calcolo della durata totale del movimento in millisecondi
  const arrivalMoment = moment(movement.arrivalDate);
  const departureMoment = moment(movement.departureDate);
  const movementDuration = arrivalMoment.diff(departureMoment);
  // Calcolo del tempo rimanente per il client
  const currentClientTime = moment();
  const synchronizedClientTime = currentClientTime.subtract(deltaServerClient, 'milliseconds');
  const remainingClientTime = Math.max(arrivalMoment.diff(synchronizedClientTime), 0);
  const travelPtc = Math.min(100 - (remainingClientTime * 100 / movementDuration), 100);
  return {
    ...movement,
    travelTotal: movementDuration,
    travelRemaining: remainingClientTime,
    travelPtc,
  };
};

const Game = ({
  addToastMessage,
  gameData,
  onLogout,
}) => {
  const [modalMoveTroops, setModalMoveTroops] = useState(null);
  const [movements, setMovements] = useState([]);
  const [movementsFinished, setMovementsFinished] = useState(false);
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
      amount: 1,//fromSettlement.troopAmount,
    }, addToastMessage)
      .then(() => setModalMoveTroops(null))
      .catch(() => { });
  };

  useEffect(() => {
    const interval = setInterval(() => setRefresh(prev => prev + 1), 1000 / FRAME_RATE);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const newMovements = [
      ...gameData.userTroops.map((x) => ({ ...mapMovement(x, gameData), isMine: true })),
      ...gameData.visibleTroops.map((x) => mapMovement(x, gameData)),
    ];
    setMovementsFinished(newMovements.some((x) => x.travelPtc === 100));
    setMovements(newMovements);
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
        <span>{"Currency: " + gameData.gameCurrency}</span>
        <span>{"Troops in settlements: " + gameData.userSettlements.map((x) => x.troopAmount).reduce((acc, x) => acc + x, 0)}</span>
        <span>{"Troops moving: " + gameData.userTroops.map((x) => x.amount).reduce((acc, x) => acc + x, 0)}</span>
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
        {modalMoveTroops && (
          <>
            <hr></hr>
            <h3>Move troops</h3>
            {gameData.userSettlements.map((x) => (
              <Button
                key={x.x + "/" + x.y}
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
