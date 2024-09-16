import process from "process";

export const hostname = process.env.NEXT_PUBLIC_HOSTNAME_AI;

export const api = `${hostname}/api`;

export const uploads = { create: `/uploadFile`, delete: `/removeFile` };

const generate = "/generate";
export const qna = `${generate}/qna`;
export const cqna = `${generate}/cqna`;
export const indxFile = `/indexFile`;
export const evaluate = `${generate}/compare_answer`;
export const queryFile = `${generate}/queryIndexedFile`;
export const response = `${generate}/response`;

export const extract = "/extract";
export const topics = `${extract}/topics`;

export const downloadFile = "/downloadFile";
