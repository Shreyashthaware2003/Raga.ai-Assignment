import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useAuth } from "@/services/auth/useAuth";
import { logoutUser } from "@/store/authActions";
import { useAppDispatch } from "@/store/hooks";
import {
    Search,
    Library,
    FileText,
    ChevronLeft,
    ChevronRight,
    Sun,
    Moon,
    CircleQuestionMark,
    CircleUser,
    Settings,
    UserPlus,
    ChartSpline,
    ChartPie,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {
    collapsed: boolean;
    setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
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

export default function Sidebar({ collapsed, setCollapsed }: Props) {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { theme, setTheme } = useTheme();

    const [helpOpen, setHelpOpen] = useState(false);

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
        navigate("/login");
    };

    return (
        <>
            <div
                className={`h-screen flex flex-col ${collapsed ? "w-[60px] transition-all duration-300" : "w-[260px] transition-all duration-300"
                    }  bg-[#f9f8f7] border-r border-gray-200 dark:border-[#302f2f] dark:bg-[#202020] text-gray-700 dark:text-gray-300`}
            >
                <div className="px-2 py-2 flex items-center justify-between group">
                    <div className="hover:bg-[#f1f0ef] hover:dark:bg-[#252525] w-full rounded-md">

                        {!collapsed && (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <div className="flex items-center justify-between w-full cursor-pointer">
                                        <Button variant="ghost" className="px-1">
                                            {user?.name || "User"}
                                        </Button>

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
                                    </div>
                                </PopoverTrigger>

                                <PopoverContent align="start" className="w-80 border border-gray-300 dark:border-[#302f2f] p-0 gap-0  rounded-lg">
                                    <div className="grid gap-4 bg-white dark:bg-[#252525] border-b border-gray-300 rounded-t-lg dark:border-[#302f2f] p-2">
                                        <div className="flex items-center flex-nowrap gap-2 text-xs">
                                            <CircleUser className="w-6 h-6 opacity-80 " />
                                            <div className="flex flex-col">
                                                <span className="text-sm">{user?.name}'s Space</span>
                                                <span className="text-[#777676]">{user?.email}</span>
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
                                        <Button onClick={handleLogout} className="w-full justify-start font-normal text-gray-700 dark:text-[#94918c] hover:bg-gray-100 dark:hover:bg-[#2a2a2a]">Logout</Button>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )}

                        {collapsed && (
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

                <div className="px-2 pb-2">
                    <SidebarItem
                        icon={<Search size={16} />}
                        label="Search"
                        collapsed={collapsed}
                    />
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
                                />
                            );
                        })}
                    </div>

                    <Section title="Recents" collapsed={collapsed}>
                        <SidebarItem
                            icon={<FileText size={14} />}
                            label="Networking"
                            collapsed={collapsed}
                        />
                        <SidebarItem
                            icon={<FileText size={14} />}
                            label="JavaScript Notes"
                            collapsed={collapsed}
                        />
                    </Section>

                    <Section title="Private" collapsed={collapsed}>
                        <SidebarItem
                            icon={<FileText size={14} />}
                            label="React Notes"
                            collapsed={collapsed}
                        />
                    </Section>
                </ScrollArea>

                <div className="p-2 border-t border-gray-200 dark:border-[#302f2f] flex items-center flex-wrap gap-1">

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Popover open={helpOpen} onOpenChange={setHelpOpen}>
                                <PopoverTrigger asChild>
                                    <Button
                                        onClick={() => {
                                            setHelpOpen((prev) => !prev);
                                        }}
                                        className="w-fit flex items-center justify-center gap-2 px-2 py-1.5 rounded hover:bg-gray-100 dark:hover:bg-[#2a2a2a]"
                                    >
                                        <CircleQuestionMark />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent align="start" className="w-80 bg-white dark:bg-[#252525] border-2 dark:border-[#302f2f] ">
                                    <div className="grid gap-4">
                                        <div className="space-y-2">
                                            <h4 className="leading-none font-medium">Dimensions</h4>
                                            <p className="text-sm text-muted-foreground">
                                                Set the dimensions for the layer.
                                            </p>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </TooltipTrigger>
                        <TooltipContent side={collapsed ? "right" : "top"}>
                            <p>Help, contact, more...</p>
                        </TooltipContent>
                    </Tooltip>

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


        </>
    );
}

function SidebarItem({
    icon,
    label,
    to,
    collapsed,
}: {
    icon: React.ReactNode;
    label: string;
    collapsed?: boolean;
    to?: string;
}) {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = to && location.pathname === to;

    return (
        <div
            onClick={() => {
                if (to) navigate(to);
            }}
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