import React, { useCallback } from "react";
import PropTypes from "prop-types";

import Button from "../../components/button";
import PlayerSlot from "./PlayerSlot";

import { CLIENT_SCENES } from "../../logic/constants";
import { resetMyPlayer } from "../../logic/campaign";

import "./pregame.css";

const Pregame = ({
  clientData,
  gameData,
  changePlayerId,
  changeClientScene,
  addToastMessage,
}) => {
  const onSelectPlayerSlot = useCallback(
    async (newPlayerId) => {
      // Se non è già occupato
      if (gameData[newPlayerId + "_deviceId"])
        return addToastMessage("error", "Already taken");
      // Libero il posto
      await resetMyPlayer(clientData.campaignKey, clientData.playerId);
      // Occupo il nuovo
      changePlayerId(newPlayerId);
    },
    [
      gameData,
      addToastMessage,
      clientData.campaignKey,
      clientData.playerId,
      changePlayerId,
    ]
  );

  return (
    <div id="pregame">
      <div className="lobby-key">
        Lobby code:
        <span className="selectable">{clientData.campaignKey}</span>
      </div>
      <PlayerSlot
        color="blue"
        userName={gameData?.playerBlue_userName}
        itsAMe={gameData?.playerBlue_deviceId === clientData.deviceId}
        onSelectPlayer={() => onSelectPlayerSlot("playerBlue")}
      />
      <PlayerSlot
        color="red"
        userName={gameData?.playerRed_userName}
        itsAMe={gameData?.playerRed_deviceId === clientData.deviceId}
        onSelectPlayer={() => onSelectPlayerSlot("playerRed")}
      />
      <PlayerSlot
        color="green"
        userName={gameData?.playerGreen_userName}
        itsAMe={gameData?.playerGreen_deviceId === clientData.deviceId}
        onSelectPlayer={() => onSelectPlayerSlot("playerGreen")}
      />
      <PlayerSlot
        color="yellow"
        userName={gameData?.playerYellow_userName}
        itsAMe={gameData?.playerYellow_deviceId === clientData.deviceId}
        onSelectPlayer={() => onSelectPlayerSlot("playerYellow")}
      />
      <Button
        text="Back"
        icon="arrow_back"
        onClick={() => changeClientScene(CLIENT_SCENES.MENU)}
      />
      <Button
        text="Start"
        icon="play_arrow"
        onClick={() => changeClientScene(CLIENT_SCENES.GAME)}
      />
    </div>
  );
};

Pregame.propTypes = {
  clientData: PropTypes.object.isRequired,
  gameData: PropTypes.object,
  changePlayerId: PropTypes.func.isRequired,
  changeClientScene: PropTypes.func.isRequired,
  addToastMessage: PropTypes.func.isRequired,
};

Pregame.defaultProps = {
  gameData: null,
};

export default Pregame;
