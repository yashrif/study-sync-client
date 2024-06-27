import process from "process";

export const hostname = process.env.NEXT_PUBLIC_HOSTNAME;

export const api = `${hostname}/api/v1`;
export const auth = `/auth`;

export const register = `${auth}/register`;
export const authenticate = `${auth}/authenticate`;
export const refreshTokens = `${auth}/refresh`;
