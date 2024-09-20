import process from "process";

export const hostname = process.env.NEXT_PUBLIC_HOSTNAME_DB;

export const api = `${hostname}/api/v1`;
export const auth = `/auth`;

export const register = `${auth}/register`;
export const authenticate = `${auth}/authenticate`;
export const refresh = `${auth}/refresh`;

export const demo = `/demo-controller`;

export const uploads = `/uploads`;

export const quizzes = `/quizzes`;

export const flashcards = `/flashcards`;

export const cqs = `/cqs`;

export const users = `/users`;
export const changePassword = `${users}/change-password`;

export const topics = `/topics`;

export const planners = `/planners`;

export const preferences = `/preferences`;

export const slides = `/slides`;
