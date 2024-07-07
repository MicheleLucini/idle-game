export const uuidv4 = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export function formatBigNumber(number) {
  if(number > 1e6)
    return (number/1e6).toFixed(1) + "M"
  if(number > 1e3)
    return (number/1e3).toFixed(1) + "K"
  return number;
}

export function calculateTroopPower(troopAmount, defenseLevel) {
  const baseExponent = 1.1;
  const defenseExponent = 1.1;
  const baseDefensePerLevel = 100;
  var extraTroops = Math.pow(defenseLevel, defenseExponent) * baseDefensePerLevel;
  var totalTroops = troopAmount + extraTroops;
  var totalPower = Math.pow(totalTroops, baseExponent) * (defenseLevel / 100.0);
  return totalPower;
}

export function getSettlementHourlyProduction(currentLevel) {
  const baseProduction = 100;
  const multiplier = 1.10;
  return baseProduction * Math.pow(multiplier, currentLevel);
}

export function getSettlementHourlyRecruitment(currentLevel) {
  const baseProduction = 5;
  return baseProduction * currentLevel;
}

export function getSettlementUpgradeCost(currentLevel){
  const baseCost = 50;
  const multiplier = 1.15;
  return baseCost * Math.pow(multiplier, currentLevel);
}

export function distance(sourceX, sourceY, sourceX, sourceY) {
  return Math.sqrt(Math.pow(sourceY - sourceY, 2) + Math.pow(sourceX - sourceX, 2));
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