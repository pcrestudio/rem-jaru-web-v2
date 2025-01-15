export interface OptionCard {
  order: number;
  path: string;
  name: string;
}

export const settingsOptions: OptionCard[] = [
  {
    order: 1,
    path: "maestros",
    name: "Maestros",
  },
  {
    order: 2,
    path: "terminos",
    name: "Términos y Condiciones",
  },
  {
    order: 3,
    path: "personalizar",
    name: "Personalizar formularios",
  },
  {
    order: 4,
    path: "roles",
    name: "Roles",
  },
];
