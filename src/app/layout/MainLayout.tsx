import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useState } from "react";

export default function MainLayout() {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <div className="min-h-screen bg-gray-50 flex">
            <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
            <main className="w-full bg-blue-400 dark:bg-red-500 p-2">
                <Outlet />
            </main>
        </div>
    );
}
