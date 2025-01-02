import { MasterTodosStates } from "@/config/master-todos-states.config";

const mappingSemaphore: Record<MasterTodosStates, string> = {
  [MasterTodosStates.lessThanTwoWeeks]: "bg-[#e53935]",
  [MasterTodosStates.expired]: "bg-[#fdd835]",
  [MasterTodosStates.moreThanTwoWeeks]: "bg-[#43a047]",
};

export default mappingSemaphore;
