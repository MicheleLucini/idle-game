import axios from "axios";
import { getLocal } from "../logic/storage";

export const BASE_URL = "https://penitentrealms.zapto.org";
const DEFAULT_TIMEOUT = 30000;

var MESSAGE_TYPE = {
  SUCCESS: 1,
  INFO: 2,
  WARNING: 3,
  ERROR: 4
};

function responseIsHttpError500(response) {
  return response?.status === 500;
}

function responseHasServerErrors(response) {
  if (response?.data?.messages) {
    return response.data.messages.some((x) => x.messageType === MESSAGE_TYPE.ERROR)
  }
  return false;
}

function formatResponseServerMessages(response) {
  return response.data.messages.map((x) => x.description).join("\n");
}

export async function post(url, body = {}, addToastMessage) {
  const userToken = getLocal("user", "token");

  let response;
  try {
    response = await axios({
      method: "post",
      baseURL: BASE_URL,
      url: url,
      data: {
        ...body,
        t: userToken?.token,
        u: userToken?.id,
      },
      timeout: DEFAULT_TIMEOUT,
    });
  } catch (error) {
    console.log(error)
    if (responseIsHttpError500(error.response)) {
      if (addToastMessage) addToastMessage("error", "Something went wrong. " + error.response);
      throw error;
    }
    throw error;
  }

  if (addToastMessage && response?.data?.messages?.length > 0) {
    response.data.messages.map((x) => (
      x.messageType === MESSAGE_TYPE.ERROR
        ? addToastMessage("error", x.messageCode + ": " + x.description)
        : addToastMessage("error", x.messageType + "." + x.messageCode + ": " + x.description)
    ));
  }
  if (responseHasServerErrors(response)) {
    throw new Error(formatResponseServerMessages(response));
  }

  return response.data.value;
}
