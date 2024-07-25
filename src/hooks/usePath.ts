import { usePathname } from "next/navigation";

export const usePath = () => {
  const path = usePathname();

  const isCurrentPath = (currentPath: string) => {
    return currentPath.length > 0 && path === currentPath;
  };

  return {
    path,
    isCurrentPath,
  };
};
