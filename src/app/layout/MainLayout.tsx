import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useState } from "react";

export default function MainLayout() {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <div className="min-h-screen bg-gray-50 flex">
            <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
            <main className="w-full dark:bg-[#191919] py-2 px-10">
                <Outlet />
            </main>
        </div>
    );
}
