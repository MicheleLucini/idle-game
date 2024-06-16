import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";

import { SignIn, Register } from "../../api/public";

import Button from "../../components/button";
import TextInput from "../../components/textInput";

import { appVersion } from "../../logic/constants";

import "./access.css";

const Access = ({
  addToastMessage,
  setGameData,
}) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSignIn = useCallback(async () => {
    if (!email || !password) {
      addToastMessage("error", "Email and password are mandatory!");
      return;
    }
    setLoading(true);
    const data = await SignIn({ email, password }, addToastMessage);
    setGameData(data);
    setLoading(false);
  }, [email, password, addToastMessage, setGameData]);

  const onRegister = useCallback(async () => {
    if (!email || !password) {
      addToastMessage("error", "Email and password are mandatory!");
      return;
    }
    setLoading(true);
    try {
      await Register({ email, password }, addToastMessage);
    } catch {
      setLoading(false);
      return;
    }
    onSignIn();
  }, [email, password, addToastMessage, setGameData]);

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
        text="Login"
        icon="login"
        onClick={onSignIn}
        disabled={loading}
      />
      <Button
        text="Register"
        icon="person_add"
        onClick={onRegister}
        disabled={loading}
      />
      <span className="version">{appVersion}</span>
    </div>
  );
};

Access.propTypes = {
  addToastMessage: PropTypes.func.isRequired,
  setGameData: PropTypes.func.isRequired,
};

export default Access;
