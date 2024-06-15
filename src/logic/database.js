import Gun from "gun";

const G = Gun(["https://project-bg.herokuapp.com/gun"]);
const dbLogActive = false;

const dbLog = (message?: any, ...params: any[]) => {
  if (dbLogActive) console.log(message, ...params);
};

export const dbPut = (dbObjId, data) => {
  return new Promise((resolve) => {
    G.get(dbObjId).put(data, (ack) => {
      dbLog("Data " + dbObjId + " stored: ", ack);
      resolve(ack);
    });
  });
};

export const dbDelete = (dbObjId) => {
  return new Promise((resolve) => {
    G.get(dbObjId).put(null, (ack) => {
      dbLog("Data " + dbObjId + " deleted: ", ack);
      resolve(ack);
    });
  });
};

export const dbRead = (dbObjId) => {
  return new Promise((resolve) => {
    G.get(dbObjId).once((requestedData) => {
      dbLog("Data " + dbObjId + " read: ", requestedData);
      resolve(requestedData);
    });
  });
};

export const dbSubscribe = (dbObjId, onChange) => {
  return new Promise((resolve) => {
    G.get(dbObjId).on((value, key, _msg, _ev) => onChange(value), true);
    resolve();
  });
};

export const dbUnsubscribe = (dbObjId) => {
  return new Promise((resolve) => {
    G.get(dbObjId).off();
    resolve();
  });
};
