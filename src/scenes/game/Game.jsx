import React, { useEffect, useCallback } from "react";
import PropTypes from "prop-types";

import Button from "../../components/button";

import GameMap from './GameMap.jsx';
import "./game.css";

const Game = ({
  addToastMessage,
  setUser,
}) => {
  const onLogout = useCallback(() => {
    setUser(null);
  }, [setUser]);

  return (
    <div id="game">
      <GameMap />
      <Button
        id="leave_btn"
        text="Logout"
        icon="close"
        onClick={onLogout}
        size="small"
      />
    </div>
  );
};

Game.propTypes = {
  addToastMessage: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
};

export default Game;
