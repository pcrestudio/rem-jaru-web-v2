export enum Role {
  "super-admin" = "super-admin",
  admin = "admin",
  visualizer = "visualizer",
  executor = "executor",
}

export const mappingRole: Record<string, string> = {
  [Role["super-admin"]]: "Súper Administrador",
  [Role.admin]: "Administrador",
  [Role.executor]: "Ejecutor",
  [Role.visualizer]: "Supervisor",
};
