import axios from "axios";

import { aiEndpoints as studySync } from "@/assets/data/api";

const studySyncAI = axios.create({
  baseURL: studySync.api,
});

export default studySyncAI;
