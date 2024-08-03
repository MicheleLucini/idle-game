import React, { useContext, useState, useMemo } from "react";

import Button from "#components/button";
import RangeInput from "#components/rangeInput";
import { formatBigNumber } from "#logic/utility.js";

import { GameContext } from '../Game.jsx';

import "./gameUI.css";

const SIDEBARVIEW = {
  NONE: "NONE",
  SETTLEMENT: "SETTLEMENT",
  MOVE_TROOPS: "MOVE_TROOPS",
  ATTACK: "ATTACK",
  TROOPS_AMOUNT: "TROOPS_AMOUNT",
}

const GameUI = ({ }) => {
  const {
    gameData,
    onMoveTroops,
    onUpgradeSettlement,
    selectedSettlement,
    setSelectedSettlement,
  } = useContext(GameContext);

  const [modeMoveTroops, setModeMoveTroops] = useState(null);

  const currentView = useMemo(() => {
    if (modeMoveTroops) {
      if (modeMoveTroops.level) return SIDEBARVIEW.TROOPS_AMOUNT;
      return selectedSettlement.isMine ? SIDEBARVIEW.MOVE_TROOPS : SIDEBARVIEW.ATTACK;
    }
    if (selectedSettlement) return SIDEBARVIEW.SETTLEMENT;
    return SIDEBARVIEW.NONE;
  }, [modeMoveTroops, selectedSettlement?.isMine])


  const reset = () => {
    setModeMoveTroops(null);
    setSelectedSettlement(null);
  };

  console.log(currentView, selectedSettlement, modeMoveTroops)

  return (
    <>
      <div id="gameUI_user">
        <Button icon="account_circle" size="small" />
        <div >
          <span>{formatBigNumber(gameData.gameCurrency).toUpperCase()}</span>
        </div>
      </div>
      <div id="gameUI_sideBar" className={!!selectedSettlement ? "open" : "close"}>
        {currentView === SIDEBARVIEW.SETTLEMENT && (
          <>
            <h3>{selectedSettlement.x + "/" + selectedSettlement.y}</h3>
            <div className="info_block">
              <div className="info_block_title">
                <h5>Settlement JSON</h5>
              </div>
              <span>{JSON.stringify(selectedSettlement, null, 2)}</span>
            </div>
            <div className="info_block">
              <div className="info_block_title">
                <h5>Defense</h5>
                <h5>552M</h5>
              </div>
              <span>Troops 97.8M</span>
              <span>Garrison 194K/h (+21.0M)</span>
              <span>Walls 237% (+3%)</span>
            </div>
            <div className="info_block">
              <div className="info_block_title">
                <h5>Production</h5>
              </div>
              <span>Troops 194K/h (+22.3K)</span>
              <span>Money 486K/h (+55.9K)</span>
            </div>
            <div className="actions">
              {selectedSettlement.isMine && (
                <Button
                  icon="upgrade"
                  onClick={onUpgradeSettlement}
                  size="small"
                  text="Upgrade"
                />
              )}
              <Button
                icon={selectedSettlement.isMine ? "tactic" : "swords"}
                onClick={() => setModeMoveTroops({})}
                size="small"
                text={selectedSettlement.isMine ? "Move troops" : "Attack"}
              />
              <Button
                icon="close"
                onClick={reset}
                size="small"
              />
            </div>
          </>
        )}
        {currentView === SIDEBARVIEW.MOVE_TROOPS && (
          <>
            <h3>Move troops to settlement</h3>
            <div className="info_block">
              <div className="info_block_title">
                <h5>Settlement JSON</h5>
              </div>
              <span>{JSON.stringify(selectedSettlement, null, 2)}</span>
            </div>
            <div className="info_block">
              <div className="info_block_title">
                <h5>Defense</h5>
                <h5>552M</h5>
              </div>
              <span>Troops 97.8M</span>
              <span>Garrison 194K/h (+21.0M)</span>
              <span>Walls 237% (+3%)</span>
            </div>
            <div className="actions">
              <Button
                icon="upgrade"
                onClick={onUpgradeSettlement}
                size="small"
                text="Upgrade"
              />
              <Button
                icon="tactic"
                onClick={() => setModeMoveTroops({})}
                size="small"
                text="Move troops"
              />
              <Button
                icon="close"
                onClick={reset}
                size="small"
              />
            </div>
          </>
        )}
        {currentView === SIDEBARVIEW.ATTACK && (
          <>
            <h3>Attack settlement</h3>
            <div className="info_block">
              <div className="info_block_title">
                <h5>Settlement JSON</h5>
              </div>
              <span>{JSON.stringify(selectedSettlement, null, 2)}</span>
            </div>
            <div className="info_block">
              <div className="info_block_title">
                <h5>Defense</h5>
                <h5>552M</h5>
              </div>
              <span>Troops 97.8M</span>
            </div>
            <div className="info_block">
              <div className="info_block_title">
                <h5>Choose settlement that will attack</h5>
                <h5>{gameData.userSettlements.length}</h5>
              </div>
              {gameData.userSettlements.map((x) => (
                <Button
                  key={x.x + "/" + x.y}
                  onClick={() => setModeMoveTroops(x)}
                  size="small"
                  text={x.x + "/" + x.y + " - Troops: " + x.troopAmount}
                />
              ))}
            </div>
            <div className="actions">
              <Button
                icon="close"
                onClick={reset}
                size="small"
                text="Cancel"
              />
            </div>
          </>
        )}
        {currentView === SIDEBARVIEW.TROOPS_AMOUNT && (
          <>
            <hr></hr>
            <h3>Troops amount</h3>
            <RangeInput
              value={modeMoveTroops.amount || 0}
              setValue={(amount) => setModeMoveTroops((prev) => ({ ...prev, amount }))}
              max={modeMoveTroops.troopAmount}
            />
            <Button
              icon={selectedSettlement.isMine ? "tactic" : "swords"}
              onClick={() => {
                onMoveTroops(modeMoveTroops);
                reset();
              }}
              size="small"
              text={selectedSettlement.isMine ? "Move troops" : "Attack"}
            />
            <Button
              icon="close"
              onClick={reset}
              size="small"
              text="Cancel"
            />
          </>
        )}
      </div>
    </>
  );
};

export default GameUI;
