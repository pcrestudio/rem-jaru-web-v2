export enum Role {
  "super-admin" = "super-admin",
  admin = "admin",
  visualizer = "visualizer",
}

export const mappingRole: Record<string, string> = {
  [Role["super-admin"]]: "Súper Administrador",
  [Role.admin]: "Administrador",
  [Role.visualizer]: "Visualizador",
};
