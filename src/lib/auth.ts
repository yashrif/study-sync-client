import Cookies from "js-cookie";

const TOKEN_KEY = "authToken";
const REFRESH_TOKEN_KEY = "refreshToken";

export const setTokens = (
  authToken: string,
  refreshToken: string,
  type: "session" | "duration" = "duration"
): void => {
  if (type === "duration") {
    Cookies.set(TOKEN_KEY, authToken, {
      expires: 7, // 7 days
      secure: true,
      sameSite: "strict",
    });
    Cookies.set(REFRESH_TOKEN_KEY, refreshToken, {
      expires: 30, // 30 days
      secure: true,
      sameSite: "strict",
    });
  } else {
    Cookies.set(TOKEN_KEY, authToken);
    Cookies.set(REFRESH_TOKEN_KEY, refreshToken);
  }
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
