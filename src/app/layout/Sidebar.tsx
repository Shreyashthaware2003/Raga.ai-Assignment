import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useAuth } from "@/services/auth/useAuth";
import { logoutUser } from "@/store/authActions";
import { useAppDispatch } from "@/store/hooks";
import {
    Library,
    FileText,
    ChevronLeft,
    ChevronRight,
    X,
    Sun,
    Moon,
    CircleQuestionMark,
    CircleUser,
    Settings,
    UserPlus,
    ChartSpline,
    ChartPie,
    UserKey,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

type Props = {
    collapsed: boolean;
    setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
    mobileOpen: boolean;
    setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const sidebarItems = [
    {
        label: "Overview",
        icon: ChartPie,
        to: "/dashboard",
    },
    {
        label: "Analytics",
        icon: ChartSpline,
        to: "/dashboard/analytics",
    },
    {
        label: "Patient Details",
        icon: Library,
        to: "/dashboard/patient-details",
    },
];

export default function Sidebar({
    collapsed,
    setCollapsed,
    mobileOpen,
    setMobileOpen,
}: Props) {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { theme, setTheme } = useTheme();

    const user = useAuth();

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.key === "/") {
                e.preventDefault();
                setCollapsed((prev) => !prev);
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [setCollapsed]);


    const handleLogout = async () => {
        await dispatch(logoutUser());
        localStorage.clear();
        navigate("/login");
    };

    const closeMobile = () => setMobileOpen(false);

    return (
        <>
            {mobileOpen && (
                <button
                    type="button"
                    aria-label="Close menu overlay"
                    onClick={closeMobile}
                    className="fixed inset-0 z-40 bg-black/40 md:hidden"
                />
            )}

            <div
                className={`fixed left-0 top-0 z-50 h-screen w-[260px] transform transition-transform duration-300 md:hidden ${mobileOpen ? "translate-x-0" : "-translate-x-full"
                    } flex flex-col bg-[#f9f8f7] border-r border-gray-200 dark:border-[#302f2f] dark:bg-[#202020] text-gray-700 dark:text-gray-300`}
            >
                <div className="px-2 py-2 flex items-center justify-between border-b border-gray-200 dark:border-[#302f2f]">
                    <span className="text-sm font-semibold px-2">Menu</span>
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        aria-label="Close sidebar"
                        onClick={closeMobile}
                    >
                        <X size={16} />
                    </Button>
                </div>

                <SidebarBody
                    collapsed={false}
                    setCollapsed={setCollapsed}
                    onSelectItem={closeMobile}
                    handleLogout={handleLogout}
                    theme={theme}
                    setTheme={setTheme}
                    userName={user?.name || "User"}
                    userEmail={user?.email || ""}
                    isMobile
                    className="flex-1 min-h-0"
                />
            </div>

            <div
                className={`hidden md:flex h-screen flex-col ${collapsed ? "w-[60px] " : "w-[260px]"
                    }  bg-[#f9f8f7] border-r border-gray-200 dark:border-[#302f2f] dark:bg-[#202020] text-gray-700 dark:text-gray-300`}
            >
                <SidebarBody
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                    onSelectItem={undefined}
                    handleLogout={handleLogout}
                    theme={theme}
                    setTheme={setTheme}
                    userName={user?.name || "User"}
                    userEmail={user?.email || ""}
                    isMobile={false}
                    className="flex-1 min-h-0"
                />
            </div>
        </>
    );
}

function SidebarBody({
    collapsed,
    setCollapsed,
    onSelectItem,
    handleLogout,
    theme,
    setTheme,
    userName,
    userEmail,
    isMobile,
    className,
}: {
    collapsed: boolean;
    setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
    onSelectItem?: () => void;
    handleLogout: () => Promise<void>;
    theme?: string;
    setTheme: (theme: string) => void;
    userName: string;
    userEmail: string;
    isMobile: boolean;
    className?: string;
}) {

    const [helpOpen, setHelpOpen] = useState(false);

    return (
        <div className={`flex min-h-0 flex-col ${className ?? ""}`}>
            <div className="px-2 py-2 flex items-center justify-between group">
                <div className="hover:bg-[#f1f0ef] hover:dark:bg-[#252525] w-full rounded-md">

                    {!collapsed && (
                        <Popover>
                            <PopoverTrigger asChild>
                                <div className="flex items-center justify-between w-full cursor-pointer">
                                    <Button variant="ghost" className="px-1">
                                        <CircleUser className="w-4 h-4" /> {userName}
                                    </Button>

                                    {!isMobile && (
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setCollapsed(!collapsed);
                                                    }}
                                                    className="text-gray-500 hover:bg-gray-200 hover:dark:bg-[#302f2f]"
                                                >
                                                    <ChevronLeft size={16} />
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent side="right" className="text-xs">
                                                <p>Close sidebar</p>
                                                <p>Ctrl+/</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    )}
                                </div>
                            </PopoverTrigger>

                            <PopoverContent align="start" className="w-80 border border-gray-300 dark:border-[#302f2f] p-0 gap-0  rounded-lg">
                                <div className="grid gap-4 bg-white dark:bg-[#252525] border-b border-gray-300 rounded-t-lg dark:border-[#302f2f] p-2">
                                    <div className="flex items-center flex-nowrap gap-2 text-xs">
                                        <CircleUser className="w-6 h-6 opacity-80 " />
                                        <div className="flex flex-col">
                                            <span className="text-sm">{userName}'s Space</span>
                                            <span className="text-[#777676]">{userEmail}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center flex-nowrap gap-2">
                                        <Button className="flex items-center justify-center flex-nowrap border border-gray-300 dark:border-[#302f2f] bg-white dark:bg-[#252525] text-gray-400 dark:text-[#94918c] hover:bg-gray-100 hover:dark:bg-[#302f2f]  text-xs ">
                                            <Settings className="max-w-3.5 max-h-3.5" /> Settings
                                        </Button>
                                        <Button className="flex items-center justify-center flex-nowrap border border-gray-300 dark:border-[#302f2f] bg-white hover:bg-gray-100 dark:bg-[#252525] text-[#94918c] hover:dark:bg-[#302f2f] text-xs">
                                            <UserPlus className="max-w-3.5 max-h-3.5" />  Invite members
                                        </Button>
                                    </div>
                                </div>
                                <div className="bg-white dark:bg-[#202020] rounded-b-lg p-2">
                                    <Button onClick={handleLogout} className="w-full justify-start font-medium text-red-500 hover:bg-gray-100 dark:hover:bg-[#2a2a2a]">Logout</Button>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}

                    {collapsed && !isMobile && (
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    onClick={() => setCollapsed(!collapsed)}
                                    className="text-gray-500 hover:bg-gray-200 hover:dark:bg-[#302f2f]"
                                >
                                    <ChevronRight size={16} />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="right" className="text-xs">
                                <p>Expand sidebar</p>
                                <p>Ctrl+/</p>
                            </TooltipContent>
                        </Tooltip>
                    )}
                </div>
            </div>

            <ScrollArea className="flex-1 px-2">
                <div className="space-y-1">
                    {sidebarItems.map((item) => {
                        const Icon = item.icon;

                        return (
                            <SidebarItem
                                key={item.label}
                                icon={<Icon size={16} />}
                                label={item.label}
                                to={item.to}
                                collapsed={collapsed}
                                onSelectItem={onSelectItem}
                            />
                        );
                    })}
                </div>

                <Section title="Upcoming features" collapsed={collapsed}>
                    <SidebarItem
                        icon={<UserKey size={14} />}
                        label="Role-Based Access Control"
                        collapsed={collapsed}
                        disabledMessage="This module is under development and will be available soon."
                        onSelectItem={onSelectItem}
                    />
                </Section>

                <Section title="Private" collapsed={collapsed}>
                    <SidebarItem
                        icon={<FileText size={14} />}
                        label="Patient Registry Notes"
                        collapsed={collapsed}
                        disabledMessage="Private notes are not enabled in this demo build."
                        onSelectItem={onSelectItem}
                    />
                </Section>
            </ScrollArea>

            <div className="p-2 border-t border-gray-200 dark:border-[#302f2f] flex items-center flex-wrap gap-1">


                <Popover open={helpOpen} onOpenChange={setHelpOpen}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <PopoverTrigger asChild>
                                <Button
                                    type="button"
                                    onClick={() => setHelpOpen((prev) => !prev)}
                                    className="w-fit flex items-center justify-center gap-2 px-2 py-1.5 rounded hover:bg-gray-100 dark:hover:bg-[#2a2a2a]"
                                >
                                    <CircleQuestionMark />
                                </Button>
                            </PopoverTrigger>
                        </TooltipTrigger>
                        <TooltipContent side={collapsed ? "right" : "top"}>
                            <p>Help, contact, more...</p>
                        </TooltipContent>
                    </Tooltip>
                    <PopoverContent align="start" className="w-80 bg-white dark:bg-[#252525] border-2 border-gray-200 dark:border-[#302f2f] ">
                        <div className="grid gap-4">
                            <div className="space-y-2">
                                <h4 className="leading-none font-medium">Help & Shortcuts</h4>
                                <p className="text-xs text-muted-foreground">
                                    1. Use this workspace to review analytics, patient records, and alerts.
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    2. Press Ctrl + / to collapse or expand the sidebar.
                                </p>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>
                <Tooltip>
                    <TooltipTrigger asChild>

                        <Button
                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                            className="w-fit flex items-center justify-center gap-2 px-2 py-1.5 rounded hover:bg-gray-100 dark:hover:bg-[#2a2a2a]"
                        >
                            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side={collapsed ? "right" : "top"}>
                        <p>Toggle theme</p>
                    </TooltipContent>
                </Tooltip>
            </div>
        </div>
    );
}

function SidebarItem({
    icon,
    label,
    to,
    collapsed,
    disabledMessage,
    onSelectItem,
}: {
    icon: React.ReactNode;
    label: string;
    collapsed?: boolean;
    to?: string;
    disabledMessage?: string;
    onSelectItem?: () => void;
}) {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = to && location.pathname === to;

    const handleItemClick = () => {
        if (to) {
            navigate(to);
            onSelectItem?.();
            return;
        }

        if (disabledMessage) {
            toast.error(disabledMessage);
            onSelectItem?.();
        }
    };

    const itemContent = (
        <div
            onClick={handleItemClick}
            className={`group flex items-center ${collapsed ? "justify-center" : "gap-2"
                } px-2 py-1.5 rounded-md text-sm cursor-pointer ${isActive
                    ? "bg-[#f1f0ef] dark:bg-[#2a2a2a] text-black dark:text-white"
                    : "hover:bg-[#f1f0ef] dark:hover:bg-[#2a2a2a] text-gray-700 dark:text-gray-300"
                }`}
        >
            <span className="opacity-80">{icon}</span>
            {!collapsed && <span className="truncate">{label}</span>}
        </div>
    );

    if (!collapsed) {
        return itemContent;
    }

    return (
        <Tooltip>
            <TooltipTrigger asChild>{itemContent}</TooltipTrigger>
            <TooltipContent side="right" className="text-xs">
                <p>{label}</p>
            </TooltipContent>
        </Tooltip>
    );
}
function Section({
    title,
    children,
    collapsed,
}: {
    title: string;
    children: React.ReactNode;
    collapsed?: boolean;
}) {
    if (collapsed) return null;

    return (
        <div className="mt-4">
            <p className="px-2 text-xs text-gray-500 dark:text-gray-400 mb-1">
                {title}
            </p>
            <div className="space-y-1">{children}</div>
        </div>
    );
}
