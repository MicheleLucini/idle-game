import moment from 'moment';

function getStorageKey(tag, key) {
  var sName = "penitentrealms_" + tag + "_" + key;
  return sName.toLowerCase();
}

export function setLocal(tag, key, data, expirySeconds) {
  if (!expirySeconds || expirySeconds <= 0) {
    expirySeconds = 365 * 24 * 60 * 60;
  }

  var objLS = {
    creation: moment().format(),
    expiration: moment().add(expirySeconds, 'seconds').format(),
    data: data
  };

  localStorage.setItem(getStorageKey(tag, key), JSON.stringify(objLS));
}

export function getLocal(tag, key) {
  var objLS = JSON.parse(localStorage.getItem(getStorageKey(tag, key)));

  if (!objLS)
    return;

  // Expiration
  if (moment(objLS.expiration).isBefore(moment())) {
    delLocal(tag, key);
    return;
  }

  return objLS.data;
}

export function delLocal(tag, key) {
  localStorage.removeItem(getStorageKey(tag, key));
}

