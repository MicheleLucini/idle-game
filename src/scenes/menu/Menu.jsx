import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";

import Button from "../../components/button";
import TextInput from "../../components/textInput";

import { CLIENT_SCENES, appVersion } from "../../logic/constants";
import { createCampaign, joinCampaign } from "../../logic/campaign";

import "./menu.css";

const Menu = ({
  clientData,
  changeUserName,
  changeCampaignKey,
  changeClientScene,
  leaveCampaignApp,
  mergeGameData,
  addToastMessage,
}) => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(clientData.userName);

  const onCreateCampaign = useCallback(async () => {
    setLoading(true);

    changeUserName(name);

    const newGame = await createCampaign(clientData);

    await joinCampaign({
      key: newGame.key,
      clientData,
      onCampaignChange: mergeGameData,
    });

    changeCampaignKey(newGame.key);

    setLoading(false);

    changeClientScene(CLIENT_SCENES.LOBBY_PREGAME);
  }, [
    changeUserName,
    name,
    clientData,
    addToastMessage,
    mergeGameData,
    changeCampaignKey,
    changeClientScene,
  ]);

  const onJoinCampaign = useCallback(() => {
    changeUserName(name);
    changeClientScene(CLIENT_SCENES.JOIN_LOBBY_PREGAME);
  }, [changeUserName, name, changeClientScene]);

  const onContinueCampaign = useCallback(async () => {
    setLoading(true);

    changeUserName(name);

    const error = await joinCampaign({
      key: clientData.campaignKey,
      clientData,
      onCampaignChange: mergeGameData,
    });

    setLoading(false);

    if (!error) {
      changeClientScene(CLIENT_SCENES.LOBBY_PREGAME);
    } else {
      addToastMessage(error);
    }
  }, [
    changeUserName,
    name,
    clientData,
    mergeGameData,
    changeClientScene,
    addToastMessage,
  ]);

  const onLeaveCampaign = useCallback(() => {
    leaveCampaignApp();
  }, [leaveCampaignApp]);

  return (
    <div id="menu">
      <TextInput
        label="Username"
        value={name}
        setValue={setName}
        disabled={loading}
      />
      {clientData.campaignKey && (
        <>
          <Button
            text={"Continue campaign " + clientData.campaignKey}
            icon="navigate_next"
            onClick={onContinueCampaign}
            disabled={loading}
          />
          <Button
            text={"Leave campaign " + clientData.campaignKey}
            icon="logout"
            onClick={onLeaveCampaign}
            disabled={loading}
          />
        </>
      )}
      {!clientData.campaignKey && (
        <>
          <Button
            text="Create campaign"
            icon="add"
            onClick={onCreateCampaign}
            disabled={name.length === 0}
          />
          <Button
            text="Join campaign"
            icon="login"
            onClick={onJoinCampaign}
            disabled={name.length === 0}
          />
        </>
      )}
      <span className="version">{appVersion}</span>
    </div>
  );
};

Menu.propTypes = {
  clientData: PropTypes.object.isRequired,
  changeUserName: PropTypes.func.isRequired,
  changeCampaignKey: PropTypes.func.isRequired,
  changeClientScene: PropTypes.func.isRequired,
  leaveCampaignApp: PropTypes.func.isRequired,
  mergeGameData: PropTypes.func.isRequired,
  addToastMessage: PropTypes.func.isRequired,
};

Menu.defaultProps = {};

export default Menu;
