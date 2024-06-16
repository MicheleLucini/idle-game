import React, { useEffect, useCallback } from "react";
import PropTypes from "prop-types";

import Button from "../../components/button";

import GameMap from './GameMap.jsx';
import "./game.css";

const Game = ({
  addToastMessage,
  gameData,
  setGameData,
}) => {
  const onLogout = useCallback(() => {
    setGameData(null);
  }, [setGameData]);

  return (
    <div id="game">
      <GameMap />
      <div id="user_data">
        <span>{JSON.stringify(gameData, null, 2)}</span>
        <Button
          text="Logout"
          icon="close"
          onClick={onLogout}
          size="small"
        />
      </div>
    </div>
  );
};

Game.propTypes = {
  addToastMessage: PropTypes.func.isRequired,
  setGameData: PropTypes.func.isRequired,
};

export default Game;
