import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";

import Button from "../../components/button";
import TextInput from "../../components/textInput";

import { appVersion } from "../../logic/constants";

import "./access.css";

const Access = ({
  setUser,
  addToastMessage,
}) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onAccess = useCallback(async () => {
    if (!email || !password) {
      addToastMessage("error", "Email and password are mandatory!");
      return;
    }

    setLoading(true);

    // changeUserName(name);

    // const newGame = await createCampaign(clientData);

    // await joinCampaign({
    //   key: newGame.key,
    //   clientData,
    //   onCampaignChange: mergeGameData,
    // });

    // changeCampaignKey(newGame.key);

    setUser({ email, password });

    setLoading(false);

    // changeClientScene(CLIENT_SCENES.LOBBY_PREGAME);
  }, [email, password, addToastMessage, setUser]);

  return (
    <div id="access">
      <TextInput
        label="Email"
        value={email}
        setValue={setEmail}
        disabled={loading}
      />
      <TextInput
        label="Password"
        value={password}
        setValue={setPassword}
        disabled={loading}
        type="password"
      />
      <Button
        text="Access"
        icon="login"
        onClick={onAccess}
        disabled={loading}
      />
      <span className="version">{appVersion}</span>
    </div>
  );
};

Access.propTypes = {
  addToastMessage: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
};

export default Access;
