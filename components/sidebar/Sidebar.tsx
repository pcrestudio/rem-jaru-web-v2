import { Listbox, ListboxItem } from "@nextui-org/listbox";
import { menuOptions } from "@/config/menu-options";
import { User } from "next-auth";
import React, { FC, ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Accordion, AccordionItem } from "@nextui-org/react";
import useSWR from "swr";
import { GetModuleDto } from "@/app/dto/modules/get-module.dto";
import { environment } from "@/environment/environment";
import { fetcher } from "@/config/axios.config";
import { TfiAngleLeft } from "react-icons/tfi";
import { RiAuctionLine, RiEye2Line } from "react-icons/ri";
import { validatePathname } from "@/utils/validate_pathname";

export interface SidebarProps {
  user: User;
}

const renderIcon: Record<number, ReactNode> = {
  1: <RiAuctionLine className="text-white" />,
  2: <RiEye2Line className="text-white" />,
};

const Sidebar: FC<SidebarProps> = ({ user }) => {
  const pathname: string = usePathname();
  const { data, error, isLoading } = useSWR<GetModuleDto[]>(
    `${environment.baseUrl}/modules`,
    fetcher,
  );

  return (
    <aside className="flex min-w-[280px] bg-cerulean-900 px-8 py-4 border border-b-0 border-l-0 border-r-0 border-t-gray-500">
      <Listbox aria-label="Actions" className="[&_ul]:gap-4">
        {menuOptions.map(
          ({ title, Icon, role, redirectTo, isMultiple }, index) =>
            role.includes(user?.role) &&
            (!isMultiple ? (
              <ListboxItem
                key={index}
                className={`text-white ${pathname.includes(redirectTo) || validatePathname(pathname, redirectTo) ? "bg-cerulean-950 text-white" : "data-[hover=true]:bg-transparent"} data-[hover=true]:bg-cerulean-950 data-[hover=true]:text-white`}
                startContent={<Icon />}
              >
                <Link href={redirectTo}>
                  <p className="text-sm">{title}</p>
                </Link>
              </ListboxItem>
            ) : (
              <ListboxItem
                key={index * 10}
                className={`text-white data-[hover=true]:bg-transparent data-[hover=true]:text-white p-0`}
              >
                <Accordion
                  itemClasses={{
                    title: "text-white text-sm data-[open=true]:text-slate-200",
                    base: "px-2 data-[open=true]:px-0",
                    indicator: "text-white data-[open=true]:text-slate-200",
                  }}
                >
                  <AccordionItem
                    startContent={<Icon />}
                    indicator={<TfiAngleLeft size="12" />}
                    key={index}
                    title={title}
                    isCompact={true}
                  >
                    {data && (
                      <Listbox aria-label="Actions" className="[&_ul]:gap-4">
                        {data.map((module) => (
                          <ListboxItem
                            key={module.slug}
                            startContent={renderIcon[module.order]}
                            className={`text-white ${
                              pathname.includes(module.slug)
                                ? "text-white border-b-1"
                                : ""
                            } data-[hover=true]:bg-transparent data-[hover=true]:text-white`}
                          >
                            <Link href={`/admin/${module.slug}`}>
                              <p className="text-sm">{module.name}</p>
                            </Link>
                          </ListboxItem>
                        ))}
                      </Listbox>
                    )}
                  </AccordionItem>
                </Accordion>
              </ListboxItem>
            )),
        )}
      </Listbox>
    </aside>
  );
};

export default Sidebar;
