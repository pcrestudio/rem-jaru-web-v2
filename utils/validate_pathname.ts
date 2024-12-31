import { routeOptionMapping } from "@/config/mapping_submodules";

export const getMappedRoute = (currentPathname: string): string | null => {
  for (const baseRoute in routeOptionMapping) {
    const regex = new RegExp(`^${baseRoute}(/.*)?$`);
    if (regex.test(currentPathname)) {
      return routeOptionMapping[baseRoute];
    }
  }
  return null;
};

export const validatePathname = (
  currentPathname: string,
  redirectTo: string,
) => {
  if (!redirectTo) return false;

  const mappedRoute = getMappedRoute(currentPathname);
  if (mappedRoute && mappedRoute === redirectTo) {
    return true;
  }

  if (redirectTo === "/admin" && currentPathname !== "/admin") {
    return false;
  }

  return (
    currentPathname === redirectTo ||
    currentPathname.startsWith(redirectTo + "/")
  );
};
