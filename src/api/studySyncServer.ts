import axios from "axios";

import { serverEndpoints as studySync } from "@/assets/data/api";

const studySyncServer = axios.create({
  baseURL: studySync.api,
  headers: {
    "Content-Type": "application/json",
  },
});

export default studySyncServer;
