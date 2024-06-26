import {
  CollectionPlan,
  Contractor,
  LandFill,
  STS,
  Workforce,
} from "@prisma/client";

import { CustomVehicleEntry, User } from "@allTypes";
import {
  api,
  contractorDataEndpoint,
  landfillEndpoint,
  stsDataEndpoint,
  userDataEndpoint,
} from "@assets/data/api/endpoints";
import { CustomContractor } from "@/types/contractor";
import { CustomWasteEntry } from "@/types/wasteEntry";

export async function getSTS(cookieStore: any): Promise<STS[]> {
  let STSList = await fetch(stsDataEndpoint, {
    cache: "no-store",
    headers: {
      cookie: cookieStore,
    },
  }).then(async (res) => {
    const data = await res.json();
    return data.sts;
  });

  return STSList;
}

export async function getLandfill(cookieStore: any): Promise<LandFill[]> {
  let LandfillList = await fetch(landfillEndpoint, {
    cache: "no-store",
    headers: {
      cookie: cookieStore,
    },
  }).then(async (res) => {
    const data = await res.json();
    return data.landfills;
  });

  return LandfillList;
}

export async function getUser(cookieStore: any): Promise<User> {
  const userData = await fetch(
    `${userDataEndpoint}/${cookieStore.get("userId")?.value}`,
    {
      cache: "no-store",
      // @ts-ignore
      headers: {
        cookie: cookieStore,
      },
    }
  ).then(async (res) => {
    const data = await res.json();
    return data;
  });

  return userData.user;
}

export async function getContractors(
  cookieStore: any
): Promise<CustomContractor[]> {
  let contractorList = await fetch(`${contractorDataEndpoint}`, {
    cache: "no-store",
    headers: {
      cookie: cookieStore,
    },
  }).then(async (res) => {
    const data = await res.json();
    return data.contractors;
  });

  return contractorList;
}

export async function getWasteEntries(
  cookieStore: any
): Promise<CustomWasteEntry[]> {
  let wasteEntryList = await fetch(`${api}/waste-entries`, {
    cache: "no-store",
    headers: {
      cookie: cookieStore,
    },
  }).then(async (res) => {
    const data = await res.json();
    return data.wasteEntries;
  });

  return wasteEntryList;
}

export async function getWorkForces(cookieStore: any): Promise<Workforce[]> {
  let workForceList = await fetch(`${api}/work-forces`, {
    cache: "no-store",
    headers: {
      cookie: cookieStore,
    },
  }).then(async (res) => {
    const data = await res.json();
    return data.workForces;
  });

  return workForceList;
}

export async function getCollectionPlans(
  cookieStore: any
): Promise<CollectionPlan[]> {
  let collectionPlans = await fetch(`${api}/collection-plans`, {
    cache: "no-store",
    headers: {
      cookie: cookieStore,
    },
  }).then(async (res) => {
    const data = await res.json();
    return data.collectionPlans;
  });

  return collectionPlans;
}

export async function getWorkHours(cookieStore: any): Promise<Workforce[]> {
  let workHourList = await fetch(`${api}/work-hour`, {
    cache: "no-store",
    headers: {
      cookie: cookieStore,
    },
  }).then(async (res) => {
    const data = await res.json();
    return data.workHours;
  });

  return workHourList;
}
