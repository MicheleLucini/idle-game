import React, { useState, useCallback, useEffect } from "react";

import Background from "./scenes/background";
import Access from "./scenes/access";
import Game from "./scenes/game";
// import Pregame from "./scenes/pregame";
// import JoinPregame from "./scenes/joinPregame";

import { Cursor } from "./components/cursor";
import ToastMessageContainer from "./components/toastMessage";

import { appVersion, CLIENT_SCENES, LSKEY } from "./logic/constants";
// import { updateMyPlayer, leaveCampaign } from "./logic/campaign";
import { uuidv4 } from "./logic/utility";
import { lsGet, alsSet } from "./logic/storage";

import "./App.css";

const App = () => {
  const [user, setUser] = useState(null);

  // TOAST MESSAGES ##########################################

  const [toastMessages, setToastMessages] = useState([]);

  const deleteToastMessage = useCallback((id) => {
    setToastMessages((prev) =>
      prev.filter((toastMessage) => toastMessage.id !== id)
    );
  }, []);

  const addToastMessage = useCallback((type, text) => {
    let id = uuidv4();
    setToastMessages((prev) => [...prev, { id, type, text }]);
    setTimeout(() => deleteToastMessage(id), 3000);
  }, [deleteToastMessage]);

  // CLIENT CURSOR ##########################################

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

  // GAME DATA ##########################################

  // const [gameData, setGameData] = useState(null);

  // const leaveCampaignApp = useCallback(() => {
  //   leaveCampaign(
  //     clientData.campaignKey,
  //     clientData.deviceId,
  //     clientData.playerId
  //   );
  //   softResetClientData();
  //   setGameData(null);
  // }, [
  //   clientData.campaignKey,
  //   clientData.deviceId,
  //   clientData.playerId,
  //   softResetClientData,
  // ]);

  // const mergeGameData = useCallback(
  //   (newValue) => {
  //     if (newValue?.deleted === true) {
  //       leaveCampaignApp();
  //       return;
  //     }
  //     setGameData((prev) => ({
  //       ...prev,
  //       ...newValue,
  //     }));
  //   },
  //   [leaveCampaignApp]
  // );

  // VIEWPORT ##########################################

  // const [viewport, setViewport] = useState({
  //   height: window.innerHeight,
  //   width: window.innerWidth,
  // });

  // const handleResize = useCallback(
  //   () => setViewport({ height: window.innerHeight, width: window.innerWidth }),
  //   []
  // );

  // useEffect(() => {
  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, [handleResize]);

  // EFFETTI ##########################################

  // useEffect(() => {
  //   console.log("gameData changed: ", { ...gameData });
  // }, [gameData]);

  return (
    <>
      <Background />
      {!user && (
        <Access
          addToastMessage={addToastMessage}
          setUser={setUser}
        />
      )}
      {user && (
        <Game
          addToastMessage={addToastMessage}
          setUser={setUser}
        />
      )}

      {/* {CLIENT_SCENES.MENU === clientData.clientScene && (
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
      )} */}

      <ToastMessageContainer messages={toastMessages} />

      {clientCursor && (
        <Cursor
          cursorData={clientCursor}
          changeCursorX={changeCursorX}
          changeCursorY={changeCursorY}
          changeCursorUp={changeCursorUp}
          changeCursorDown={changeCursorDown}
          changeCursorHide={changeCursorHide}
        />
      )}
    </>
  );
};

export default App;
