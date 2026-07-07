import { AppHeader } from "@/components/AppHeader";
import { SidebarInset } from "@/components/ui/sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <SidebarInset>
            <AppHeader />
            <main className="flex-1">{children}</main>
        </SidebarInset>
    )
}

export default Layout;