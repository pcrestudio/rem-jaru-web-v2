import { LocalAutocompleteOption } from "@/components/autocompletes/LocalAutocomplete";
import {
  DataType,
  RowLayout,
} from "@/app/dto/attribute-values/get-section-attributes.dto";

export const options: LocalAutocompleteOption[] = [
  {
    label: "Texto",
    value: DataType.TEXT,
  },
  {
    label: "Texto en área",
    value: DataType.TEXTAREA,
  },
  {
    label: "Fecha",
    value: DataType.DATE,
  },
  {
    label: "Listado",
    value: DataType.LIST,
  },
  {
    label: "Númerico",
    value: DataType.INTEGER,
  },
  {
    label: "Númerico en decimales",
    value: DataType.FLOAT,
  },
  {
    label: "Archivo",
    value: DataType.FILE,
  },
];

export const rowLayoutOptions: LocalAutocompleteOption[] = [
  {
    label: "Único",
    value: RowLayout.single,
  },
  {
    label: "Dos columnas",
    value: RowLayout.twoColumns,
  },
  {
    label: "Tres columnas",
    value: RowLayout.threeColumns,
  },
];
