import { CARD_RANK, CARD_SUIT, CARD_SUIT_COLOR, PLAYER_IDS } from "./constants";

export const uuidv4 = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const getRandomCampaignKey = () => {
  var result = [];
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (var i = 0; i < 4; i++) {
    result.push(
      characters.charAt(Math.floor(Math.random() * characters.length))
    );
  }
  return result.join("");
};

export const cursorPositionPx2Pct = (x, y, viewport) => {
  return {
    x: (x * 100) / viewport.width,
    y: (y * 100) / viewport.height,
  };
};

export const cursorXPctToPx = (x, viewport) => {
  return (x * viewport.width) / 100;
};

export const cursorYPctToPx = (y, viewport) => {
  return (y * viewport.height) / 100;
};

export const getNewShuffledDeck = () => {
  const deck = [];

  var cardId = 0;

  Object.values(CARD_SUIT_COLOR).forEach((deckColor) => {
    deck.push(
      {
        rank: CARD_RANK.JOKER,
        suit: CARD_SUIT.JOKER,
        deckColor,
      },
      {
        rank: CARD_RANK.JOKER,
        suit: CARD_SUIT.JOKER,
        deckColor,
      }
    );
    Object.values(CARD_SUIT).forEach((suit) => {
      if (suit === CARD_SUIT.JOKER) return;
      Object.values(CARD_RANK).forEach((rank) => {
        if (rank === CARD_RANK.JOKER) return;
        cardId++;
        deck.push({
          id: cardId,
          suit,
          rank,
          color: getColorFromSuit(suit),
          deckColor,
        });
      });
    });
  });

  return shuffle(deck);
};

export function getColorFromSuit(suit) {
  if (suit === CARD_SUIT.DIAMOND || suit === CARD_SUIT.HEART)
    return CARD_SUIT_COLOR.RED;
  return CARD_SUIT_COLOR.BLACK;
}

function shuffle(array) {
  var currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

export function getColorFromPlayerId(playerId) {
  switch (playerId) {
    case PLAYER_IDS.blue:
      return "blue";
    case PLAYER_IDS.red:
      return "red";
    case PLAYER_IDS.green:
      return "green";
    case PLAYER_IDS.yellow:
      return "yellow";
    default:
      return "";
  }
}

export function getInfoFromCardRank(rank) {
  switch (rank) {
    case CARD_RANK.KING:
      return "K";
    case CARD_RANK.QUEEN:
      return "Q";
    case CARD_RANK.JACK:
      return "J";
    case CARD_RANK.TEN:
      return "10";
    case CARD_RANK.NINE:
      return "9";
    case CARD_RANK.EIGHT:
      return "8";
    case CARD_RANK.SEVEN:
      return "7";
    case CARD_RANK.SIX:
      return "6";
    case CARD_RANK.FIVE:
      return "5";
    case CARD_RANK.FOUR:
      return "4";
    case CARD_RANK.THREE:
      return "3";
    case CARD_RANK.TWO:
      return "2";
    case CARD_RANK.ACE:
      return "A";
    default:
      return "";
  }
}
