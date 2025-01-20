import React, { FC } from "react";

import { MasterTodosStates } from "@/config/master-todos-states.config";

const mappingSemaphore: Record<MasterTodosStates, string> = {
  [MasterTodosStates.expired]: "bg-[#e53935]",
  [MasterTodosStates.lessThanTwoWeeks]: "bg-[#fdd835]",
  [MasterTodosStates.moreThanTwoWeeks]: "bg-[#43a047]",
};

interface TodoSemaphoreProps {
  slug: string;
}

const TodoSemaphore: FC<TodoSemaphoreProps> = ({ slug }) => {
  return (
    <div className={`w-5 h-5 mx-auto rounded-full ${mappingSemaphore[slug]}`} />
  );
};

export default TodoSemaphore;
