export const FRAME_RATE = 20;
export const MAP_MARGIN_TILES = 12;
export const TILE_DIMENSIONS_PX = 60;
export const VISIBILITY_RADIUS = 10;

export const mapMovement = (movement, gameData) => {
  // Calcolo del delta tra server e client in millisecondi
  const serverMoment = moment(gameData.serverDate);
  const clientMoment = moment(gameData.clientDate);
  const deltaServerClient = clientMoment.diff(serverMoment);
  // Calcolo della durata totale del movimento in millisecondi
  const arrivalMoment = moment(movement.arrivalDate);
  const departureMoment = moment(movement.departureDate);
  const movementDuration = arrivalMoment.diff(departureMoment);
  // Calcolo del tempo rimanente per il client
  const currentClientTime = moment();
  const synchronizedClientTime = currentClientTime.subtract(deltaServerClient, 'milliseconds');
  const remainingClientTime = Math.max(arrivalMoment.diff(synchronizedClientTime), 0);
  const travelPtc = Math.min(100 - (remainingClientTime * 100 / movementDuration), 100);
  return {
    ...movement,
    travelTotal: movementDuration,
    travelRemaining: remainingClientTime,
    travelPtc,
  };
};
