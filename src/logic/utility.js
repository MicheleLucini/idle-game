export const uuidv4 = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const isMobile = () => {
  return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

export function formatBigNumber(number) {
  if (number > 1e6)
    return (number / 1e6).toFixed(1) + "M"
  if (number > 1e3)
    return (number / 1e3).toFixed(1) + "K"
  return number;
}

export function calculateTroopPower(troopAmount, settlementLevel) {
  const baseExponent = 1.1;
  var extraTroops = getGarrison(settlementLevel);
  var totalTroops = troopAmount + extraTroops;
  var totalPower = Math.pow(totalTroops, baseExponent) * getWalls(settlementLevel);
  return totalPower;
}

export function calculateTroopPowerGain(troopAmount, settlementLevel) {
  return calculateTroopPower(troopAmount, settlementLevel + 1) - calculateTroopPower(troopAmount, settlementLevel);
}

export function getGarrison(settlementLevel) {
  const baseDefensePerLevel = 100;
  const defenseExponent = 1.1;
  return Math.pow(settlementLevel, defenseExponent) * baseDefensePerLevel;
}

export function getGarrisonGain(settlementLevel) {
  return getGarrison(settlementLevel + 1) - getGarrison(settlementLevel)
}

export function getWalls(settlementLevel) {
  return settlementLevel / 100.0;
}

export function getWallsGain(settlementLevel) {
  return getWalls(settlementLevel + 1) - getWalls(settlementLevel);
}

export function getMoneyProduction(settlementLevel) {
  const baseProduction = 100;
  const multiplier = 1.10;
  return baseProduction * Math.pow(multiplier, settlementLevel);
}

export function getMoneyProductionGain(settlementLevel) {
  return getMoneyProduction(settlementLevel + 1) - getMoneyProduction(settlementLevel + 1);
}

export function getTroopProduction(settlementLevel) {
  const baseProduction = 5;
  return baseProduction * settlementLevel;
}

export function getTroopProductionGain(settlementLevel) {
  return getTroopProduction(settlementLevel + 1) - getTroopProduction(settlementLevel)
}

export function getUpgradeCost(settlementLevel) {
  const baseCost = 50;
  const multiplier = 1.15;
  return baseCost * Math.pow(multiplier, settlementLevel);
}

export function distance(sourceX, sourceY, destinationX, destinationY) {
  return Math.sqrt(Math.pow(sourceX - sourceY, 2) + Math.pow(destinationX - destinationY, 2));
}

export function calculateTroopTravelTime(sourceX, sourceY, destinationX, destinationY, troopAmount) {
  const travelDistance = distance(sourceX, sourceY, destinationX, destinationY);
  const travelTimeInSeconds = Math.pow(travelDistance, 1.10) * Math.pow(troopAmount, 0.8);
  return travelTimeInSeconds;
}

export function calculateUnitLossPercentage(myPower, enemyPower) {
  const myLossPercentage = Math.min(1.0, enemyPower / myPower);
  return myLossPercentage
}