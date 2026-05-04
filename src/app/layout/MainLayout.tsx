import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export default function MainLayout() {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <Sidebar
                collapsed={collapsed}
                setCollapsed={setCollapsed}
                mobileOpen={mobileOpen}
                setMobileOpen={setMobileOpen}
            />
            <main className={`w-full dark:bg-[#191919] py-0 sm:py-4 px-4 md:px-10 space-y-6 md:space-y-10 max-h-screen overflow-y-auto`}>
                <div className="sticky top-0 z-40 flex items-center gap-3 border-b border-gray-200 bg-gray-50/95 py-3 backdrop-blur md:hidden dark:border-[#302f2f] dark:bg-[#191919]/95">
                    <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        aria-label="Open menu"
                        onClick={() => setMobileOpen(true)}
                        className="border-gray-300 dark:border-[#302f2f]"
                    >
                        <Menu className="h-4 w-4" />
                    </Button>
                    <span className="text-sm font-semibold">Clinical OS</span>
                </div>

                <div className="flex-1 px-0 md:px-10 py-4 md:py-6 max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
