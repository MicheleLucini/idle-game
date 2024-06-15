import packageJson from "../../package.json";

export const appVersion = packageJson.version;

export const CLIENT_SCENES = {
  MENU: "menu",
  LOBBY_PREGAME: "lobby_pregame",
  JOIN_LOBBY_PREGAME: "join_lobby_pregame",
  GAME: "game",
};

export const LSKEY = {
  CLIENT_DATA: "client_data",
};

export const PLAYER_IDS = {
  blue: "playerBlue",
  red: "playerRed",
  green: "playerGreen",
  yellow: "playerYellow",
};

export const CARD_SUIT_COLOR = {
  BLACK: 1,
  RED: 2,
};

export const CARD_SUIT = {
  SPADE: 1,
  HEART: 2,
  DIAMOND: 3,
  CLUB: 4,
  JOKER: 5,
};

export const CARD_RANK = {
  ACE: 1,
  TWO: 3,
  THREE: 4,
  FOUR: 5,
  FIVE: 6,
  SIX: 7,
  SEVEN: 8,
  EIGHT: 9,
  NINE: 10,
  TEN: 11,
  JACK: 12,
  QUEEN: 13,
  KING: 14,
  JOKER: 15,
};
