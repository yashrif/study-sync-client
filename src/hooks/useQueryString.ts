import { useSearchParams } from "next/navigation";
import { useCallback } from "react";

export const useQueryString = () => {
  const searchParams = useSearchParams();

  const appendQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.append(name, value);
      return params.toString();
    },
    [searchParams],
  );

  const checkQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      return params.has(name, value);
    },
    [searchParams],
  );

  const getQueryString = useCallback(
    (name: string) => {
      const params = new URLSearchParams(searchParams);
      return params.get(name);
    },
    [searchParams],
  );

  const getAllQueryString = useCallback(
    (name: string) => {
      const params = new URLSearchParams(searchParams);
      return params.getAll(name);
    },
    [searchParams],
  );

  const setQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      return params.toString();
    },
    [searchParams],
  );

  const toggleQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      if (params.has(name, value)) {
        params.delete(name, value);
      } else {
        params.append(name, value);
      }
      return params.toString();
    },
    [searchParams],
  );

  return {
    appendQueryString,
    checkQueryString,
    getQueryString,
    getAllQueryString,
    setQueryString,
    toggleQueryString,
  };
};
