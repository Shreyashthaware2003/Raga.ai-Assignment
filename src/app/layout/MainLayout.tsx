import { Link, Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useState } from "react";
// import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

export default function MainLayout() {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();

    const pathnames = location.pathname.split("/").filter(Boolean);
    console.log("Current Path:", pathnames);
    return (
        <div className="min-h-screen bg-gray-50 flex">
            <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
            <main className="w-full dark:bg-[#191919] py-4 px-10 space-y-10 max-h-screen overflow-y-auto">
                {/* <div className="sticky top-0 z-50 bg-gray-50 dark:bg-[#191919] px-10 py-4 border-b">
                    <Breadcrumb>
                        <BreadcrumbList>
                            {pathnames.map((name, index) => {
                                const routeTo = "/" + pathnames.slice(0, index + 1).join("/");
                                const isLast = index === pathnames.length - 1;

                                return (
                                    <div key={routeTo} className="flex items-center">
                                        <BreadcrumbItem>
                                            <BreadcrumbLink asChild>
                                                {isLast ? (
                                                    <span className="capitalize font-medium text-white">
                                                        {name.replace("-", " ")}
                                                    </span>
                                                ) : (
                                                    <Link to={routeTo} className="capitalize">
                                                        {name.replace("-", " ")}
                                                    </Link>
                                                )}
                                            </BreadcrumbLink>
                                        </BreadcrumbItem>

                                        {!isLast && <BreadcrumbSeparator />}
                                    </div>
                                );
                            })}
                        </BreadcrumbList>
                    </Breadcrumb>
                </div> */}
                <div className="flex-1  px-10 py-6 max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
