import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { RestoreSignIn } from "../../api/user";
import { SignIn, Register } from "../../api/public";

import Button from "../../components/button";
import TextInput from "../../components/textInput";

import { appVersion } from "../../logic/constants";
import { getLocal, setLocal } from "../../logic/storage";

import "./access.css";

const Access = ({
  addToastMessage,
  setGameData,
}) => {
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSignIn = async () => {
    if (!email || !password) {
      addToastMessage("error", "Email and password are mandatory!");
      return;
    }
    setLoading(true);
    let data;
    try {
      data = await SignIn({ email, password }, addToastMessage);
    } catch {
      setLoading(false);
      return;
    }
    setLocal("user", "token", { token: data.token, id: data.id });
    setGameData(data);
    setLoading(false);
  };

  const onRegister = async () => {
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
  };

  useEffect(() => {
    const userToken = getLocal("user", "token");
    if (!userToken) {
      setLoading(false);
      return;
    }
    RestoreSignIn()
      .then((data) => setGameData(data))
      .finally(() => setLoading(false));
  }, []);

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
