import { Listbox, ListboxItem } from "@heroui/listbox";
import { FC, Fragment, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AiOutlineArrowsAlt } from "react-icons/ai";
import { Tooltip, IconButton } from "@mui/material";

import { grouped, MenuOptions } from "@/config/menu-options";
import { validatePathname } from "@/utils/validate_pathname";
import { IUser } from "@/app/admin/usuarios/interfaces";

export interface SidebarProps {
  user: IUser;
}

const mappingWidth: Record<string, string> = {
  collapsed: "w-[110px] lg:w-[140px]",
  expanded: "w-[260px]",
};

const Sidebar: FC<SidebarProps> = ({ user }) => {
  const pathname: string = usePathname();

  const [isCollapsed, setCollapsed] = useState<boolean | undefined>(undefined);
  const [minWidth, setMinWidth] = useState<string>("");

  const collapseSidebar = () => setCollapsed((prev) => !prev);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const sidebarWidthConfig = localStorage.getItem("sidebarWidth");

      if (sidebarWidthConfig === mappingWidth.collapsed) {
        setCollapsed(true);
        setMinWidth(mappingWidth.collapsed);
      } else {
        setCollapsed(false);
        setMinWidth(mappingWidth.expanded);
      }
    }
  }, []);

  useEffect(() => {
    if (isCollapsed !== undefined) {
      const newWidth = isCollapsed
        ? mappingWidth.collapsed
        : mappingWidth.expanded;

      localStorage.setItem("sidebarWidth", newWidth);
      setMinWidth(newWidth);
    }
  }, [isCollapsed]);

  if (!user) return null; // Asegura consistencia mientras se carga el usuario.

  return (
    <aside
      className={`${minWidth} sidebar-transition bg-cerulean-950 px-8 py-4 h-screen flex flex-col relative transition-all`}
    >
      <div
        className="bg-cerulean-50 shadow-inner rounded-full absolute -right-3 top-2 flex items-center justify-center p-2 cursor-pointer"
        role="presentation"
        onClick={collapseSidebar}
      >
        <AiOutlineArrowsAlt className="text-black" size={16} />
      </div>

      <div className="flex-grow mt-4 overflow-y-auto scrollbar-none py-4">
        <div className="flex flex-col gap-6">
          {grouped.map(([groupName, options]: [string, Array<MenuOptions>]) => (
            <Fragment key={groupName}>
              <div className="flex flex-col gap-2">
                {!isCollapsed && options.length > 0 && (
                  <p
                    className={`text-medium text-jaruColor-white ${
                      isCollapsed ? "text-center" : ""
                    } uppercase font-bold`}
                  >
                    {groupName}
                  </p>
                )}
                <Listbox
                  aria-label="Actions"
                  className="[&_ul]:gap-3"
                  classNames={{
                    emptyContent: `${isCollapsed ? "text-center text-xs" : ""}`,
                  }}
                  emptyContent="Sin opciones."
                >
                  {options.map(
                    ({ title, Icon, role, redirectTo, onEvent }) =>
                      role.includes(user?.role) && (
                        <ListboxItem
                          key={title}
                          className={`${isCollapsed ? "flex-col" : "flex-row"} gap-4 text-white ${
                            validatePathname(pathname, redirectTo)
                              ? "bg-cerulean-500 text-white"
                              : "data-[hover=true]:bg-transparent"
                          } data-[hover=true]:bg-cerulean-500 data-[hover=true]:text-white`}
                          classNames={{
                            title: `${isCollapsed ? "hidden" : ""}`,
                          }}
                          href={redirectTo !== undefined ? redirectTo : ""}
                          startContent={
                            isCollapsed ? (
                              <Tooltip placement="right" title={title}>
                                <IconButton>
                                  <Icon
                                    className="text-white"
                                    size={isCollapsed ? 24 : 16}
                                  />
                                </IconButton>
                              </Tooltip>
                            ) : (
                              <Icon
                                className="text-white"
                                size={isCollapsed ? 24 : 16}
                              />
                            )
                          }
                          textValue={title}
                          onPress={
                            redirectTo === undefined ? onEvent : () => {}
                          }
                        >
                          {!isCollapsed && <p className="text-sm">{title}</p>}
                        </ListboxItem>
                      ),
                  )}
                </Listbox>
              </div>
              <div className="bg-cerulean-500 opacity-20 h-[1px] w-full" />
            </Fragment>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
