import React, { useState, useCallback, useEffect } from "react";

import Background from "./scenes/background";
import Menu from "./scenes/menu";
import Pregame from "./scenes/pregame";
import JoinPregame from "./scenes/joinPregame";
import Game from "./scenes/game";

import { Cursor, CursorGhost } from "./components/cursor";
import ToastMessageContainer from "./components/toastMessage";

import { appVersion, CLIENT_SCENES, LSKEY } from "./logic/constants";
import { updateMyPlayer, leaveCampaign } from "./logic/campaign";
import { uuidv4 } from "./logic/utility";
import { lsGet, alsSet } from "./logic/storage";

import "./App.css";

const App = () => {
  // TOAST MESSAGES ##########################################

  const [toastMessages, setToastMessages] = useState([]);

  const deleteToastMessage = useCallback((id) => {
    setToastMessages((prev) =>
      prev.filter((toastMessage) => toastMessage.id !== id)
    );
  }, []);

  const addToastMessage = useCallback(
    (type, text) => {
      let id = uuidv4();

      setToastMessages((prev) => [...prev, { id, type, text }]);

      setTimeout(() => deleteToastMessage(id), 3000);
    },
    [deleteToastMessage]
  );

  // CLIENT DATA ##########################################

  const [clientData, setClientData] = useState(() => {
    const lsValue = lsGet(LSKEY.CLIENT_DATA);

    // Se ho i dati e la versione è uguale uso quelli pulendo solo la scene corrente
    if (lsValue?.appVersion === appVersion) {
      return { ...lsValue, clientScene: CLIENT_SCENES.MENU };
    }

    const defaultValues = {
      appVersion: appVersion,
      deviceId: uuidv4(),
      clientScene: CLIENT_SCENES.MENU,
      userName: "",
      campaignKey: null,
      playerId: null,
    };

    // Se ho i dati, la versione è diversa e ho il vecchio device id pulisco tutto mantenendo quello e lo user name
    if (lsValue && lsValue.appVersion !== appVersion && !!lsValue.deviceId) {
      return {
        ...defaultValues,
        deviceId: lsValue.deviceId,
        userName: lsValue.userName,
      };
    }

    return defaultValues;
  });

  useEffect(() => {
    alsSet(LSKEY.CLIENT_DATA, clientData);
  }, [clientData]);

  const softResetClientData = useCallback(() => {
    setClientData((prev) => ({
      ...prev,
      clientScene: CLIENT_SCENES.MENU,
      campaignKey: null,
      playerId: null,
    }));
  }, []);

  const changeClientScene = useCallback((newScene) => {
    setClientData((prev) => ({ ...prev, clientScene: newScene }));
  }, []);

  const changeUserName = useCallback((newUserName) => {
    setClientData((prev) => ({ ...prev, userName: newUserName }));
  }, []);

  const changeCampaignKey = useCallback((newCampaignKey) => {
    setClientData((prev) => ({ ...prev, campaignKey: newCampaignKey }));
  }, []);

  const changePlayerId = useCallback((newPlayerId) => {
    setClientData((prev) => ({ ...prev, playerId: newPlayerId }));
  }, []);

  // CLIENT DATA SELECTED CARDS ##################################

  const [mySelectedCards, setMySelectedCards] = useState([]);

  const onMyHandCardClick = useCallback(
    (playerId, cardId) => {
      if (playerId !== clientData.playerId) return;
      setMySelectedCards((prev) => {
        if (prev.includes(cardId)) return prev.filter((x) => x !== cardId);
        return [...prev, cardId];
      });
    },
    [clientData.playerId]
  );

  // CLIENT DATA CURSOR ##########################################

  const [clientCursor, setClientCursor] = useState({
    x: 0,
    y: 0,
    mouseUp: false,
    mouseDown: false,
    hide: true,
    text: "",
  });

  const changeCursorX = useCallback((newValue) => {
    setClientCursor((prev) => ({
      ...prev,
      x: newValue,
      hide: false,
    }));
  }, []);
  const changeCursorY = useCallback((newValue) => {
    setClientCursor((prev) => ({
      ...prev,
      y: newValue,
      hide: false,
    }));
  }, []);
  const changeCursorUp = useCallback((newValue) => {
    setClientCursor((prev) => ({
      ...prev,
      mouseUp: newValue,
    }));
  }, []);
  const changeCursorDown = useCallback((newValue) => {
    setClientCursor((prev) => ({
      ...prev,
      mouseDown: newValue,
    }));
  }, []);
  const changeCursorHide = useCallback((newValue) => {
    setClientCursor((prev) => ({
      ...prev,
      hide: newValue,
    }));
  }, []);

  useEffect(() => {
    updateMyPlayer(clientData, {
      clientCursor,
      selectedCards: mySelectedCards,
    });
  }, [clientData, clientCursor, mySelectedCards]);

  // GAME DATA ##########################################

  const [gameData, setGameData] = useState(null);

  const leaveCampaignApp = useCallback(() => {
    leaveCampaign(
      clientData.campaignKey,
      clientData.deviceId,
      clientData.playerId
    );
    softResetClientData();
    setGameData(null);
  }, [
    clientData.campaignKey,
    clientData.deviceId,
    clientData.playerId,
    softResetClientData,
  ]);

  const mergeGameData = useCallback(
    (newValue) => {
      if (newValue?.deleted === true) {
        leaveCampaignApp();
        return;
      }
      setGameData((prev) => ({
        ...prev,
        ...newValue,
      }));
    },
    [leaveCampaignApp]
  );

  // VIEWPORT ##########################################

  const [viewport, setViewport] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  const handleResize = useCallback(
    () => setViewport({ height: window.innerHeight, width: window.innerWidth }),
    []
  );

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  // EFFETTI ##########################################

  // useEffect(() => {
  //   console.log("gameData changed: ", { ...gameData });
  // }, [gameData]);

  return (
    <>
      <Background />
      {CLIENT_SCENES.MENU === clientData.clientScene && (
        <Menu
          clientData={clientData}
          changeUserName={changeUserName}
          changeCampaignKey={changeCampaignKey}
          changeClientScene={changeClientScene}
          leaveCampaignApp={leaveCampaignApp}
          mergeGameData={mergeGameData}
          addToastMessage={addToastMessage}
        />
      )}
      {CLIENT_SCENES.LOBBY_PREGAME === clientData.clientScene && (
        <Pregame
          clientData={clientData}
          gameData={gameData}
          changePlayerId={changePlayerId}
          changeClientScene={changeClientScene}
          addToastMessage={addToastMessage}
        />
      )}
      {CLIENT_SCENES.JOIN_LOBBY_PREGAME === clientData.clientScene && (
        <JoinPregame
          clientData={clientData}
          changeCampaignKey={changeCampaignKey}
          changeClientScene={changeClientScene}
          mergeGameData={mergeGameData}
          addToastMessage={addToastMessage}
        />
      )}
      {CLIENT_SCENES.GAME === clientData.clientScene && (
        <Game
          clientData={clientData}
          gameData={gameData}
          leaveCampaignApp={leaveCampaignApp}
          onMyHandCardClick={onMyHandCardClick}
        />
      )}

      {CLIENT_SCENES.GAME === clientData.clientScene &&
        clientData.playerId !== "playerBlue" && (
          <CursorGhost
            playerId="playerBlue"
            gameData={gameData}
            viewport={viewport}
          />
        )}
      {CLIENT_SCENES.GAME === clientData.clientScene &&
        clientData.playerId !== "playerRed" && (
          <CursorGhost
            playerId="playerRed"
            gameData={gameData}
            viewport={viewport}
          />
        )}
      {CLIENT_SCENES.GAME === clientData.clientScene &&
        clientData.playerId !== "playerGreen" && (
          <CursorGhost
            playerId="playerGreen"
            gameData={gameData}
            viewport={viewport}
          />
        )}
      {CLIENT_SCENES.GAME === clientData.clientScene &&
        clientData.playerId !== "playerYellow" && (
          <CursorGhost
            playerId="playerYellow"
            gameData={gameData}
            viewport={viewport}
          />
        )}

      <ToastMessageContainer messages={toastMessages} />

      {clientCursor && (
        <Cursor
          playerId={clientData.playerId}
          cursorData={clientCursor}
          changeCursorX={changeCursorX}
          changeCursorY={changeCursorY}
          changeCursorUp={changeCursorUp}
          changeCursorDown={changeCursorDown}
          changeCursorHide={changeCursorHide}
          viewport={viewport}
        />
      )}
    </>
  );
};

export default App;
