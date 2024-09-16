"use client";

import { useCallback } from "react";

import studySyncDB from "@/api/studySyncDB";
import { dbEndpoints } from "@/assets/data/api";
import { useFetchData } from "@/hooks/fetchData";
import { usePlannerUploadsContext } from "@/hooks/usePlannerUploadsContext";

type Props = {
  children: React.ReactNode;
};

const PlannerReviewLayout: React.FC<Readonly<Props>> = ({ children }) => {
  const { dispatch } = usePlannerUploadsContext();
  useFetchData({
    apiCall: useCallback(() => studySyncDB.get(dbEndpoints.uploads), []),
    dispatch,
  });
  return children;
};

export default PlannerReviewLayout;
