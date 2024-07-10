import process from "process";

export const hostname = process.env.NEXT_PUBLIC_HOSTNAME_AI;

export const api = `${hostname}/api`;

export const uploads = `/uploadFile`;

const generate = "/generate";
export const qna = `${generate}/qna`;
