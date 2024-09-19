import { usePathname, useRouter } from "next/navigation";

import { useQueryString } from "@hooks/useQueryString";

export const useQueryParams = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { appendQueryString, setQueryString, toggleQueryString } =
    useQueryString();

  const setParams = (name: string, value: string[]) => {
    router.replace(
      pathname + "?" + value.map((v) => setQueryString(name, v)).join("&"),
      {
        scroll: false,
      }
    );
  };

  const setMultipleParams = (
    params: {
      name: string;
      value: string[];
    }[],
    path: string = pathname
  ) => {
    router.replace(
      path +
        "?" +
        params
          .map((param) =>
            param.value.map((v) => setQueryString(param.name, v)).join("&")
          )
          .join("&"),
      {
        scroll: false,
      }
    );
  };

  const getQueryString = (name: string, value: string[]) => {
    return "?" + value.map((v) => setQueryString(name, v)).join("&");
  };

  const appendQueryParams = (name: string, value: string) => {
    router.replace(pathname + "?" + appendQueryString(name, value), {
      scroll: false,
    });
  };

  const setQueryParams = (name: string, value: string) => {
    router.replace(pathname + "?" + setQueryString(name, value), {
      scroll: false,
    });
  };

  const updateQueryParams = (name: string, value: string) => {
    router.replace(pathname + "?" + toggleQueryString(name, value), {
      scroll: false,
    });
  };

  const removeAllQueryParams = () => {
    router.replace(pathname, {
      scroll: false,
    });
  };

  return {
    getQueryString,
    setParams,
    setMultipleParams,
    setQueryParams,
    updateQueryParams,
    removeAllQueryParams,
    appendQueryParams,
  };
};
