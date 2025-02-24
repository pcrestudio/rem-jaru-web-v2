import { GetJudicialProcessDto } from "@/app/admin/procesos-judiciales/types/get-judicial-process.dto";
import { GetSupervisionDto } from "@/app/dto/supervision/get-supervision.dto";

export interface ModularProps {
  provision: GetJudicialProcessDto | GetSupervisionDto;
  modelType?: string;
  control?: any;
  register?: any;
  pathname?: string;
  getValues?: any;
  reset?: any;
  setValue?: any;
  watch?: any;
  errors?: any;
}
