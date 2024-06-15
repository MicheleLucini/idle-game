import React, { useEffect, useCallback } from "react";
import PropTypes from "prop-types";

import Button from "../../components/button";

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

Game.defaultProps = {};

export default Game;
