"use client";

import { Listbox, ListboxItem } from "@nextui-org/listbox";
import { menuOptions } from "@/config/menu-options";
import { User } from "next-auth";
import { FC, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AiOutlineArrowsAlt } from "react-icons/ai";
import { validatePathname } from "@/utils/validate_pathname";

export interface SidebarProps {
  user: User;
}

const mappingWidth: Record<string, string> = {
  collapsed: "min-w-[60px]",
  expanded: "min-w-[300px]",
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
      className={`${minWidth} sidebar-transition bg-cerulean-950 px-8 py-4 border border-b-gray-500 h-screen border-l-0 border-r-0 border-t-gray-500 flex relative transition-all`}
    >
      <div
        className="bg-cerulean-50 shadow-inner rounded-full absolute -right-3 top-2 flex items-center justify-center p-2 cursor-pointer"
        onClick={collapseSidebar}
      >
        <AiOutlineArrowsAlt size={16} className="text-black" />
      </div>
      <Listbox aria-label="Actions" className="[&_ul]:gap-6">
        {menuOptions.map(
          ({ title, Icon, role, redirectTo, isMultiple }, index) =>
            role.includes(user?.role) && (
              <ListboxItem
                key={index}
                className={`${isCollapsed ? "flex-col" : "flex-row"} text-white ${validatePathname(pathname, redirectTo) ? "bg-cerulean-500 text-white" : "data-[hover=true]:bg-transparent"} data-[hover=true]:bg-cerulean-500 data-[hover=true]:text-white`}
                startContent={<Icon />}
                href={redirectTo}
              >
                <p className="text-base">{title}</p>
              </ListboxItem>
            ),
        )}
      </Listbox>
    </aside>
  );
};

export default Sidebar;
