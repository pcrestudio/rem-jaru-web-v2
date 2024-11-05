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
  const [minWidth, setMinWidth] = useState<string>(mappingWidth?.expanded);
  const collapseSidebar = () => {
    setCollapsed(!isCollapsed);
  };
  const checkSidebarWidth = () => {
    const sidebarWidthConfig = localStorage.getItem("sidebarWidth");

    if (!sidebarWidthConfig) {
      setMinWidth(mappingWidth?.expanded);
    }

    if (
      sidebarWidthConfig === mappingWidth?.collapsed &&
      isCollapsed === undefined
    ) {
      setCollapsed(true);
      return setMinWidth(sidebarWidthConfig);
    }
  };

  useEffect(() => {
    checkSidebarWidth();

    if (isCollapsed === undefined) return;

    if (typeof window !== "undefined") {
      if (Boolean(isCollapsed)) {
        localStorage.setItem("sidebarWidth", mappingWidth?.collapsed);
        setMinWidth(mappingWidth?.collapsed);
      } else {
        localStorage.setItem("sidebarWidth", mappingWidth?.expanded);
        setMinWidth(mappingWidth?.expanded);
      }
    }
  }, [isCollapsed]);

  return (
    <aside
      className={`${minWidth} transition-width transition-slowest ease relative flex bg-cerulean-900 px-8 py-4 border border-b-gray-500 h-screen border-l-0 border-r-0 border-t-gray-500`}
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
                className={`${isCollapsed || minWidth === "min-w-[60px]" ? "flex-col" : "flex-row"} text-white ${validatePathname(pathname, redirectTo) ? "bg-cerulean-950 text-white" : "data-[hover=true]:bg-transparent"} data-[hover=true]:bg-cerulean-950 data-[hover=true]:text-white`}
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
