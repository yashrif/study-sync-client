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
    setParams,
    setQueryParams,
    updateQueryParams,
    removeAllQueryParams,
    appendQueryParams,
  };
};