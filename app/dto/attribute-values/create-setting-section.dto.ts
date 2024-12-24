export class CreateSettingSectionDto {
  label: string;
  order: number;
  moduleId?: number;
  submoduleId?: number;
  collapsable?: boolean;
  isSection?: boolean;
}
