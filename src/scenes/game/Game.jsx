import React, { useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import Button from "../../components/button";
import Deck from "../../components/deck";
import Hand from "../../components/hand";
import { shuffleDeck } from "../../logic/campaign";
import { PLAYER_IDS } from "../../logic/constants";

import "./game.css";

const Game = ({
  clientData,
  gameData,
  leaveCampaignApp,
  onMyHandCardClick,
}) => {
  const onLeaveCampaign = useCallback(() => {
    leaveCampaignApp();
  }, [leaveCampaignApp]);

  useEffect(() => {
    shuffleDeck(clientData, gameData);
  }, []);

  return (
    <div id="game">
      <Deck gameData={gameData}></Deck>
      <Hand
        playerId={PLAYER_IDS.blue}
        clientData={clientData}
        gameData={gameData}
        onCardClick={onMyHandCardClick}
      ></Hand>
      <Hand
        playerId={PLAYER_IDS.red}
        clientData={clientData}
        gameData={gameData}
        onCardClick={onMyHandCardClick}
      ></Hand>
      <Hand
        playerId={PLAYER_IDS.green}
        clientData={clientData}
        gameData={gameData}
        onCardClick={onMyHandCardClick}
      ></Hand>
      <Hand
        playerId={PLAYER_IDS.yellow}
        clientData={clientData}
        gameData={gameData}
        onCardClick={onMyHandCardClick}
      ></Hand>
      <Button
        id="leave_btn"
        text="Leave"
        icon="close"
        onClick={onLeaveCampaign}
        size="small"
      />
    </div>
  );
};

Game.propTypes = {
  clientData: PropTypes.object.isRequired,
  gameData: PropTypes.object.isRequired,
  leaveCampaignApp: PropTypes.func.isRequired,
};

Game.defaultProps = {};

export default Game;
