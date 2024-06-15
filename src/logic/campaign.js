import {
  dbPut,
  dbDelete,
  dbRead,
  dbSubscribe,
  dbUnsubscribe,
} from "./database";
import { getRandomCampaignKey, getNewShuffledDeck } from "./utility";
import { appVersion, CLIENT_SCENES, PLAYER_IDS } from "./constants";

// const campaign = {
//   key: "", // chiave della campagna "AAAA"
//   appVersion: "", // versione app che ha creato la campagna "0.0.4"
//   creatorDeviceId: "", // uuid identificativo del device che ha creato la campagna
// };

export const createCampaign = async (clientData) => {
  const newGame = {
    key: getRandomCampaignKey(),
    appVersion: appVersion,
    creatorDeviceId: clientData.deviceId,
  };

  await dbPut(newGame.key, newGame);

  return newGame;
};

const deleteCampaign = async (key) => {
  await dbPut(key, { deleted: true });
};

const downloadCampaign = async (key) => {
  return await dbRead(key);
};

const subscribeCampaign = async (key, onChange) => {
  await dbSubscribe(key, onChange);
};

const updateCampaign = async (key, campaignData) => {
  await dbPut(key, campaignData);
};

const existCampaign = async (key) => {
  const campaign = await dbRead(key);
  return !!campaign?.key;
};

const isMyCampaign = async (key) => {
  if (!clientData?.deviceId) return false;
  const campaign = await dbRead(key);
  return campaign?.creatorDeviceId === clientData.deviceId;
};

const campaignIsSameVersion = async (key) => {
  const campaign = await dbRead(key);
  return campaign?.appVersion === appVersion;
};

/* Complex game ops */

export const joinCampaign = async ({ key, clientData, onCampaignChange }) => {
  if (!key || key.length !== 4) {
    return "The campaign key is not valid";
  }

  const campaign = await dbRead(key);

  if (!campaign || !campaign.key) {
    return "The campaign does not exist";
  }

  if (campaign.appVersion !== appVersion) {
    return "The campaign has a different version";
  }

  updateMyPlayer(clientData);

  onCampaignChange(campaign);

  await dbSubscribe(key, onCampaignChange);

  return null;
};

export const leaveCampaign = async (key, deviceId, playerId) => {
  await dbUnsubscribe(key);

  const campaign = await dbRead(key);

  if (campaign?.creatorDeviceId === deviceId) {
    await deleteCampaign(key);
  } else {
    await resetMyPlayer(key, playerId);
  }
};

/* Gestione player */

export const updateMyPlayer = (
  clientData,
  { clientCursor, selectedCards } = {}
) => {
  if (!clientData.playerId || !clientData.campaignKey) return;

  let myPlayerData = {};
  myPlayerData[clientData.playerId + "_deviceId"] = clientData.deviceId;
  myPlayerData[clientData.playerId + "_userName"] = clientData.userName;
  myPlayerData[clientData.playerId + "_clientScene"] = clientData.clientScene;

  if (clientData.clientScene === CLIENT_SCENES.GAME) {
    if (clientCursor) {
      myPlayerData[clientData.playerId + "_cursorX"] = clientCursor.x;
      myPlayerData[clientData.playerId + "_cursorY"] = clientCursor.y;
      myPlayerData[clientData.playerId + "_cursorHide"] = clientCursor.hide;
      myPlayerData[clientData.playerId + "_cursorText"] = clientCursor.text;
    }
    if (selectedCards) {
      myPlayerData[clientData.playerId + "_selectedCards"] =
        JSON.stringify(selectedCards);
    }
  }

  updateCampaign(clientData.campaignKey, myPlayerData);
};

export const resetMyPlayer = (key, playerId) => {
  if (!playerId || !key) return;

  const myPlayerData = {
    [playerId + "_deviceId"]: null,
    [playerId + "_userName"]: null,
    [playerId + "_clientScene"]: null,
    [playerId + "_cursorX"]: null,
    [playerId + "_cursorY"]: null,
    [playerId + "_cursorHide"]: null,
    [playerId + "_cursorText"]: null,
    [playerId + "_selectedCards"]: null,
  };

  updateCampaign(key, myPlayerData);
};

/* Gestione deck */

export const updateDeck = async (clientData, deck) => {
  const campaign = await dbRead(key);

  if (!clientData.campaignKey || campaign?.creatorDeviceId !== deviceId) return;

  updateCampaign(clientData.campaignKey, { deck });
};

export const shuffleDeck = async (clientData, gameData) => {
  if (
    !clientData.campaignKey ||
    gameData?.creatorDeviceId !== clientData.deviceId ||
    gameData?.deck
  )
    return;

  console.log("Deck shuffled!");

  const updates = {};
  updates.deck = getNewShuffledDeck();

  Object.values(PLAYER_IDS).forEach((playerId) => {
    updates[playerId + "_hand"] = [];
  });

  for (var i = 0; i < 13; i++) {
    Object.values(PLAYER_IDS).forEach(async (playerId) => {
      updates[playerId + "_hand"].push(updates.deck.shift());
    });
  }

  const updatesStringified = {};
  for (const [key, value] of Object.entries(updates)) {
    updatesStringified[key] = JSON.stringify(value);
  }

  updateCampaign(clientData.campaignKey, updatesStringified);
};

// export const drawCard = async (clientData, gameData, playerId) => {
//   console.log(gameData?.deck);
//   if (
//     !clientData.campaignKey ||
//     gameData?.creatorDeviceId !== clientData.deviceId ||
//     !gameData?.deck
//   )
//     return;

//   const deck = JSON.parse(gameData.deck);
//   const card = deck.shift();
//   const playerHand = JSON.parse(gameData[playerId + "_hand"]);
//   playerHand.push(card);

//   const updates = {};
//   updates.deck = JSON.stringify(deck);
//   updates[playerId + "_hand"] = JSON.stringify(playerHand);

//   console.log(updates);

//   await updateCampaign(clientData.campaignKey, updates);
// };
