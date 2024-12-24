"use client";

import { Listbox, ListboxItem } from "@nextui-org/listbox";
import { User } from "next-auth";
import { FC, Fragment, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AiOutlineArrowsAlt } from "react-icons/ai";

import { grouped, MenuOptions } from "@/config/menu-options";
import { validatePathname } from "@/utils/validate_pathname";
import AppBarUser from "@/components/appbar/AppBarUser";

export interface SidebarProps {
  user: User;
}

const mappingWidth: Record<string, string> = {
  collapsed: "min-w-[60px]",
  expanded: "min-w-[260px]",
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

  return (
    <aside
      className={`${minWidth} sidebar-transition bg-cerulean-950 px-8 py-4 h-screen flex flex-col relative transition-all`}
    >
      {/* Toggle Button */}
      <div
        className="bg-cerulean-50 shadow-inner rounded-full absolute -right-3 top-2 flex items-center justify-center p-2 cursor-pointer"
        role="presentation"
        onClick={collapseSidebar}
      >
        <AiOutlineArrowsAlt className="text-black" size={16} />
      </div>

      {/* AppBarUser (fixed at the top) */}
      <div className="flex-shrink-0">
        <AppBarUser user={user} />
      </div>

      {/* Scrollable grouped section */}
      <div className="flex-grow mt-4 overflow-y-auto scrollbar-none py-4">
        <div className="flex flex-col gap-6">
          {grouped.map(([groupName, options]: [string, Array<MenuOptions>]) => (
            <Fragment key={`${groupName}-${Math.random()}`}>
              <div className="flex flex-col gap-2">
                {/* Group Name */}
                <p
                  className={`text-medium text-jaruColor-white ${
                    isCollapsed ? "text-center" : ""
                  } uppercase font-bold`}
                >
                  {groupName}
                </p>
                {/* Options */}
                <Listbox aria-label="Actions" className="[&_ul]:gap-3">
                  {options.map(
                    ({ title, Icon, role, redirectTo, onEvent }, index) =>
                      role.includes(user?.role) && (
                        <ListboxItem
                          key={`${index}-${Math.random()}`}
                          className={`${isCollapsed ? "flex-col" : "flex-row"} gap-4 text-white ${
                            validatePathname(pathname, redirectTo)
                              ? "bg-cerulean-500 text-white"
                              : "data-[hover=true]:bg-transparent"
                          } data-[hover=true]:bg-cerulean-500 data-[hover=true]:text-white`}
                          href={redirectTo !== undefined ? redirectTo : ""}
                          startContent={<Icon />}
                          onClick={
                            redirectTo === undefined ? onEvent : () => {}
                          }
                        >
                          <p className="text-sm">{title}</p>
                        </ListboxItem>
                      ),
                  )}
                </Listbox>
              </div>
              {/* Divider */}
              <div className="bg-cerulean-500 opacity-20 h-[1px] w-full" />
            </Fragment>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
