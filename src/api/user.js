import { post } from "./utils";

const CONTROLLER_URL = "/api/user";

export async function RestoreSignIn(addToastMessage) {
  return await post(`${CONTROLLER_URL}/RestoreSignIn`, null, addToastMessage);
}

export async function GetUserData({ userId }, addToastMessage) {
  return await post(`${CONTROLLER_URL}/GetUserData`, { userId }, addToastMessage);
}

export async function GetSettlement({ settlementX, settlementY }, addToastMessage) {
  return await post(`${CONTROLLER_URL}/GetSettlement`, { settlementX, settlementY }, addToastMessage);
}

export async function UpgradeSettlement({ x, y }, addToastMessage) {
  return await post(`${CONTROLLER_URL}/UpgradeSettlement`, { x, y }, addToastMessage);
}

export async function MoveTroops({ sourceX, sourceY, destinationX, destinationY, amount }, addToastMessage) {
  return await post(`${CONTROLLER_URL}/MoveTroops`, { sourceX, sourceY, destinationX, destinationY, amount }, addToastMessage);
}
