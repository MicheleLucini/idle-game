import React, { useMemo } from "react";
import PropTypes from "prop-types";

import CardBackFace from "../cardBackFace";

import "./deck.css";

function zth(max, prcntg, intero) {
  var x = (max * prcntg) / 100;
  if (intero) return String(Math.round(x)).padStart(2, "0");
  return Math.round(x * 10) / 10;
}

const Deck = ({ gameData }) => {
  const deckCards = useMemo(() => {
    return gameData.deck ? JSON.parse(gameData.deck) : [];
  }, [gameData.deck]);
  const deckLengthPercentage = useMemo(() => {
    return (deckCards?.length * 100) / 108;
  }, [deckCards]);
  const firsPickDeckColor = useMemo(() => {
    return deckCards?.length > 0 ? deckCards[0].deckColor : null;
  }, [deckCards]);

  const deckShadow = useMemo(() => {
    return (
      "0 " + zth(20, deckLengthPercentage) + "px 0 #ccc," +
      "0 " + zth(20, deckLengthPercentage) + "px " + zth(40, deckLengthPercentage) + "px rgba(0,0,0,0." + zth(19, deckLengthPercentage, true) + ")," +
      "0 " + zth(22, deckLengthPercentage) + "px " + zth(16, deckLengthPercentage) + "px rgba(0,0,0,0." + zth(30, deckLengthPercentage, true) + ")"
    );
  }, [deckLengthPercentage]);

  return (
    <div id="deck" style={{ boxShadow: deckShadow }}>
      <CardBackFace deckColor={firsPickDeckColor}></CardBackFace>
    </div>
  );
};

Deck.propTypes = {
  gameData: PropTypes.object.isRequired,
};

Deck.defaultProps = {};

export default Deck;
