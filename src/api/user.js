import { post } from "./utils";

const CONTROLLER_URL = "/api/user";

export async function RestoreSignIn() {
  return await post(`${CONTROLLER_URL}/RestoreSignIn`);
}

export async function GetUserData({ userId }) {
  return await post(`${CONTROLLER_URL}/GetUserData`, { userId });
}

export async function GetSettlement({ settlementX, settlementY }) {
  return await post(`${CONTROLLER_URL}/GetSettlement`, { settlementX, settlementY });
}

export async function UpgradeSettlement({ x, y }) {
  return await post(`${CONTROLLER_URL}/UpgradeSettlement`, { x, y });
}

export async function MoveTroops({ sourceX, sourceY, destinationX, destinationY, amount }) {
  return await post(`${CONTROLLER_URL}/MoveTroops`, { sourceX, sourceY, destinationX, destinationY, amount });
}
