import React, { useMemo } from "react";
import PropTypes from "prop-types";

import { getColorFromPlayerId } from "../../logic/utility";
import { PLAYER_IDS } from "../../logic/constants";
import Card from "../card";

import "./hand.css";

function getHandPositionBasedOnPlayer(clientPlayerId, playerId) {
  if (clientPlayerId === playerId) return "south";

  const arr = Object.values(PLAYER_IDS);
  const offset = arr.indexOf(clientPlayerId);

  for (var i = 0; i < arr.length; i++) {
    var index = (i + offset) % arr.length;
    if (arr[index] !== playerId) continue;
    switch (i) {
      case 1:
        return "east";
      case 2:
        return "north";
      case 3:
        return "west";
    }
  }
}

const Hand = ({ playerId, clientData, gameData, onCardClick }) => {
  const selectedCards = useMemo(() => {
    if (!gameData[playerId + "_selectedCards"]) return [];
    const arr = JSON.parse(gameData[playerId + "_selectedCards"]);
    return arr || [];
  }, [playerId, gameData[playerId + "_selectedCards"]]);

  const isMyHand = useMemo(
    () => playerId === clientData.playerId,
    [playerId, clientData.playerId]
  );

  const handCards = useMemo(() => {
    const cards = gameData[playerId + "_hand"]
      ? JSON.parse(gameData[playerId + "_hand"])
      : [];
    cards.sort((a, b) => a.suit - b.suit);
    cards.sort((a, b) => a.rank - b.rank);
    return cards;
  }, [gameData[playerId + "_hand"]]);

  const handClass = useMemo(
    () =>
      [
        "hand",
        getColorFromPlayerId(playerId),
        getHandPositionBasedOnPlayer(clientData.playerId, playerId),
      ]
        .filter((x) => !!x)
        .join(" "),
    [playerId]
  );

  const playerName = useMemo(() => {
    if (gameData[playerId + "_userName"])
      return gameData[playerId + "_userName"];
    return "Player " + getColorFromPlayerId(playerId) + " (bot)";
  }, [playerId]);

  return (
    <div className={handClass}>
      <div className="wrapper">
        <span className="player-name">{playerName}</span>
        {handCards?.map((card, i) => {
          const isSelected = selectedCards.includes(card.id);
          return (
            <Card
              key={i}
              card={card}
              isFlipped={isMyHand}
              isSelected={isSelected}
              onClick={() => onCardClick(playerId, card.id)}
            />
          );
        })}
      </div>
    </div>
  );
};

Hand.propTypes = {
  playerId: PropTypes.string.isRequired,
  clientData: PropTypes.object.isRequired,
  gameData: PropTypes.object.isRequired,
  onCardClick: PropTypes.func.isRequired,
};

Hand.defaultProps = {};

export default Hand;
