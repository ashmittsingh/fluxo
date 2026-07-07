"use client";

import {
    CreditCardIcon,
    FolderOpenIcon,
    HistoryIcon,
    KeyIcon,
    LogOutIcon,
    StarIcon,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import {
    Sidebar,
    SidebarContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarHeader,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
} from "@/components/ui/sidebar";

const menuItems = [
    { title: "Workflows", icon: FolderOpenIcon, url: "/workflows" },
    { title: "Credentials", icon: KeyIcon, url: "/credentials" },
    { title: "Executions", icon: HistoryIcon, url: "/executions" },
];

const buttonBase =
    "relative h-10 gap-x-4 rounded-none px-4 text-[#6E6E6E] transition-colors duration-200 hover:bg-black/[0.03] hover:text-[#0B0B0C] focus-visible:ring-1 focus-visible:ring-[#0B0B0C] focus-visible:ring-offset-0 data-[active=true]:bg-black/[0.04] data-[active=true]:font-medium data-[active=true]:text-[#0B0B0C]";

const AppSidebar = () => {
    const pathname = usePathname();
    const router = useRouter();

    return (
        <Sidebar collapsible="icon" className="border-[#E2E2E0] bg-white text-[#0B0B0C]">
            <SidebarHeader className="border-b border-[#E2E2E0]">
                <SidebarMenuItem>
                    <SidebarMenuButton
                        className="h-10 gap-x-3 rounded-none px-4 hover:bg-black/[0.03]"
                        render={
                            <Link href="/workflows" prefetch>
                                <Image src="/icon1.png" alt="Fluxo Logo" width={20} height={20} />
                                <span className="font-mono text-[13px] font-medium tracking-[0.2em] uppercase group-data-[collapsible=icon]:hidden">
                                    Fluxo
                                </span>
                            </Link>
                        }
                    />
                </SidebarMenuItem>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel className="font-mono text-[10px] font-normal tracking-[0.25em] text-[#B9B9B6] uppercase group-data-[collapsible=icon]:hidden">
                        Workspace
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {menuItems.map((item) => {
                                const isActive =
                                    item.url === "/" ? pathname === "/" : pathname.startsWith(item.url);
                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            tooltip={item.title}
                                            isActive={isActive}
                                            data-active={isActive}
                                            aria-current={isActive ? "page" : undefined}
                                            className={buttonBase}
                                            render={
                                                <Link href={item.url} prefetch>
                                                    {isActive && (
                                                        <motion.span
                                                            layoutId="sidebar-active-rail"
                                                            className="absolute left-0 top-1/2 h-5 w-[2px] -translate-y-1/2 bg-[#0B0B0C]"
                                                            transition={{ type: "spring", stiffness: 400, damping: 32 }}
                                                        />
                                                    )}
                                                    <item.icon className="size-4" strokeWidth={1.5} />
                                                    <span>{item.title}</span>
                                                </Link>
                                            }
                                        />
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="gap-1 border-t border-[#E2E2E0] pt-2">
                <SidebarMenuItem>
                    <SidebarMenuButton
                        tooltip="Upgrade to Pro"
                        className="h-10 gap-x-3 rounded-none border border-[#0B0B0C] px-4 text-[#0B0B0C] transition-colors duration-200 hover:bg-[#0B0B0C] hover:text-white"
                        onClick={() => {}}
                    >
                        <StarIcon className="size-4" strokeWidth={1.5} />
                        <span className="flex-1 text-left">Upgrade to Pro</span>
                        <span className="rounded-none border border-current px-1.5 py-0.5 font-mono text-[9px] tracking-[0.1em] group-data-[collapsible=icon]:hidden">
                            PRO
                        </span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <SidebarMenuButton
                        tooltip="Billing Portal"
                        className="h-10 gap-x-4 rounded-none px-4 text-[#6E6E6E] transition-colors duration-200 hover:bg-black/[0.03] hover:text-[#0B0B0C]"
                        onClick={() => {}}
                    >
                        <CreditCardIcon className="size-4" strokeWidth={1.5} />
                        <span>Billing Portal</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <SidebarMenuButton
                        tooltip="Sign Out"
                        className="h-10 gap-x-4 rounded-none px-4 text-[#6E6E6E] transition-colors duration-200 hover:bg-black/[0.03] hover:text-[#0B0B0C]"
                        onClick={() =>
                            authClient.signOut({
                                fetchOptions: {
                                    onSuccess: () => {
                                        router.push("/login");
                                    },
                                },
                            })
                        }
                    >
                        <LogOutIcon className="size-4" strokeWidth={1.5} />
                        <span>Sign Out</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarFooter>
        </Sidebar>
    );
};

export default AppSidebar;