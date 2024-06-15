import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";

import Button from "../../components/button";
import TextInput from "../../components/textInput";

import { CLIENT_SCENES } from "../../logic/constants";
import { joinCampaign } from "../../logic/campaign";

import "./joinPregame.css";

const JoinPregame = ({
  clientData,
  changeCampaignKey,
  changeClientScene,
  mergeGameData,
  addToastMessage,
}) => {
  const [lobbyCode, setLobbyCode] = useState("");

  const onJoinCampaign = useCallback(async () => {
    const error = await joinCampaign({
      key: lobbyCode,
      clientData,
      onCampaignChange: mergeGameData,
    });

    if (!error) {
      changeCampaignKey(lobbyCode);
      changeClientScene(CLIENT_SCENES.LOBBY_PREGAME);
    } else {
      addToastMessage("error", error);
    }
  }, [
    lobbyCode,
    clientData,
    mergeGameData,
    changeClientScene,
    addToastMessage,
  ]);

  const customSetLobbyCode = useCallback((value) => {
    if (value?.length > 4) return;
    setLobbyCode(value.toUpperCase());
  }, []);

  return (
    <div id="join_pregame">
      <TextInput
        label="Lobby code"
        value={lobbyCode}
        setValue={customSetLobbyCode}
        onKeyPressEnter={onJoinCampaign}
      />
      <Button
        text="Back"
        icon="arrow_back"
        onClick={() => changeClientScene(CLIENT_SCENES.MENU)}
      ></Button>
      <Button
        text="Join campaign"
        icon="login"
        onClick={onJoinCampaign}
        disabled={lobbyCode.length !== 4}
      ></Button>
    </div>
  );
};

JoinPregame.propTypes = {
  clientData: PropTypes.object.isRequired,
  changeCampaignKey: PropTypes.func.isRequired,
  changeClientScene: PropTypes.func.isRequired,
  mergeGameData: PropTypes.func.isRequired,
  addToastMessage: PropTypes.func.isRequired,
};

JoinPregame.defaultProps = {};

export default JoinPregame;
