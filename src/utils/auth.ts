import Cookies from "js-cookie";

const TOKEN_KEY = "authToken";
const REFRESH_TOKEN_KEY = "refreshToken";

export const setTokens = (authToken: string, refreshToken: string): void => {
  Cookies.set(TOKEN_KEY, authToken, {
    expires: 1,
    secure: true,
    sameSite: "strict",
  });
  Cookies.set(REFRESH_TOKEN_KEY, refreshToken, {
    expires: 30,
    secure: true,
    sameSite: "strict",
  });
};

export const getAuthToken = (): string | undefined => {
  return Cookies.get(TOKEN_KEY);
};

export const getRefreshToken = (): string | undefined => {
  return Cookies.get(REFRESH_TOKEN_KEY);
};

export const removeTokens = (): void => {
  Cookies.remove(TOKEN_KEY);
  Cookies.remove(REFRESH_TOKEN_KEY);
};
