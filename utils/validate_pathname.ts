export const validatePathname = (
  currentPathname: string,
  redirectTo: string,
) => {
  if (currentPathname.includes("/admin") && redirectTo === "/admin") {
    return false;
  }

  return currentPathname.includes(redirectTo) && redirectTo !== "/admin";
};
