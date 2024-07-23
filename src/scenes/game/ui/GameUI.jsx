import React, { useState, useContext } from "react";

import Button from "../../../components/button";
import RangeInput from "../../../components/rangeInput";
import { formatBigNumber } from "../../../logic/utility.js";

import { GameContext } from '../Game.jsx';

import "./gameUI.css";

const GameUI = ({ }) => {
  const {
    gameData,
    onMoveTroops,
    onUpgradeSettlement,
    selectedSettlement,
    setSelectedSettlement,
  } = useContext(GameContext);

  const [modeMoveTroops, setModeMoveTroops] = useState(null);

  return (
    <>
      <div id="gameUI_user">
        <Button icon="account_circle" size="small" />
        <div >
          <span>{formatBigNumber(gameData.gameCurrency).toUpperCase()}</span>
        </div>
      </div>
      <div id="gameUI_sideBar" className={!!selectedSettlement ? "open" : "close"}>
        {selectedSettlement && (
          !modeMoveTroops ? (
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
                    onClick={onUpgradeClick}
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
                  onClick={() => { setSelectedSettlement(null); setModeMoveTroops(null) }}
                  size="small"
                />
              </div>
            </>
          ) : (
            <>
              <h3>{selectedSettlement.isMine ? "Move troops to settlement" : "Attack settlement"}</h3>
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
                  onClick={() => setModeMoveTroops({})}
                  size="small"
                  text={selectedSettlement.isMine ? "Move troops" : "Attack"}
                />
                <Button
                  icon="close"
                  onClick={() => { setSelectedSettlement(null); setModeMoveTroops(null) }}
                  size="small"
                />
              </div>
            </>
          )
        )}
      </div>
      {/* {modeMoveTroops && !modeMoveTroops.level && (
        <>
          <hr></hr>
          <h3>Move troops</h3>
          {gameData.userSettlements.map((x) => (
            <Button
              key={x.x + "/" + x.y}
              onClick={() => setModeMoveTroops(x)}
              size="small"
              text={x.x + "/" + x.y + " - Troops: " + x.troopAmount}
            />
          ))}
          <Button
            icon="close"
            onClick={() => setModeMoveTroops(null)}
            size="small"
            text="Cancel"
          />
        </>
      )}
      {modeMoveTroops && modeMoveTroops.level && (
        <>
          <hr></hr>
          <h3>Troops amount</h3>
          <RangeInput
            value={modeMoveTroops.amount || 0}
            setValue={(amount) => setModeMoveTroops((prev) => ({ ...prev, amount }))}
            max={modeMoveTroops.troopAmount}
          />
          <Button
            onClick={onMoveTroopsClick}
            size="small"
            text="Confirm"
          />
          <Button
            icon="close"
            onClick={() => setModeMoveTroops(null)}
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
    </div >*/}
    </>
  );
};

export default GameUI;
