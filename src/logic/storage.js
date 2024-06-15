// Synchronous

export const lsSet = (key, value) => {
  return localStorage.setItem("pbg_" + key, JSON.stringify(value));
};

export const lsGet = (key, value) => {
  return JSON.parse(localStorage.getItem("pbg_" + key));
};

export const lsRemove = (key) => {
  return localStorage.removeItem("pbg_" + key);
};

// Asynchronous

export const alsSet = (key, value) => {
  return new Promise((resolve) => {
    resolve(lsSet(key, value));
  });
};

export const alsGet = (key, value) => {
  return new Promise((resolve) => {
    resolve(lsGet(key));
  });
};

export const alsRemove = (key) => {
  return new Promise((resolve) => {
    resolve(lsRemove(key));
  });
};
