import React, { useState } from "react";
import moment from "moment";

import { GetUserData } from "./api/user";

import Background from "./scenes/background";
import Access from "./scenes/access";
import Game from "./scenes/game";

import ToastMessageContainer from "./components/toastMessage";
import { Cursor } from "./components/cursor";

import { uuidv4 } from "./logic/utility";

import "./App.css";

const App = () => {
  const [gameData, setGameData] = useState(null);
  const [refreshingGameData, setRefreshingGameData] = useState(false);

  const mapGameData = (data) => {
    const mappedData = {
      ...data,
      userSettlements: data.userSettlements.map((x) => ({ ...x, isMine: true }),),
      clientDate: moment().format(),
    };
    setGameData(mappedData);
  };

  const refreshGameData = () => {
    if (refreshingGameData) return;
    GetUserData({ userId: gameData.id }, addToastMessage)
      .then((data) => {
        mapGameData(data);
      })
      .finally(() => setRefreshingGameData(false));
  };

  const onLogout = () => {
    setGameData(null);
  };

  // TOAST MESSAGES ##########################################

  const [toastMessages, setToastMessages] = useState([]);

  const deleteToastMessage = (id) => {
    setToastMessages((prev) =>
      prev.filter((toastMessage) => toastMessage.id !== id)
    );
  };

  const addToastMessage = (type, text) => {
    let id = uuidv4();
    setToastMessages((prev) => [...prev, { id, type, text }]);
    setTimeout(() => deleteToastMessage(id), 3000);
  };

  // RENDER ##########################################

  return (
    <>
      <Background />

      {!gameData && (
        <Access
          addToastMessage={addToastMessage}
          mapGameData={mapGameData}
        />
      )}
      {gameData && (
        <Game
          addToastMessage={addToastMessage}
          gameData={gameData}
          onLogout={onLogout}
          refreshGameData={refreshGameData}
        />
      )}

      <ToastMessageContainer messages={toastMessages} />

      <Cursor />
    </>
  );
};

export default App;
