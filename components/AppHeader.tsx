"use client";

import { usePathname } from "next/navigation";
import { SidebarTrigger } from "@/components/ui/sidebar";

const pageTitles: Record<string, string> = {
    workflows: "Workflows",
    credentials: "Credentials",
    executions: "Executions",
    pricing:"Pricing",
};

function useCurrentPageTitle() {
    const pathname = usePathname();
    const segment = pathname.split("/").filter(Boolean)[0] ?? "";
    return pageTitles[segment] ?? null;
}

export const AppHeader = () => {
    const title = useCurrentPageTitle();

    return (
        <header className="flex h-14 shrink-0 items-center gap-3 border-b border-[#E2E2E0] bg-white px-4">
            <SidebarTrigger className="rounded-none text-[#6E6E6E] transition-colors duration-200 hover:bg-black/[0.03] hover:text-[#0B0B0C]" />
            {/* Hairline Divider Between The Trigger And The Page Label */}
            <span aria-hidden="true" className="h-4 w-px bg-[#E2E2E0]" />
            {title && (
                <p className="font-mono text-[11px] font-medium tracking-[0.2em] text-[#0B0B0C] uppercase">
                    {title}
                </p>
            )}
        </header>
    );
};