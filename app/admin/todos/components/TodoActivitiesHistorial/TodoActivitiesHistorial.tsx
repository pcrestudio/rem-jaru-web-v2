import { Avatar } from "@heroui/react";
import React, { FC } from "react";
import { Divider } from "@heroui/divider";
import { LuPaperclip } from "react-icons/lu";
import { Button } from "@heroui/button";
import { DeleteIcon, EditIcon } from "@heroui/shared-icons";
import useSWR from "swr";

import { convertFormatDistanceToNow } from "@/utils/format_date";
import { GetTodoActivityDto } from "@/app/dto/todos/get-todo-activity.dto";
import { GetTodoDto } from "@/app/dto/todos/get-todo.dto";
import { handleDownloadDocument } from "@/app/helpers/downloadDocumentHelper";
import { environment } from "@/environment/environment";
import { fetcher } from "@/config/axios.config";
import useStore from "@/lib/store";

interface TodoActivitiesProps {
  todo: GetTodoDto;
  onEditActivity?: (activity: GetTodoActivityDto) => void;
  onDeleteActivity?: (activity: GetTodoActivityDto) => void;
}

const TodoActivities: FC<TodoActivitiesProps> = ({
  todo,
  onEditActivity,
  onDeleteActivity,
}) => {
  const { data } = useSWR<GetTodoActivityDto[]>(
    `${environment.baseUrl}/todos/activities?todoId=${todo?.id}`,
    fetcher,
  );

  const { user } = useStore();

  return (
    <>
      {data && data.length > 0 && <Divider className="col-span-12" />}

      {data &&
        data.map((activity: GetTodoActivityDto) => (
          <div key={activity.id} className="col-span-12">
            <div className="flex flex-col gap-2">
              <div className="flex flex-row gap-5 items-center">
                <Avatar
                  isBordered
                  color="primary"
                  name={
                    activity.responsible
                      ? activity.responsible.displayName
                      : "-"
                  }
                />
                <div className="flex flex-col gap-2">
                  <div className="flex flex-row gap-2 items-center">
                    <p className="font-bold text-sm text-cerulean-950">
                      {activity.responsible.displayName}
                    </p>
                    <p className="text-xs text-slate-400">
                      {activity.updatedAt
                        ? convertFormatDistanceToNow(activity.updatedAt)
                        : convertFormatDistanceToNow(activity.createdAt)}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <p className="text-sm">{activity.activity}</p>

                    {activity.file !== "" && (
                      <button
                        className="file-name-visualizer flex flex-row items-center gap-1"
                        type="button"
                        onClick={() => handleDownloadDocument(activity.file)}
                      >
                        <span>
                          <LuPaperclip />
                        </span>
                        <span>{activity.file}</span>
                      </button>
                    )}

                    {activity?.responsibleId === user?.id && (
                      <div className="flex flex-row">
                        <Button
                          className="not-button"
                          disabled={todo?.check}
                          startContent={<EditIcon />}
                          onPress={() =>
                            todo?.check ? {} : onEditActivity(activity)
                          }
                        >
                          Editar
                        </Button>
                        <Button
                          className="not-button"
                          disabled={todo?.check}
                          startContent={<DeleteIcon />}
                          onPress={() =>
                            todo?.check ? {} : onDeleteActivity(activity)
                          }
                        >
                          Eliminar
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <Divider
                className={activity?.responsibleId === user?.id ? "" : "mt-3"}
              />
            </div>
          </div>
        ))}
    </>
  );
};

export default TodoActivities;
