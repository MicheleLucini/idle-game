import { post } from "./utils";

const CONTROLLER_URL = "/api/public";

export async function Register({ email, password }, addToastMessage) {
  return await post(`${CONTROLLER_URL}/Register`, {
    email,
    password,
  }, addToastMessage);
}

export async function SignIn({ email, password }, addToastMessage) {
  return await post(`${CONTROLLER_URL}/SignIn`, {
    email,
    password,
  }, addToastMessage);
}
