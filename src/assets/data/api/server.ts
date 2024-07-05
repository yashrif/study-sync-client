import process from "process";

export const hostname = process.env.NEXT_PUBLIC_HOSTNAME_SERVER;

export const api = `${hostname}/api`;

export const uploads=`/uploads`
